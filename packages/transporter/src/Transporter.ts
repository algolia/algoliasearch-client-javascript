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

import { Deserializer } from './Deserializer';
import { Logger } from '@algolia/logger-types';
import { Requester } from '@algolia/requester-types';
import { RetryStrategy } from './RetryStrategy';
import { Serializer } from './Serializer';

export class Transporter implements TransporterContract {
  private readonly headers: { readonly [key: string]: string };
  private readonly logger: Logger;
  private readonly requester: Requester;
  private readonly timeouts: Timeouts;

  // eslint-disable-next-line functional/prefer-readonly-type
  private hosts: Host[];

  private readonly retryStrategy: RetryStrategy;

  public constructor(options: {
    readonly headers: { readonly [key: string]: string };
    readonly logger: Logger;
    readonly requester: Requester;
    readonly timeouts: Timeouts;
    hosts: Host[]; // eslint-disable-line functional/prefer-readonly-type
  }) {
    this.headers = options.headers;
    this.hosts = options.hosts;
    this.logger = options.logger;
    this.requester = options.requester;
    this.timeouts = options.timeouts;

    this.retryStrategy = new RetryStrategy();
  }

  public withHeaders(headers: { readonly [key: string]: string }): TransporterContract {
    return new Transporter({
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
      hosts,
      requester: this.requester,
      logger: this.logger,
      timeouts: this.timeouts,
      headers: this.headers,
    });
  }

  public read<TResponse>(request: Request, requestOptions?: RequestOptions): Promise<TResponse> {
    return this.request(
      this.hosts.filter(host => {
        return (host.accept & CallType.Read) !== 0;
      }),
      request,
      mapRequestOptions(requestOptions, this.timeouts.read)
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
        url: Serializer.url(host, request.path, requestOptions.queryParameters),
        timeout: requestOptions.timeout ? requestOptions.timeout : 0,
      })
      .then(response => {
        const that = this;

        this.retryStrategy.decide(host, response, {
          success() {
            resolve(Deserializer.success(response));
          },
          retry() {
            that.logger.info('Retriable failure', {
              request,
              response,
              host,
              triesLeft: hosts.length,
            });
            that.retry(hosts, request, requestOptions, resolve, reject);
          },
          fail() {
            reject(Deserializer.fail(response));
          },
        });
      });
  }
}
