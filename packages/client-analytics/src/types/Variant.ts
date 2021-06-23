import { SearchOptions } from '@algolia/client-search';

export type Variant = {
  /**
   * The index name.
   */
  readonly index: string;

  /**
   * Description of the variant. Useful when seing the results in the dashboard or via the API.
   */
  readonly description?: string;

  /**
   * Percentage of the traffic that should be going to the variant. The sum of the percentage should be equal to 100.
   */
  readonly trafficPercentage: number;

  // @todo Handle this search options type.
  /**
   * The search parameters.
   */
  readonly customSearchParameters?: SearchOptions;
};
