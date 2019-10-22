import { Cache } from '@algolia/cache-types';
import { Logger } from '@algolia/logger-types';
import { Requester } from '@algolia/requester-types';

import {
  Call,
  CallType,
  Host,
  MappedRequestOptions,
  mapRequestOptions,
  Request,
  RequestOptions,
  RetryError,
  Timeouts,
} from '../';
import { decision } from './concerns/decision';
import { Deserializer } from './Deserializer';
import { Serializer } from './Serializer';
import { UserAgent } from './UserAgent';

export class Transporter {
  // eslint-disable-next-line functional/prefer-readonly-type
  private hosts: Host[] = [];

  // eslint-disable-next-line functional/prefer-readonly-type
  private headers: { [key: string]: string } = {};

  // eslint-disable-next-line functional/prefer-readonly-type
  private queryParameters: { [key: string]: string } = {};

  // eslint-disable-next-line functional/prefer-readonly-type
  private userAgent: UserAgent;

  private readonly hostsCache: Cache;

  private readonly logger: Logger;

  private readonly requester: Requester;

  private readonly requestsCache: Cache;

  private readonly responsesCache: Cache;

  private readonly timeouts: Timeouts;

  public constructor(options: TransporterOptions) {
    this.hostsCache = options.hostsCache;
    this.logger = options.logger;
    this.requester = options.requester;
    this.requestsCache = options.requestsCache;
    this.responsesCache = options.responsesCache;
    this.timeouts = options.timeouts;
    this.userAgent = options.userAgent;
  }

  public addHeaders(headers: { readonly [key: string]: string }): void {
    // eslint-disable-next-line functional/immutable-data
    this.headers = Object.assign(this.headers, headers);
  }

  public addQueryParameters(queryParameters: { readonly [key: string]: string }): void {
    // eslint-disable-next-line functional/immutable-data
    this.queryParameters = Object.assign(this.queryParameters, queryParameters);
  }

  public addUserAgent(segment: string, version?: string): void {
    // eslint-disable-next-line functional/immutable-data
    this.userAgent = this.userAgent.with({ segment, version });
  }

  public setHosts(hosts: ReadonlyArray<{ readonly url: string; readonly accept: CallType }>): void {
    // eslint-disable-next-line functional/immutable-data
    this.hosts = hosts.map(host => new Host(host.url, host.accept));
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

        return this.requester
          .send({
            data: Serializer.data(request, requestOptions),
            headers: { ...this.headers, ...requestOptions.headers },
            method: request.method,
            url: Serializer.url(host, request.path, {
              ...this.queryParameters,
              ...requestOptions.queryParameters,
              'x-algolia-agent': this.userAgent.value,
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

export type TransporterOptions = {
  readonly hostsCache: Cache;
  readonly logger: Logger;
  readonly requester: Requester;
  readonly requestsCache: Cache;
  readonly responsesCache: Cache;
  readonly timeouts: Timeouts;
  readonly userAgent: UserAgent;
};
