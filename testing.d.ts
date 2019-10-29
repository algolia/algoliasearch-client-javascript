import { Cache } from '@algolia/cache-common';
import { Requester } from '@algolia/requester-common/src/types/Requester';

declare const testing: {
  readonly requester: () => Requester;
  readonly requestsCache: () => Cache;
  readonly hostsCache: () => Cache;
  readonly responsesCache: () => Cache;
  readonly environment: () => string;
  readonly isBrowser: () => boolean;
};
