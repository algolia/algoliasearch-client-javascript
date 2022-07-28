// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SynonymHit } from './synonymHit';

export type SearchSynonymsResponse = Record<string, any> & {
  /**
   * Array of synonym objects.
   */
  hits: SynonymHit[];

  /**
   * Number of hits that the search query matched.
   */
  nbHits: number;
};
