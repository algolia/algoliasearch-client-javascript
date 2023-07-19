// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { Facet } from './facet';

/**
 * Configuration of an Algolia index for Query Suggestions.
 */
export type SourceIndex = {
  /**
   * Name of the Algolia index to use as source for query suggestions.
   */
  indexName: string;

  /**
   * If true, Query Suggestions uses all replicas of the primary index to find popular searches. If false, only the primary index is used.
   */
  replicas?: boolean;

  /**
   * [Analytics tags](https://www.algolia.com/doc/api-reference/api-parameters/analyticsTags/) for filtering the popular searches.
   */
  analyticsTags?: string[] | null;

  /**
   * Facets to use as top categories with your suggestions.  If provided, Query Suggestions adds the top facet values to each suggestion.
   */
  facets?: Facet[] | null;

  /**
   * Minimum number of hits required to be included as a suggestion.  A search query must at least generate `minHits` hits to be included in the Query Suggestions index.
   */
  minHits?: number;

  /**
   * Minimum letters required to be included as a suggestion.  A search query must be at least `minLetters` long to be included in the Query Suggestions index.
   */
  minLetters?: number;

  generate?: string[][];

  /**
   * Algolia indices with popular searches to use as query suggestions.  Records of these indices must have these attributes:    - `query`: search query which will be added as a suggestion   - `count`: measure of popularity of that search query  For example, you can export popular searches from an external analytics tool, such as Google Analytics or Adobe Analytics, and feed this data into an external Algolia index. You can use this external index to generate query suggestions until your Algolia analytics has collected enough data.
   */
  external?: string[] | null;
};
