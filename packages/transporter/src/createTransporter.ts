import { mapRequestOptions } from '..';
import { execute } from './concerns/execute';
import { createHost } from './createHost';
import { Call, CallType } from './types/Call';
import { Headers } from './types/Headers';
import { QueryParameters } from './types/QueryParameters';
import { Request } from './types/Request';
import { RequestOptions } from './types/RequestOptions';
import { TransporterOptions } from './types/TransporterOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createTransporter(options: TransporterOptions) {
  return {
    ...options,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    headers: {} as Headers,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    queryParameters: {} as QueryParameters,
    hosts: [] as ReadonlyArray<ReturnType<typeof createHost>>,
    addUserAgent(segment: string, version?: string): void {
      // eslint-disable-next-line functional/immutable-data
      this.userAgent = options.userAgent.with({ segment, version });
    },
    addHeaders(headers: Headers): void {
      // eslint-disable-next-line functional/immutable-data
      Object.assign(this.headers, headers);
    },
    addQueryParameters(queryParameters: QueryParameters): void {
      // eslint-disable-next-line functional/immutable-data
      Object.assign(this.queryParameters, queryParameters);
    },
    setHosts(values: ReadonlyArray<{ readonly url: string; readonly accept: CallType }>): void {
      // eslint-disable-next-line functional/immutable-data
      this.hosts = values.map(host => createHost(host.url, host.accept));
    },
    read<TResponse>(
      request: Request,
      requestOptions?: RequestOptions
    ): Readonly<Promise<TResponse>> {
      const mappedRequestOptions = mapRequestOptions(requestOptions, this.timeouts.read);

      const key = { request, mappedRequestOptions };

      const createRequest = (): Readonly<Promise<TResponse>> => {
        return execute<TResponse>(
          this,
          this.hosts.filter(host => (host.accept & Call.Read) !== 0),
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

      return this.responsesCache.get(
        key,
        () =>
          this.requestsCache.get(key, () =>
            this.requestsCache
              .set(key, createRequest())
              .then(response => this.requestsCache.delete(key).then(() => response))
          ),
        {
          miss: response => this.responsesCache.set(key, response),
        }
      );
    },
    write<TResponse>(
      request: Request,
      requestOptions?: RequestOptions
    ): Readonly<Promise<TResponse>> {
      return execute<TResponse>(
        this,
        this.hosts.filter(host => (host.accept & Call.Write) !== 0),
        request,
        mapRequestOptions(requestOptions, this.timeouts.write)
      );
    },
  };
}
