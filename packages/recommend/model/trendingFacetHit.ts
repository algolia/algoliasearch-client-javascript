// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

/**
 * Trending facet hit.
 */
export type TrendingFacetHit = {
  /**
   * Recommendation score.
   */
  _score?: number | undefined;

  /**
   * Facet attribute. To be used in combination with `facetValue`. If specified, only recommendations matching the facet filter will be returned.
   */
  facetName: string;

  /**
   * Facet value. To be used in combination with `facetName`. If specified, only recommendations matching the facet filter will be returned.
   */
  facetValue: string;
};
