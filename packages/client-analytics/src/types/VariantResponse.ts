import { SearchOptions } from '@algolia/client-search';

import { Variant } from './Variant';

export type VariantResponse = Variant & {
  /**
   * Average click position for the variant.
   */
  averageClickPosition?: number;

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
   * Tracked search count.
   */
  trackedSearchCount?: number;

  /**
   * Search count.
   */
  searchCount?: number;

  /**
   * User count.
   */
  userCount?: number;

  /**
   * Count of the tracked searches attributed to outlier traffic that were removed from the A/B test.
   */
  outlierTrackedSearchesCount?: number;

  /**
   * Count of users attributed to outlier traffic that were removed from the A/B test.
   */
  outlierUsersCount?: number;

  // @todo Handle this search options type.
  /**
   * The search parameters.
   */
  customSearchParameters?: SearchOptions;
};
