import { RecommendationsQuery } from './RecommendationsQuery';
import { RecommendSearchOptions } from './RecommendSearchOptions';

export type RecommendedForYouQuery = Omit<
  RecommendationsQuery,
  'model' | 'objectID' | 'queryParameters'
> & {
  readonly model: 'recommended-for-you';
  /**
   * List of [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/) to send.
   */
  readonly queryParameters: Omit<RecommendSearchOptions, 'userToken'> & {
    /**
     * A user identifier.
     * Format: alpha numeric string [a-zA-Z0-9_-]
     * Length: between 1 and 64 characters.
     */
    readonly userToken: string;
  };
};

/**
 * The parameters used for `getRecommendedForYou` method.
 */
export type RecommendedForYouParams = Omit<RecommendedForYouQuery, 'model'>;
