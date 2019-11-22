import {
  createRetryError,
  deserializeFailure,
  deserializeSuccess,
  Host,
  MappedRequestOptions,
  Request,
  serializeData,
  serializeUrl,
  StackFrame,
  Transporter,
} from '..';
import { decision, Outcomes } from './decision';
import { getAvailableHosts } from './getAvailableHosts';

export function execute<TResponse>(
  transporter: Transporter,
  statelessHosts: readonly Host[],
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

  const retry = (hosts: Host[]): Readonly<Promise<TResponse>> => {
    // eslint-disable-next-line functional/immutable-data
    const host = hosts.pop();

    if (host === undefined) {
      throw createRetryError(stackTrace);
    }

    const payload = {
      data,
      headers,
      method,
      url: serializeUrl(host, request.path, {
        ...transporter.queryParameters,
        ...requestOptions.queryParameters,
        'x-algolia-agent': transporter.userAgent.value,
      }),
      timeout: (timeoutRetries + 1) * (requestOptions.timeout ? requestOptions.timeout : 0),
    };

    const decisions: Outcomes<TResponse> = {
      onSucess: response => deserializeSuccess(response),
      onRetry: response => {
        const stackFrame: StackFrame = {
          request: payload,
          response,
          host,
          triesLeft: hosts.length,
          timeoutRetries,
        };

        // eslint-disable-next-line functional/immutable-data
        stackTrace.push(stackFrame);

        if (response.isTimedOut) {
          timeoutRetries++;
        }

        return Promise.all([
          transporter.logger.debug('Retryable failure', stackFrame),
          transporter.hostsCache.set({ url: host.url }, host),
        ]).then(() => retry(hosts));
      },
      onFail: response => {
        throw deserializeFailure(response);
      },
    };

    return transporter.requester.send(payload).then(response => {
      return decision(host, response, decisions);
    });
  };

  return getAvailableHosts(transporter.hostsCache, statelessHosts).then(hosts => retry(hosts));
}
