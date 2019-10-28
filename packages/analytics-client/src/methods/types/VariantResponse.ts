import { SearchOptions } from '@algolia/search-client/src/methods/types/SearchOptions';

import { Variant } from './Variant';

export type VariantResponse = Variant & {
  /**
   * Average click position for the variant.
   */
  readonly averageClickPostion?: number;

  /**
   * Distinct click count for the variant.
   */
  readonly clickCount?: number;

  /**
   * Click through rate for the variant.
   */
  readonly clickThroughRate?: number;

  /**
   * Click through rate for the variant.
   */
  readonly conversionCount?: number;

  /**
   * Distinct conversion count for the variant.
   */
  readonly conversionRate?: number;

  /**
   * No result count.
   */
  readonly noResultCount?: number;

  /**
   * Search count.
   */
  readonly searchCount?: number;

  /**
   * User count.
   */
  readonly userCount?: number;

  /**
   * The search parameters.
   *
   * @todo Handle this search options type.
   */
  readonly customSearchParameters?: SearchOptions;
};
