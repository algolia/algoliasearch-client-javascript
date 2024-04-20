import { Cache } from '@sefai/cache-common';

export type FallbackableCacheOptions = {
  /**
   * List of caches order by priority.
   */
  readonly caches: readonly Cache[];
};
