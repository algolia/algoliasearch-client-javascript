import { Cache } from '@algolia/cache-types';
import { Requester } from '@algolia/requester-types';

declare const testing: {
  readonly requester: () => Requester;
  readonly requestsCache: () => Cache;
  readonly hostsCache: () => Cache;
  readonly responsesCache: () => Cache;
  readonly environment: () => string;
  readonly isBrowser: () => boolean;
};
