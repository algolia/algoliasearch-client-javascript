import { Requester } from '@algolia/requester-types';
import { Cache } from '@algolia/cache-types';

declare const testing: {
  readonly requester: () => Requester;
  readonly requestsCache: () => Cache;
  readonly hostsCache: () => Cache;
  readonly responsesCache: () => Cache;
  readonly environment: () => string;
  readonly isBrowser: () => boolean;
};
