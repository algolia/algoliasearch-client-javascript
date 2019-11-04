/* eslint functional/no-mixed-type: 0 */
import { Cache } from '@algolia/cache-common/types/Cache';
import { Logger } from '@algolia/logger-common/types/Logger';
import { Requester } from '@algolia/requester-common/types/Requester';

import { createHost } from '../createHost';
import { createUserAgent } from '../createUserAgent';
import { CallType } from './CallType';
import { Headers } from './Headers';
import { QueryParameters } from './QueryParameters';
import { Request } from './Request';
import { RequestOptions } from './RequestOptions';
import { Timeouts } from './Timeouts';

export type Transporter = {
  readonly hostsCache: Cache;
  readonly logger: Logger;
  readonly requester: Requester;
  readonly requestsCache: Cache;
  readonly responsesCache: Cache;
  readonly timeouts: Timeouts;
  readonly userAgent: ReturnType<typeof createUserAgent>;
  readonly headers: Headers;
  readonly queryParameters: QueryParameters;
  readonly hosts: ReadonlyArray<ReturnType<typeof createHost>>;
  readonly addUserAgent: (segment: string, version?: string) => void;
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
