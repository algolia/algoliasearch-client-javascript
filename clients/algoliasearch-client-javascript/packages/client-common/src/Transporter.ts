import type { Requester } from './Requester';
import { isRetryable, isSuccess } from './Response';
import { StatefulHost } from './StatefulHost';
import { createMemoryCache } from './createMemoryCache';
import type { Cache } from './createMemoryCache';
import { RetryError } from './errors';
import {
  deserializeFailure,
  deserializeSuccess,
  serializeData,
  serializeHeaders,
  serializeUrl,
} from './helpers';
import {
  stackTraceWithoutCredentials,
  stackFrameWithoutCredentials,
} from './stackTrace';
import type {
  EndRequest,
  Headers,
  Host,
  QueryParameters,
  Request,
  RequestOptions,
  Response,
  StackFrame,
  Timeouts,
  UserAgent,
} from './types';

export class Transporter {
  private hosts: Host[];
  private baseHeaders: Headers;
  private baseQueryParameters: QueryParameters;
  private hostsCache: Cache;
  private userAgent: UserAgent;
  private timeouts: Timeouts;
  private requester: Requester;

  constructor({
    hosts,
    baseHeaders,
    baseQueryParameters,
    userAgent,
    timeouts,
    requester,
  }: {
    hosts: Host[];
    baseHeaders: Headers;
    baseQueryParameters: QueryParameters;
    userAgent: UserAgent;
    timeouts: Timeouts;
    requester: Requester;
  }) {
    this.hosts = hosts;
    this.hostsCache = createMemoryCache();
    this.baseHeaders = baseHeaders;
    this.baseQueryParameters = baseQueryParameters;
    this.userAgent = userAgent;
    this.timeouts = timeouts;
    this.requester = requester;
  }

  setHosts(hosts: Host[]): void {
    this.hosts = hosts;
    this.hostsCache.clear();
  }

  setRequester(requester: Requester): void {
    this.requester = requester;
  }

  async createRetryableOptions(compatibleHosts: Host[]): Promise<{
    hosts: Host[];
    getTimeout: (retryCount: number, timeout: number) => number;
  }> {
    const statefulHosts = await Promise.all(
      compatibleHosts.map((statelessHost) => {
        return this.hostsCache.get(statelessHost, () => {
          return Promise.resolve(new StatefulHost(statelessHost));
        });
      })
    );
    const hostsUp = statefulHosts.filter((host) => host.isUp());
    const hostsTimeouted = statefulHosts.filter((host) => host.isTimedout());

    /**
     * Note, we put the hosts that previously timeouted on the end of the list.
     */
    const hostsAvailable = [...hostsUp, ...hostsTimeouted];

    const hosts = hostsAvailable.length > 0 ? hostsAvailable : compatibleHosts;

    return {
      hosts,
      getTimeout(timeoutsCount: number, baseTimeout: number): number {
        /**
         * Imagine that you have 4 hosts, if timeouts will increase
         * on the following way: 1 (timeouted) > 4 (timeouted) > 5 (200).
         *
         * Note that, the very next request, we start from the previous timeout.
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

  async request<TResponse>(
    request: Request,
    requestOptions: RequestOptions
  ): Promise<TResponse> {
    const stackTrace: StackFrame[] = [];

    const isRead = request.method === 'GET';

    /**
     * First we prepare the payload that do not depend from hosts.
     */
    const data = serializeData(request, requestOptions);
    const headers = serializeHeaders(this.baseHeaders, requestOptions);
    const method = request.method;

    // On `GET`, the data is proxied to query parameters.
    const dataQueryParameters: Record<string, any> = isRead
      ? {
          ...request.data,
          ...requestOptions.data,
        }
      : {};

    const queryParameters = {
      'x-algolia-agent': this.userAgent.value,
      ...this.baseQueryParameters,
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
        throw new RetryError(stackTraceWithoutCredentials(stackTrace));
      }

      let responseTimeout = requestOptions.timeout;
      if (responseTimeout === undefined) {
        responseTimeout = isRead ? this.timeouts.read : this.timeouts.write;
      }

      const payload: EndRequest = {
        data,
        headers,
        method,
        url: serializeUrl(host, request.path, queryParameters),
        connectTimeout: getTimeout(timeoutsCount, this.timeouts.connect),
        responseTimeout: getTimeout(timeoutsCount, responseTimeout),
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

      const response = await this.requester.send(payload, request);

      if (isRetryable(response)) {
        const stackFrame = pushToStackTrace(response);

        // If response is a timeout, we increase the number of timeouts so we can increase the timeout later.
        if (response.isTimedOut) {
          timeoutsCount++;
        }
        /**
         * Failures are individually sent to the logger, allowing
         * the end user to debug / store stack frames even
         * when a retry error does not happen.
         */
        // eslint-disable-next-line no-console -- this will be fixed with the new `Logger`
        console.log(
          'Retryable failure',
          stackFrameWithoutCredentials(stackFrame)
        );

        /**
         * We also store the state of the host in failure cases. If the host, is
         * down it will remain down for the next 2 minutes. In a timeout situation,
         * this host will be added end of the list of hosts on the next request.
         */
        await this.hostsCache.set(
          host,
          new StatefulHost(host, response.isTimedOut ? 'timedout' : 'down')
        );
        return retry(hosts, getTimeout);
      }
      if (isSuccess(response)) {
        return deserializeSuccess(response);
      }

      pushToStackTrace(response);
      throw deserializeFailure(response, stackTrace);
    };

    /**
     * Finally, for each retryable host perform request until we got a non
     * retryable response. Some notes here:
     *
     * 1. The reverse here is applied so we can apply a `pop` later on => more performant.
     * 2. We also get from the retryable options a timeout multiplier that is tailored
     * for the current context.
     */
    const compatibleHosts = this.hosts.filter(
      (host) =>
        host.accept === 'readWrite' ||
        (isRead ? host.accept === 'read' : host.accept === 'write')
    );
    const options = await this.createRetryableOptions(compatibleHosts);
    return retry([...options.hosts].reverse(), options.getTimeout);
  }
}
