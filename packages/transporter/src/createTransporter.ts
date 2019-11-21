import {
  CallEnum,
  CallType,
  createHost,
  Headers,
  mapRequestOptions,
  QueryParameters,
  Request,
  RequestOptions,
  Transporter,
  TransporterOptions,
} from '.';
import { execute } from './concerns/execute';
import { Host } from './types';

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
    hosts: [] as readonly Host[],
    addUserAgent(segment: string, version?: string): void {
      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      transporter.userAgent = options.userAgent.add({ segment, version });
    },
    addHeaders(headers: Headers): void {
      // eslint-disable-next-line functional/immutable-data
      Object.assign(transporter.headers, headers);
    },
    addQueryParameters(queryParameters: QueryParameters): void {
      // eslint-disable-next-line functional/immutable-data
      Object.assign(transporter.queryParameters, queryParameters);
    },
    setHosts(values: ReadonlyArray<{ readonly url: string; readonly accept: CallType }>): void {
      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      transporter.hosts = values.map(host => createHost(host.url, host.accept));
    },
    read<TResponse>(
      request: Request,
      requestOptions?: RequestOptions
    ): Readonly<Promise<TResponse>> {
      const mappedRequestOptions = mapRequestOptions(requestOptions, transporter.timeouts.read);

      const key = { request, mappedRequestOptions };

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
            return transporter.requestsCache
              .set(key, createRequest())
              .then(response => Promise.all([transporter.requestsCache.delete(key), response]))
              .then(promiseResults => promiseResults[1]);
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
        mapRequestOptions(requestOptions, transporter.timeouts.write)
      );
    },
  };

  return transporter;
}
