import { Cache } from '@algolia/cache-common/types/Cache';
import { Logger } from '@algolia/logger-common/types/Logger';
import { Requester } from '@algolia/requester-common/types/Requester';

import { createUserAgent } from '../createUserAgent';
import { Timeouts } from '../types/Timeouts';

export type TransporterOptions = {
  readonly hostsCache: Cache;
  readonly logger: Logger;
  readonly requester: Requester;
  readonly requestsCache: Cache;
  readonly responsesCache: Cache;
  readonly timeouts: Timeouts;
  readonly userAgent: ReturnType<typeof createUserAgent>;
};
