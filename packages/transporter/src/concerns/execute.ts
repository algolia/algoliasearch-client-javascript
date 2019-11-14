import { createHost, createRetryError, MappedRequestOptions, Request, Transporter } from '..';
import { deserializeFailure, deserializeSuccess } from '../deserializer';
import { serializeData, serializeUrl } from '../serializer';
import { decision } from './decision';

// eslint-disable-next-line max-params
export function execute<TResponse>(
  transporter: Transporter,
  hosts: ReadonlyArray<ReturnType<typeof createHost>>,
  request: Request,
  requestOptions: MappedRequestOptions
): Readonly<Promise<TResponse>> {
  let timeoutRetries = 0; // eslint-disable-line functional/no-let

  return Promise.all(
    hosts.map(host =>
      transporter.hostsCache
        .get({ url: host.url }, () => Promise.resolve(host))
        .then((value: ReturnType<typeof createHost>) => {
          // eslint-disable-next-line functional/immutable-data
          return Object.assign(host, {
            downDate: value.downDate,
            up: value.up,
          });
        })
    )
  ).then(statefulHosts => {
    const statefulHostsAvailable = statefulHosts.filter(host => host.isUp()).reverse();

    const forEachHost = <TResponse>(
      host?: ReturnType<typeof createHost>
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
              return (
                transporter.logger
                  .debug('Retryable failure', {
                    request,
                    response,
                    host,
                    triesLeft: statefulHostsAvailable.length,
                    timeoutRetries,
                  })
                  .then(() => {
                    if (response.isTimedOut) {
                      timeoutRetries++;
                    }

                    return transporter.hostsCache.set({ url: host.url }, host);
                  })
                  // eslint-disable-next-line functional/immutable-data
                  .then(() => forEachHost(statefulHostsAvailable.pop()))
              );
            },
            fail: () => {
              throw deserializeFailure(response);
            },
          })
        );
    };

    // eslint-disable-next-line functional/immutable-data
    return forEachHost(statefulHostsAvailable.pop());
  });
}
