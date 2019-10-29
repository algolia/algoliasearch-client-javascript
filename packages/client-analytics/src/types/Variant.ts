import { SearchOptions } from '@algolia/client-search/src/types/SearchOptions';

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

  /**
   * The search parameters.
   *
   * @todo Handle this search options type.
   */
  readonly customSearchParameters?: SearchOptions;
};
