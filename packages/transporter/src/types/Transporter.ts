import { Cache } from '@algolia/cache-common';
import { Logger } from '@algolia/logger-common';
import { Requester } from '@algolia/requester-common';

import {
  Headers,
  QueryParameters,
  Request,
  RequestOptions,
  StatelessHost,
  Timeouts,
  UserAgent,
} from '.';

export type Transporter = {
  /**
   * The cache of the hosts. Usually used to persist
   * the state of the host when its down.
   */
  readonly hostsCache: Cache;

  /**
   * The logger instance to send events of the transporter.
   */
  readonly logger: Logger;

  /**
   * The underlying requester used. Should differ
   * depending of the enviroment where the client
   * will be used.
   */
  readonly requester: Requester;

  /**
   * The cache of the requests. When requests are
   * `cacheable`, the returned promised persists
   * in this cache to shared in similar resquests
   * before being resolved.
   */
  readonly requestsCache: Cache;

  /**
   * The cache of the responses. When requests are
   * `cacheable`, the returned responses persists
   * in this cache to shared in similar resquests.
   */
  readonly responsesCache: Cache;

  /**
   * The timeouts used by the requester. The transporter
   * layer may increase this timeouts as defined on the
   * retry strategy.
   */
  readonly timeouts: Timeouts;

  /**
   * The user agent used. Sent on query parameters.
   */
  readonly userAgent: UserAgent;

  /**
   * The headers used on each request.
   */
  readonly headers: Headers;

  /**
   * The query parameters used on each request.
   */
  readonly queryParameters: QueryParameters;

  /**
   * The hosts used by the retry strategy.
   *
   * @readonly
   */
  hosts: readonly StatelessHost[]; // eslint-disable-line functional/prefer-readonly-type

  /**
   * Performs a read request using read hosts.
   */
  readonly read: <TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TResponse>>;

  /**
   * Performs a write request using write hosts.
   */
  readonly write: <TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TResponse>>;
};
