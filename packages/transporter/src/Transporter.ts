import {
  Host,
  Transporter as TransporterContract,
  Timeouts,
  Request,
  RequestOptions,
  MappedRequestOptions,
  CallType,
  RetryError,
  mapRequestOptions,
} from '@algolia/transporter-types';

import { Cache } from '@algolia/cache-types';
import { Deserializer } from './Deserializer';
import { Logger, NullLogger } from '@algolia/logger-types';
import { Requester } from '@algolia/requester-types';
import { RetryStrategy } from './RetryStrategy';
import { Serializer } from './Serializer';
import { NullCache } from '../../cache-types/src';

export class Transporter implements TransporterContract {
  private readonly headers: { readonly [key: string]: string };

  private readonly logger: Logger;

  private readonly requester: Requester;

  private readonly timeouts: Timeouts;

  // eslint-disable-next-line functional/prefer-readonly-type
  private hosts: Host[];

  private readonly responseCache: Cache;

  private readonly hostsCache: Cache;

  private readonly retryStrategy: RetryStrategy;

  public constructor(options: {
    readonly headers: { readonly [key: string]: string };
    readonly requester: Requester;
    readonly timeouts: Timeouts;
    hosts: Host[]; // eslint-disable-line functional/prefer-readonly-type

    readonly logger?: Logger;
    readonly responseCache?: Cache;
    readonly hostsCache?: Cache;
  }) {
    this.headers = options.headers;
    this.hosts = options.hosts;
    this.requester = options.requester;
    this.timeouts = options.timeouts;

    this.logger = options.logger !== undefined ? options.logger : new NullLogger();

    this.responseCache =
      options.responseCache !== undefined ? options.responseCache : new NullCache();

    this.hostsCache = options.hostsCache !== undefined ? options.hostsCache : new NullCache();

    this.retryStrategy = new RetryStrategy();
  }

  public withHeaders(headers: { readonly [key: string]: string }): TransporterContract {
    return new Transporter({
      responseCache: this.responseCache,
      headers,
      hosts: this.hosts,
      logger: this.logger,
      requester: this.requester,
      timeouts: this.timeouts,
    });
  }

  // eslint-disable-next-line functional/prefer-readonly-type
  public withHosts(hosts: Host[]): TransporterContract {
    return new Transporter({
      responseCache: this.responseCache,
      hosts,
      requester: this.requester,
      logger: this.logger,
      timeouts: this.timeouts,
      headers: this.headers,
    });
  }

  public read<TResponse>(request: Request, requestOptions?: RequestOptions): Promise<TResponse> {
    const mappedRequestOptions = mapRequestOptions(requestOptions, this.timeouts.read);

    const key = { ...request, ...mappedRequestOptions };

    const that = this;

    return this.responseCache.get<TResponse>(
      key,
      () =>
        this.request(
          this.hosts.filter(host => {
            return (host.accept & CallType.Read) !== 0;
          }),
          request,
          mappedRequestOptions
        ),
      {
        miss(response: TResponse): Promise<void> {
          that.logger.debug('Cache miss', {
            cache: that.responseCache.constructor.name,
            key,
            value: response,
          });

          return that.responseCache.set(key, response);
        },
      }
    );
  }

  public write<TResponse>(request: Request, requestOptions?: RequestOptions): Promise<TResponse> {
    return this.request(
      this.hosts.filter(host => {
        return (host.accept & CallType.Write) !== 0;
      }),
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
    return new Promise<TResponse>((resolve, reject): void => {
      this.retry(
        hosts.filter(host => host.isUp()).reverse(),
        request,
        requestOptions,
        resolve,
        reject
      );
    });
  }

  private retry(
    // eslint-disable-next-line functional/prefer-readonly-type
    hosts: Host[],
    request: Request,
    requestOptions: MappedRequestOptions,
    resolve: Function,
    reject: Function
  ): void {
    // eslint-disable-next-line functional/immutable-data
    const host = hosts.pop();

    if (host === undefined) {
      const error: RetryError = {
        name: RetryError.name,
        message: 'Unreachable hosts',
      };

      reject(error);

      return;
    }

    const that = this;

    const hostKey = {
      url: host.url,
      accept: host.accept,
    };

    this.hostsCache
      .get<Host>(hostKey, () => Promise.resolve(host), {
        miss: (value: Host) => {
          return that.hostsCache.set(hostKey, value);
        },
      })
      .then(hostValue => {
        this.requester
          .send({
            data: Serializer.data({
              ...request.data,
              ...requestOptions.data,
            }),
            headers: {
              ...requestOptions.headers,
              ...this.headers,
            },
            method: request.method,
            url: Serializer.url(hostValue, request.path, requestOptions.queryParameters),
            timeout: requestOptions.timeout ? requestOptions.timeout : 0,
          })
          .then(response => {
            this.retryStrategy.decide(hostValue, response, {
              success() {
                resolve(Deserializer.success(response));
              },
              retry() {
                that.logger.info('Retriable failure', {
                  request,
                  response,
                  hostValue,
                  triesLeft: hosts.length,
                });
                that.retry(hosts, request, requestOptions, resolve, reject);
              },
              fail() {
                reject(Deserializer.fail(response));
              },
            });
          });
      });
  }
}
