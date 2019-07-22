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
import { RetryStrategy, RetryOutcome } from './RetryStrategy';
import { Serializer } from './Serializer';

export class Transporter implements TransporterContract {
  private headers: { [key: string]: string };
  private hosts: Host[];
  private logger: Logger;
  private requester: Requester;
  private timeouts: Timeouts;

  private retryStrategy: RetryStrategy;

  public constructor(options: {
    headers: { [key: string]: string };
    hosts: Host[];
    logger: Logger;
    requester: Requester;
    timeouts: Timeouts;
  }) {
    this.headers = options.headers;
    this.hosts = options.hosts;
    this.logger = options.logger;
    this.requester = options.requester;
    this.timeouts = options.timeouts;

    this.retryStrategy = new RetryStrategy();
  }

  public withHeaders(headers: { [key: string]: string }): TransporterContract {
    return new Transporter({
      headers,
      hosts: this.hosts,
      logger: this.logger,
      requester: this.requester,
      timeouts: this.timeouts,
    });
  }

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
    const options = mapRequestOptions(requestOptions);

    if (options.timeout === undefined) {
      options.timeout = this.timeouts.read;
    }

    return this.request(
      this.hosts.filter(host => {
        return (host.accept & CallType.Read) !== 0;
      }),
      request,
      options
    );
  }

  public write<TResponse>(request: Request, requestOptions?: RequestOptions): Promise<TResponse> {
    const options = mapRequestOptions(requestOptions);

    if (options.timeout === undefined) {
      options.timeout = this.timeouts.write;
    }

    return this.request(
      this.hosts.filter(host => {
        return (host.accept & CallType.Write) !== 0;
      }),
      request,
      options
    );
  }

  private request<TResponse>(
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
    hosts: Host[],
    request: Request,
    requestOptions: MappedRequestOptions,
    resolve: Function,
    reject: Function
  ): void {
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
        switch (this.retryStrategy.decide(host, response)) {
          case RetryOutcome.Success: {
            resolve(Deserializer.success(response));
            break;
          }
          case RetryOutcome.Retry: {
            this.logger.info('Retriable failure', {
              request,
              response,
              host,
              triesLeft: hosts.length,
            });
            this.retry(hosts, request, requestOptions, resolve, reject);
            break;
          }
          case RetryOutcome.Fail: {
            reject(Deserializer.fail(response));
            break;
          }
          default: {
            throw Error('This should not happen.');
          }
        }
      });
  }
}
