// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { RecommendationsHit } from './recommendationsHit';

export type RecommendationsHits = {
  hits: RecommendationsHit[];

  /**
   * Search query.
   */
  query?: string;

  /**
   * URL-encoded string of all search parameters.
   */
  params?: string;
};