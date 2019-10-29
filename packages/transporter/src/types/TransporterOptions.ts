import { Cache } from '@algolia/cache-types';
import { Logger } from '@algolia/logger-types';
import { Requester } from '@algolia/requester-types';

import { createUserAgent, Timeouts } from '../..';

export type TransporterOptions = {
  readonly hostsCache: Cache;
  readonly logger: Logger;
  readonly requester: Requester;
  readonly requestsCache: Cache;
  readonly responsesCache: Cache;
  readonly timeouts: Timeouts;
  readonly userAgent: ReturnType<typeof createUserAgent>;
};
