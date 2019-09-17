import {
  Host,
  Transporter as TransporterContract,
  Timeouts,
  Request,
  RequestOptions,
  MappedRequestOptions,
  RetryError,
  mapRequestOptions,
  Call,
} from '@algolia/transporter-types';

import { Cache, NullCache } from '@algolia/cache-types';
import { Deserializer } from './Deserializer';
import { Logger, NullLogger } from '@algolia/logger-types';
import { Requester } from '@algolia/requester-types';
import { Serializer } from './Serializer';

import { decide } from './concerns/decide';

export class Transporter implements TransporterContract {
  // eslint-disable-next-line functional/prefer-readonly-type
  public hosts!: Host[];

  // eslint-disable-next-line functional/prefer-readonly-type
  public headers!: { [key: string]: string };

  // eslint-disable-next-line functional/prefer-readonly-type
  public queryParameters!: { [key: string]: string };

  private readonly logger: Logger;

  private readonly requester: Requester;

  private readonly timeouts: Timeouts;

  private readonly responseCache: Cache;

  private readonly hostsCache: Cache;

  private readonly requestCache: Cache;

  public constructor(options: {
    // eslint-disable-next-line functional/prefer-readonly-type
    headers?: { readonly [key: string]: string };
    // eslint-disable-next-line functional/prefer-readonly-type
    queryParameters?: { readonly [key: string]: string };
    // eslint-disable-next-line functional/prefer-readonly-type
    hosts?: Host[];

    readonly requester: Requester;
    readonly timeouts: Timeouts;
    readonly logger?: Logger;
    readonly responseCache?: Cache;
    readonly hostsCache?: Cache;
    readonly requestCache?: Cache;
  }) {
    this.headers = options.headers !== undefined ? options.headers : {};
    this.queryParameters = options.queryParameters !== undefined ? options.queryParameters : {};
    this.hosts = options.hosts !== undefined ? options.hosts : [];

    this.requester = options.requester;
    this.timeouts = options.timeouts;

    this.logger = options.logger !== undefined ? options.logger : new NullLogger();

    this.responseCache =
      options.responseCache !== undefined ? options.responseCache : new NullCache();

    this.hostsCache = options.hostsCache !== undefined ? options.hostsCache : new NullCache();

    this.requestCache = options.requestCache !== undefined ? options.requestCache : new NullCache();
  }

  public read<TResponse>(request: Request, requestOptions?: RequestOptions): Promise<TResponse> {
    const mappedRequestOptions = mapRequestOptions(requestOptions, this.timeouts.read);

    const key = { request, mappedRequestOptions: mapRequestOptions };

    return this.responseCache.get(
      key,
      () =>
        this.requestCache.get(key, () => {
          const responsePromise = this.request<TResponse>(
            this.hosts.filter(host => (host.accept & Call.Read) !== 0),
            request,
            mappedRequestOptions
          );

          return this.requestCache
            .set(key, responsePromise)
            .then(() =>
              responsePromise.then(response => this.requestCache.delete(key).then(() => response))
            );
        }),
      {
        miss: response => this.responseCache.set(key, response),
      }
    );
  }

  public write<TResponse>(request: Request, requestOptions?: RequestOptions): Promise<TResponse> {
    return this.request(
      this.hosts.filter(host => (host.accept & Call.Write) !== 0),
      request,
      mapRequestOptions(requestOptions, this.timeouts.write)
    );
  }

  private request<TResponse>(
    // eslint-disable-next-line functional/prefer-readonly-type
    hosts: Host[],
    request: Request,
    requestOptions: MappedRequestOptions
  ): Promise<TResponse> {
    return Promise.all(
      hosts.map(
        host =>
          new Promise(resolve => {
            this.hostsCache
              .get<Host>({ url: host.url }, () => Promise.resolve(host))
              .then((value: Host) => {
                // eslint-disable-next-line functional/immutable-data, no-param-reassign
                host.downDate = value.downDate;

                // eslint-disable-next-line functional/immutable-data, no-param-reassign
                host.up = value.up;
              });

            resolve();
          })
      )
    ).then(() => {
      hosts = hosts.filter(host => host.isUp()).reverse(); // eslint-disable-line no-param-reassign

      let timeoutRetries = 0; // eslint-disable-line functional/no-let

      const retry = (
        resolve: (response: TResponse) => void,
        reject: (error: Error) => void
      ): void => {
        const host = hosts.pop(); // eslint-disable-line functional/immutable-data

        if (host === undefined) {
          reject(RetryError.make());

          return;
        }

        this.requester
          .send({
            data: Serializer.data({ ...request.data, ...requestOptions.data }),
            headers: { ...this.headers, ...requestOptions.headers },
            method: request.method,
            url: Serializer.url(host, request.path, {
              ...this.queryParameters,
              ...requestOptions.queryParameters,
            }),
            timeout: (timeoutRetries + 1) * (requestOptions.timeout ? requestOptions.timeout : 0),
          })
          .then(response => {
            decide(host, response, {
              success: () => resolve(Deserializer.success<TResponse>(response)),
              retry: () => {
                this.logger.error('Retryable failure', {
                  request,
                  response,
                  host,
                  triesLeft: hosts.length,
                  timeoutRetries,
                });

                if (response.isTimedOut) {
                  timeoutRetries++;
                }

                this.hostsCache.set({ url: host.url }, host).then(() => retry(resolve, reject));
              },
              fail: () => reject(Deserializer.fail(response)),
            });
          });

        return;
      };

      return new Promise((resolve, reject) => retry(resolve, reject));
    });
  }
}
