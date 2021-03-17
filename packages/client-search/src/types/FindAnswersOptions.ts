import { SearchOptions } from './SearchOptions';

export type FindAnswersOptions = {
  /**
   * Attributes to use for predictions.
   * If using the default (["*"]), all attributes are used to find answers.
   */
  readonly attributesForPrediction?: readonly string[];

  /**
   * Maximum number of answers to retrieve from the Answers Engine.
   * Cannot be greater than 1000.
   */
  readonly nbHits?: number;

  /**
   * Threshold for the answers’ confidence score:
   * only answers with extracts that score above this threshold are returned.
   */
  readonly threshold?: number;

  /**
   * Whether the attribute name in which the answer was found should be returned.
   * This option is expensive in processing time.
   */
  readonly returnExtractAttribute?: boolean;

  /**
   * Algolia search parameters to use to fetch the hits.
   * Can be any search parameter, except:
   *   - attributesToSnippet
   *   - hitsPerPage
   *   - queryType
   *   - naturalLanguages and associated parameters
   *     (removeStopWords, ignorePlurals, and removeWordsIfNoResults)
   */
  readonly searchParameters?: Omit<
    SearchOptions,
    | 'attributesToSnippet'
    | 'hitsPerPage'
    | 'queryType'
    | 'naturalLanguages'
    | 'removeStopWords'
    | 'ignorePlurals'
    | 'removeWordsIfNoResults'
  >;
};
