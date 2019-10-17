import { Cache, NullCache } from '@algolia/cache-types';
import { Logger, NullLogger } from '@algolia/logger-types';
import { Requester } from '@algolia/requester-types';
import {
  Call,
  Host,
  MappedRequestOptions,
  mapRequestOptions,
  Request,
  RequestOptions,
  RetryError,
  Timeouts,
  Transporter as TransporterContract,
} from '@algolia/transporter-types';

import { decision } from './concerns/decision';
import { Deserializer } from './Deserializer';
import { Serializer } from './Serializer';

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

  private readonly responsesCache: Cache;

  private readonly hostsCache: Cache;

  private readonly requestsCache: Cache;

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
    readonly responsesCache?: Cache;
    readonly hostsCache?: Cache;
    readonly requestsCache?: Cache;
  }) {
    this.headers = options.headers !== undefined ? options.headers : {};
    this.queryParameters = options.queryParameters !== undefined ? options.queryParameters : {};
    this.hosts = options.hosts !== undefined ? options.hosts : [];

    this.requester = options.requester;
    this.timeouts = options.timeouts;

    this.logger = options.logger !== undefined ? options.logger : new NullLogger();

    this.responsesCache =
      options.responsesCache !== undefined ? options.responsesCache : new NullCache();

    this.hostsCache = options.hostsCache !== undefined ? options.hostsCache : new NullCache();

    this.requestsCache =
      options.requestsCache !== undefined ? options.requestsCache : new NullCache();
  }

  public read<TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ): Readonly<Promise<TResponse>> {
    const mappedRequestOptions = mapRequestOptions(requestOptions, this.timeouts.read);

    const key = { request, mappedRequestOptions };

    const createRequest = (): Readonly<Promise<TResponse>> => {
      return this.request<TResponse>(
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
            // eslint-disable-next-line promise/no-nesting
            .then(response => this.requestsCache.delete(key).then(() => response))
        ),
      {
        miss: response => this.responsesCache.set(key, response),
      }
    );
  }

  public write<TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ): Readonly<Promise<TResponse>> {
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
  ): Readonly<Promise<TResponse>> {
    let timeoutRetries = 0; // eslint-disable-line functional/no-let

    return Promise.all(
      hosts.map(host =>
        this.hostsCache
          .get({ url: host.url }, () => Promise.resolve(host))
          .then((value: Host) => {
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

      const forEachHost = <TResponse>(host: Host | undefined): Readonly<Promise<TResponse>> => {
        if (host === undefined) {
          throw new RetryError();
        }

        // eslint-disable-next-line promise/no-nesting
        return this.requester
          .send({
            data: Serializer.data(request, requestOptions),
            headers: { ...this.headers, ...requestOptions.headers },
            method: request.method,
            url: Serializer.url(host, request.path, {
              ...this.queryParameters,
              ...requestOptions.queryParameters,
            }),
            timeout: (timeoutRetries + 1) * (requestOptions.timeout ? requestOptions.timeout : 0),
          })
          .then(response =>
            decision(host, response, {
              success: () => Deserializer.success(response),
              retry: () => {
                this.logger.debug('Retryable failure', {
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
                  // eslint-disable-next-line promise/no-nesting
                  this.hostsCache
                    .set({ url: host.url }, host)
                    // eslint-disable-next-line functional/immutable-data
                    .then(() => forEachHost(hosts.pop()))
                );
              },
              fail: () => {
                throw Deserializer.fail(response);
              },
            })
          );
      };

      // eslint-disable-next-line functional/immutable-data
      return forEachHost(hosts.pop());
    });
  }
}
