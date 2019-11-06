import { createHost, createRetryError, MappedRequestOptions, Request, Transporter } from '..';
import { deserializeFailure, deserializeSuccess } from '../deserializer';
import { serializeData, serializeUrl } from '../serializer';
import { decision } from './decision';

// eslint-disable-next-line max-params
export function execute<TResponse>(
  transporter: Transporter,
  // eslint-disable-next-line functional/prefer-readonly-type
  hosts: Array<ReturnType<typeof createHost>>,
  request: Request,
  requestOptions: MappedRequestOptions
): Readonly<Promise<TResponse>> {
  let timeoutRetries = 0; // eslint-disable-line functional/no-let

  return Promise.all(
    hosts.map(host =>
      transporter.hostsCache
        .get({ url: host.url }, () => Promise.resolve(host))
        .then((value: ReturnType<typeof createHost>) => {
          // eslint-disable-next-line functional/immutable-data, no-param-reassign
          host.downDate = value.downDate;
          // eslint-disable-next-line functional/immutable-data, no-param-reassign
          host.up = value.up;

          return;
        })
    )
  ).then(() => {
    // eslint-disable-next-line no-param-reassign
    hosts = hosts.filter(host => host.isUp()).reverse();

    const forEachHost = <TResponse>(
      host: ReturnType<typeof createHost> | undefined
    ): Readonly<Promise<TResponse>> => {
      if (host === undefined) {
        throw createRetryError();
      }

      return transporter.requester
        .send({
          data: serializeData(request, requestOptions),
          headers: { ...transporter.headers, ...requestOptions.headers },
          method: request.method,
          url: serializeUrl(host, request.path, {
            ...transporter.queryParameters,
            ...requestOptions.queryParameters,
            'x-algolia-agent': transporter.userAgent.value,
          }),
          timeout: (timeoutRetries + 1) * (requestOptions.timeout ? requestOptions.timeout : 0),
        })
        .then(response =>
          decision(host, response, {
            success: () => deserializeSuccess(response),
            retry: () => {
              transporter.logger.debug('Retryable failure', {
                request,
                response,
                host,
                triesLeft: hosts.length,
                timeoutRetries,
              });

              if (response.isTimedOut) {
                timeoutRetries++;
              }

              return (
                transporter.hostsCache
                  .set({ url: host.url }, host)
                  // eslint-disable-next-line functional/immutable-data
                  .then(() => forEachHost(hosts.pop()))
              );
            },
            fail: () => {
              throw deserializeFailure(response);
            },
          })
        );
    };

    // eslint-disable-next-line functional/immutable-data
    return forEachHost(hosts.pop());
  });
}
