import { Cache } from '@algolia/cache-common';

export type FallbackableCacheOptions = {
  readonly caches: readonly Cache[];
};
