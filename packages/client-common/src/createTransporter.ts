import { isRetryable, isSuccess } from './Response';
import { createStatefulHost } from './createStatefulHost';
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
  Host,
  Request,
  RequestOptions,
  Response,
  StackFrame,
  TransporterOptions,
  Transporter,
} from './types';

type RetryableOptions = {
  hosts: Host[];
  getTimeout: (retryCount: number, timeout: number) => number;
};

export function createTransporter({
  hosts,
  hostsCache,
  baseHeaders,
  baseQueryParameters,
  userAgent,
  timeouts,
  requester,
}: TransporterOptions): Transporter {
  async function createRetryableOptions(
    compatibleHosts: Host[]
  ): Promise<RetryableOptions> {
    const statefulHosts = await Promise.all(
      compatibleHosts.map((compatibleHost) => {
        return hostsCache.get(compatibleHost, () => {
          return Promise.resolve(createStatefulHost(compatibleHost));
        });
      })
    );
    const hostsUp = statefulHosts.filter((host) => host.isUp());
    const hostsTimeouted = statefulHosts.filter((host) => host.isTimedout());

    // Note, we put the hosts that previously timeouted on the end of the list.
    const hostsAvailable = [...hostsUp, ...hostsTimeouted];
    const compatibleHostsAvailable =
      hostsAvailable.length > 0 ? hostsAvailable : compatibleHosts;

    return {
      hosts: compatibleHostsAvailable,
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

  async function retryableRequest<TResponse>(
    request: Request,
    requestOptions: RequestOptions
  ): Promise<TResponse> {
    const stackTrace: StackFrame[] = [];
    const isRead = request.method === 'GET';

    /**
     * First we prepare the payload that do not depend from hosts.
     */
    const data = serializeData(request, requestOptions);
    const headers = serializeHeaders(baseHeaders, requestOptions);
    const method = request.method;

    // On `GET`, the data is proxied to query parameters.
    const dataQueryParameters: Record<string, any> = isRead
      ? {
          ...request.data,
          ...requestOptions.data,
        }
      : {};

    const queryParameters = {
      'x-algolia-agent': userAgent.value,
      ...baseQueryParameters,
      ...dataQueryParameters,
      ...requestOptions.queryParameters,
    };

    let timeoutsCount = 0;

    const retry = async (
      retryableHosts: Host[],
      getTimeout: (timeoutsCount: number, timeout: number) => number
    ): Promise<TResponse> => {
      /**
       * We iterate on each host, until there is no host left.
       */
      const host = retryableHosts.pop();
      if (host === undefined) {
        throw new RetryError(stackTraceWithoutCredentials(stackTrace));
      }

      let responseTimeout = requestOptions.timeout;
      if (responseTimeout === undefined) {
        responseTimeout = isRead ? timeouts.read : timeouts.write;
      }

      const payload: EndRequest = {
        data,
        headers,
        method,
        url: serializeUrl(host, request.path, queryParameters),
        connectTimeout: getTimeout(timeoutsCount, timeouts.connect),
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
          triesLeft: retryableHosts.length,
        };

        stackTrace.push(stackFrame);

        return stackFrame;
      };

      const response = await requester.send(payload, request);

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
        // eslint-disable-next-line no-console -- this will be fixed by exposing a `logger` to the transporter
        console.log(
          'Retryable failure',
          stackFrameWithoutCredentials(stackFrame)
        );

        /**
         * We also store the state of the host in failure cases. If the host, is
         * down it will remain down for the next 2 minutes. In a timeout situation,
         * this host will be added end of the list of hosts on the next request.
         */
        await hostsCache.set(
          host,
          createStatefulHost(host, response.isTimedOut ? 'timedout' : 'down')
        );

        return retry(retryableHosts, getTimeout);
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
    const compatibleHosts = hosts.filter(
      (host) =>
        host.accept === 'readWrite' ||
        (isRead ? host.accept === 'read' : host.accept === 'write')
    );
    const options = await createRetryableOptions(compatibleHosts);

    return retry([...options.hosts].reverse(), options.getTimeout);
  }

  return {
    hostsCache,
    requester,
    timeouts,
    userAgent,
    baseHeaders,
    baseQueryParameters,
    hosts,
    request: retryableRequest,
  };
}
