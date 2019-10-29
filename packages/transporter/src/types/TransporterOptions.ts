import { Cache } from '@algolia/cache-types/src/types/Cache';
import { Logger } from '@algolia/logger-types/src/types/Logger';
import { Requester } from '@algolia/requester-types/src/types/Requester';

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
