// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SourceIndexExternal } from './sourceIndexExternal';

export type SourceIndex = {
  /**
   * Source index name.
   */
  indexName: string;
  /**
   * List of analytics tags to filter the popular searches per tag.
   */
  analyticsTags?: string[];
  /**
   * List of facets to define as categories for the query suggestions.
   */
  facets?: Array<Record<string, any>>;
  /**
   * Minimum number of hits (e.g., matching records in the source index) to generate a suggestions.
   */
  minHits?: number;
  /**
   * Minimum number of required letters for a suggestion to remain.
   */
  minLetters?: number;
  /**
   * List of facet attributes used to generate Query Suggestions. The resulting suggestions are every combination of the facets in the nested list (e.g., (facetA and facetB) and facetC).
   */
  generate?: string[][];
  /**
   * List of external indices to use to generate custom Query Suggestions.
   */
  external?: SourceIndexExternal[];
};