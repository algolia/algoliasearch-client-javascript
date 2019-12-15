import {
  CallEnum,
  createMappedRequestOptions,
  createStatelessHost,
  Headers,
  HostOptions,
  QueryParameters,
  Request,
  RequestOptions,
  StatelessHost,
  Transporter,
  TransporterOptions,
} from '.';
import { execute } from './concerns/execute';

export function createTransporter(options: TransporterOptions): Transporter {
  const {
    hostsCache,
    logger,
    requester,
    requestsCache,
    responsesCache,
    timeouts,
    userAgent,
  } = options;

  const transporter: Transporter = {
    hostsCache,
    logger,
    requester,
    requestsCache,
    responsesCache,
    timeouts,
    userAgent,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    headers: {} as Headers,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    queryParameters: {} as QueryParameters,
    hosts: [] as readonly StatelessHost[],
    addHeaders(headers: Headers): void {
      // eslint-disable-next-line functional/immutable-data
      Object.assign(transporter.headers, headers);
    },
    addQueryParameters(queryParameters: QueryParameters): void {
      // eslint-disable-next-line functional/immutable-data
      Object.assign(transporter.queryParameters, queryParameters);
    },
    setHosts(values: readonly HostOptions[]): void {
      // eslint-disable-next-line functional/immutable-data
      transporter.hosts = values.map(hostOptions => createStatelessHost(hostOptions));
    },
    read<TResponse>(
      request: Request,
      requestOptions?: RequestOptions
    ): Readonly<Promise<TResponse>> {
      const mappedRequestOptions = createMappedRequestOptions(
        requestOptions,
        transporter.timeouts.read
      );

      const key = {
        request,
        mappedRequestOptions,
        transporter: {
          queryParameters: transporter.queryParameters,
          headers: transporter.headers,
        },
      };

      const createRequest = (): Readonly<Promise<TResponse>> => {
        return execute<TResponse>(
          transporter,
          transporter.hosts.filter(host => (host.accept & CallEnum.Read) !== 0),
          request,
          mappedRequestOptions
        );
      };

      const cacheable =
        mappedRequestOptions.cacheable !== undefined
          ? mappedRequestOptions.cacheable
          : request.cacheable;

      if (cacheable !== true) {
        return createRequest();
      }

      return transporter.responsesCache.get(
        key,
        () => {
          return transporter.requestsCache.get(key, () => {
            return (
              transporter.requestsCache
                .set(key, createRequest())
                .then(
                  response => Promise.all([transporter.requestsCache.delete(key), response]),
                  err => Promise.all([transporter.requestsCache.delete(key), Promise.reject(err)])
                )
                // @todo Maybe remove this alias, and understand why we need it.
                .then(([_, response]) => response as TResponse)
            );
          });
        },
        {
          miss: response => transporter.responsesCache.set(key, response),
        }
      );
    },
    write<TResponse>(
      request: Request,
      requestOptions?: RequestOptions
    ): Readonly<Promise<TResponse>> {
      return execute<TResponse>(
        transporter,
        transporter.hosts.filter(host => (host.accept & CallEnum.Write) !== 0),
        request,
        createMappedRequestOptions(requestOptions, transporter.timeouts.write)
      );
    },
  };

  return transporter;
}
