import type {
  Host,
  Request,
  RequestOptions,
  StackFrame,
  Timeouts,
  Response,
  Outcomes,
  EndRequest,
} from './types';
import { MemoryCache } from './MemoryCache';
import type { Cache } from './Cache';
import { StatefulHost } from './StatefulHost';
import {
  deserializeFailure,
  deserializeSuccess,
  serializeData,
  serializeHeaders,
  serializeUrl,
} from './helpers';
import { Headers } from './types';
import { RetryError } from './errors';
import { retryDecision } from './retryDecision';
import { Requester } from './Requester';

export class Transporter {
  private hosts: Host[];
  private baseHeaders: Headers;
  private hostsCache: Cache;
  private userAgent: string;
  private timeouts: Timeouts;
  private requester: Requester;

  constructor({
    hosts,
    baseHeaders,
    userAgent,
    timeouts,
  }: {
    hosts: Host[];
    baseHeaders: Headers;
    userAgent: string;
    timeouts: Timeouts;
  }) {
    this.hosts = hosts;
    this.hostsCache = new MemoryCache();
    this.baseHeaders = baseHeaders;
    this.userAgent = userAgent;
    this.timeouts = timeouts;

    this.requester = new Requester();
  }

  async createRetryableOptions(): Promise<{
    hosts: Host[];
    getTimeout: (retryCount: number, timeout: number) => number;
  }> {
    const statefulHosts = await Promise.all(
      this.hosts.map((statelessHost) => {
        return this.hostsCache.get(statelessHost, async () => {
          return new StatefulHost(statelessHost);
        });
      })
    );
    const hostsUp = statefulHosts.filter((host) => host.isUp());
    const hostsTimeouted = statefulHosts.filter((host) => host.isTimedout());

    /**
     * Note, we put the hosts that previously timeouted on the end of the list.
     */
    const hostsAvailable = [...hostsUp, ...hostsTimeouted];

    const statelessHostsAvailable = hostsAvailable.length > 0 ? hostsAvailable : this.hosts;

    return {
      hosts: statelessHostsAvailable,
      getTimeout(timeoutsCount: number, baseTimeout: number): number {
        /**
         * Imagine that you have 4 hosts, if timeouts will increase
         * on the following way: 1 (timeouted) > 4 (timeouted) > 5 (200)
         *
         * Note that, the very next request, we start from the previous timeout
         *
         *  5 (timeouted) > 6 (timeouted) > 7 ...
         *
         * This strategy may need to be reviewed, but is the strategy on the our
         * current v3 version.
         */
        const timeoutMultiplier =
          hostsTimeouted.length === 0 && timeoutsCount === 0
            ? 1
            : hostsTimeouted.length + 3 + timeoutsCount;

        return timeoutMultiplier * baseTimeout;
      },
    };
  }

  async retryableRequest<TResponse>(
    request: Request,
    requestOptions: RequestOptions
  ): Promise<TResponse> {
    const stackTrace: StackFrame[] = [];

    /**
     * First we prepare the payload that do not depend from hosts.
     */
    const data = serializeData(request, requestOptions);
    const headers = serializeHeaders(this.baseHeaders, requestOptions);
    const method = request.method;

    // On `GET`, the data is proxied to query parameters.
    const dataQueryParameters: Record<string, any> =
      request.method !== 'GET'
        ? {}
        : {
            ...request.data,
            ...requestOptions.data,
          };

    const queryParameters = {
      'x-algolia-agent': this.userAgent,
      ...dataQueryParameters,
      ...requestOptions.queryParameters,
    };

    let timeoutsCount = 0;

    const retry = async (
      hosts: Host[],
      getTimeout: (timeoutsCount: number, timeout: number) => number
    ): Promise<TResponse> => {
      /**
       * We iterate on each host, until there is no host left.
       */
      const host = hosts.pop();
      if (host === undefined) {
        throw new RetryError(stackTrace);
      }

      const payload: EndRequest = {
        data,
        headers,
        method,
        url: serializeUrl(host, request.path, queryParameters),
        connectTimeout: getTimeout(timeoutsCount, this.timeouts.connect),
        responseTimeout: getTimeout(timeoutsCount, requestOptions.timeout ?? this.timeouts.read),
      };

      /**
       * The stackFrame is pushed to the stackTrace so we
       * can have information about onRetry and onFailure
       * decisions.
       */
      const pushToStackTrace = (response: Response): StackFrame => {
        const stackFrame: StackFrame = {
          request: payload,
          response,
          host,
          triesLeft: hosts.length,
        };

        stackTrace.push(stackFrame);

        return stackFrame;
      };

      const decisions: Outcomes<TResponse> = {
        onSuccess: (response) => deserializeSuccess(response),
        onRetry: async (response) => {
          const stackFrame = pushToStackTrace(response);

          /**
           * If response is a timeout, we increaset the number of
           * timeouts so we can increase the timeout later.
           */
          if (response.isTimedOut) {
            timeoutsCount++;
          }

          await Promise.all([
            /**
             * Failures are individually send the logger, allowing
             * the end user to debug / store stack frames even
             * when a retry error does not happen.
             */
            //transporter.logger.info('Retryable failure', stackFrameWithoutCredentials(stackFrame)),

            /**
             * We also store the state of the host in failure cases. If the host, is
             * down it will remain down for the next 2 minutes. In a timeout situation,
             * this host will be added end of the list of hosts on the next request.
             */
            this.hostsCache.set(
              host,
              new StatefulHost(host, response.isTimedOut ? 'timedout' : 'down')
            ),
          ]);
          return retry(hosts, getTimeout);
        },
        onFail: (response) => {
          pushToStackTrace(response);

          throw deserializeFailure(response, stackTrace);
        },
      };

      const response = await this.requester.send(payload);
      return retryDecision(response, decisions);
    };

    /**
     * Finally, for each retryable host perform request until we got a non
     * retryable response. Some notes here:
     *
     * 1. The reverse here is applied so we can apply a `pop` later on => more performant.
     * 2. We also get from the retryable options a timeout multiplier that is tailored
     * for the current context.
     */
    const options = await this.createRetryableOptions();
    return retry([...options.hosts].reverse(), options.getTimeout);
  }
}
