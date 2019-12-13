import {
  createRetryError,
  deserializeFailure,
  deserializeSuccess,
  MappedRequestOptions,
  Request,
  serializeData,
  serializeUrl,
  StackFrame,
  Transporter,
} from '..';
import { createUnavailableStatefullHost } from '../createStatefullHost';
import { StatelessHost } from '../types';
import { decision, Outcomes } from './decision';
import { getAvailableHosts } from './getAvailableHosts';

export function execute<TResponse>(
  transporter: Transporter,
  statelessHosts: readonly StatelessHost[],
  request: Request,
  requestOptions: MappedRequestOptions
): Readonly<Promise<TResponse>> {
  /* eslint-disable functional/prefer-readonly-type */
  const stackTrace: StackFrame[] = [];

  // eslint-disable-next-line functional/no-let
  let timeoutRetries = 0;

  const data = serializeData(request, requestOptions);
  const headers = { ...transporter.headers, ...requestOptions.headers };
  const method = request.method;

  const retry = (hosts: StatelessHost[]): Readonly<Promise<TResponse>> => {
    // eslint-disable-next-line functional/immutable-data
    const host = hosts.pop();

    if (host === undefined) {
      throw createRetryError(stackTrace);
    }

    const timeoutAdjuster = timeoutRetries + 1;

    const payload = {
      data,
      headers,
      method,
      url: serializeUrl(host, request.path, {
        ...transporter.queryParameters,
        ...requestOptions.queryParameters,
        'x-algolia-agent': transporter.userAgent.value,
      }),
      connectTimeout: timeoutAdjuster * transporter.timeouts.connect,
      socketTimeout: timeoutAdjuster * (requestOptions.timeout || 0),
    };

    const decisions: Outcomes<TResponse> = {
      onSucess: response => deserializeSuccess(response),
      onRetry(response) {
        const stackFrame: StackFrame = {
          request: payload,
          response,
          host,
          triesLeft: hosts.length,
          timeoutRetries,
        };

        // eslint-disable-next-line functional/immutable-data
        stackTrace.push(stackFrame);

        // eslint-disable-next-line functional/no-let
        let cachePromise: Readonly<Promise<any>>;

        if (response.isTimedOut) {
          cachePromise = Promise.resolve();
          timeoutRetries++;
        } else {
          // set host as down.
          cachePromise = transporter.hostsCache.set(host, createUnavailableStatefullHost(host));
        }

        return Promise.all([
          transporter.logger.debug('Retryable failure', stackFrame),
          cachePromise,
        ]).then(() => retry(hosts));
      },
      onFail(response) {
        throw deserializeFailure(response);
      },
    };

    return transporter.requester.send(payload).then(response => {
      return decision(response, decisions);
    });
  };

  return getAvailableHosts(transporter.hostsCache, statelessHosts).then(hosts =>
    // eslint-disable-next-line functional/immutable-data
    retry(hosts.reverse())
  );
}
