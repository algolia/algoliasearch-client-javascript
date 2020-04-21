import { SearchOptions } from '@algolia/client-search';

import { Variant } from './Variant';

export type VariantResponse = Variant & {
  /**
   * Average click position for the variant.
   */
  averageClickPostion?: number;

  /**
   * Distinct click count for the variant.
   */
  clickCount?: number;

  /**
   * Click through rate for the variant.
   */
  clickThroughRate?: number;

  /**
   * Click through rate for the variant.
   */
  conversionCount?: number;

  /**
   * Distinct conversion count for the variant.
   */
  conversionRate?: number;

  /**
   * No result count.
   */
  noResultCount?: number;

  /**
   * Search count.
   */
  searchCount?: number;

  /**
   * User count.
   */
  userCount?: number;

  // @todo Handle this search options type.
  /**
   * The search parameters.
   */
  customSearchParameters?: SearchOptions;
};
