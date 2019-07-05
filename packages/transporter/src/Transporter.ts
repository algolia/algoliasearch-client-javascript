import {
  Host,
  Transporter as TransporterContract,
  Timeouts,
  Request,
  RequestOptions,
  CallType,
  RetryError,
} from '@algolia/transporter-types';

import { Deserialize } from './Deserialize';
import { Requester } from '@algolia/requester-types';
import { RetryStrategy, RetryOutcome } from './RetryStrategy';

export class Transporter implements TransporterContract {
  private hosts: Host[];
  private requester: Requester;
  private timeouts: Timeouts;

  private retryStrategy: RetryStrategy;

  public constructor(options: {
    hosts: Host[];
    requester: Requester;
    timeouts: Timeouts;
  }) {
    this.hosts = options.hosts;
    this.requester = options.requester;
    this.timeouts = options.timeouts;

    this.retryStrategy = new RetryStrategy();
  }

  public read<TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ): Promise<TResponse> {
    const options = RequestOptions.from(requestOptions);

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

  public write<TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ): Promise<TResponse> {
    const options = RequestOptions.from(requestOptions);

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
    requestOptions: RequestOptions
  ): Promise<TResponse> {
    return new Promise<TResponse>((resolve, reject): void => {
      this.retry(hosts.reverse(), request, requestOptions, resolve, reject);
    });
  }

  private retry(
    hosts: Host[],
    request: Request,
    requestOptions: RequestOptions,
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
        data: '',
        headers: {},
        method: request.method,
        url: `https://${host.url}/${request.path}`,
        timeout: requestOptions.timeout ? requestOptions.timeout : 0,
      })
      .then(response => {
        switch (this.retryStrategy.decide(host, response)) {
          case RetryOutcome.Success: {
            resolve(Deserialize.success(response));
            break;
          }
          case RetryOutcome.Retry: {
            this.retry(hosts, request, requestOptions, resolve, reject);
            break;
          }
          case RetryOutcome.Fail: {
            reject(Deserialize.fail(response));
            break;
          }
          default: {
            throw Error('This should not happen.');
          }
        }
      });
  }
}
