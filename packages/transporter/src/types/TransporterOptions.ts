import { Cache } from '@algolia/cache-common';
import { Logger } from '@algolia/logger-common';
import { Requester } from '@algolia/requester-common';

import { Headers, HostOptions, QueryParameters, Timeouts, UserAgent } from '..';

export type TransporterOptions = {
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
   * The hosts used by the requester.
   */
  readonly hosts: readonly HostOptions[];

  /**
   * The headers used by the requester. The transporter
   * layer may add some extra headers during the request
   * for the user agent, and others.
   */
  readonly headers: Headers;

  /**
   * The query parameters used by the requester. The transporter
   * layer may add some extra headers during the request
   * for the user agent, and others.
   */
  readonly queryParameters: QueryParameters;

  /**
   * The user agent used. Sent on query parameters.
   */
  readonly userAgent: UserAgent;
};
