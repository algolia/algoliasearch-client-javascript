import { Cache } from '@algolia/cache-common';
import { Logger } from '@algolia/logger-common';
import { Requester } from '@algolia/requester-common';

import {
  CallType,
  Headers,
  Host,
  QueryParameters,
  Request,
  RequestOptions,
  Timeouts,
  UserAgent,
} from '.';

export type Transporter = {
  readonly hostsCache: Cache;
  readonly logger: Logger;
  readonly requester: Requester;
  readonly requestsCache: Cache;
  readonly responsesCache: Cache;
  readonly timeouts: Timeouts;
  readonly userAgent: UserAgent;
  readonly headers: Headers;
  readonly queryParameters: QueryParameters;
  readonly hosts: readonly Host[];
  readonly addHeaders: (headers: Headers) => void;
  readonly addQueryParameters: (queryParameters: QueryParameters) => void;
  readonly setHosts: (
    values: ReadonlyArray<{ readonly url: string; readonly accept: CallType }>
  ) => void;
  readonly read: <TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TResponse>>;
  readonly write: <TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TResponse>>;
};
