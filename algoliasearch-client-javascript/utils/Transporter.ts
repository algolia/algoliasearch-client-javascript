import type {
  Host,
  Request,
  RequestOptions,
  StackFrame,
  Timeouts,
  Response,
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
import * as responseUtils from './Response';
import { Requester } from './Requester';
import { HttpRequester } from './HttpRequester';

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
    requester = new HttpRequester(),
  }: {
    hosts: Host[];
    baseHeaders: Headers;
    userAgent: string;
    timeouts: Timeouts;
    requester?: Requester;
  }) {
    this.hosts = hosts;
    this.hostsCache = new MemoryCache();
    this.baseHeaders = baseHeaders;
    this.userAgent = userAgent;
    this.timeouts = timeouts;
    this.requester = requester;
  }

  async createRetryableOptions(compatibleHosts: Host[]): Promise<{
    hosts: Host[];
    getTimeout: (retryCount: number, timeout: number) => number;
  }> {
    const statefulHosts = await Promise.all(
      compatibleHosts.map((statelessHost) => {
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

    const hosts = hostsAvailable.length > 0 ? hostsAvailable : compatibleHosts;

    return {
      hosts,
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

  async request<TResponse>(request: Request, requestOptions: RequestOptions): Promise<TResponse> {
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

      const response = await this.requester.send(payload);

      if (responseUtils.isRetryable(response)) {
        pushToStackTrace(response);

        // If response is a timeout, we increase the number of timeouts so we can increase the timeout later.
        if (response.isTimedOut) {
          timeoutsCount++;
        }

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
      if (responseUtils.isSuccess(response)) {
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
        host.accept == 'readWrite' || (isRead ? host.accept == 'read' : host.accept == 'write')
    );
    const options = await this.createRetryableOptions(compatibleHosts);
    return retry([...options.hosts].reverse(), options.getTimeout);
  }
}
