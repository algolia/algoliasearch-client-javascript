import { SearchOptions } from './SearchOptions';

export type SearchForAnswersOptions = {
  readonly attributesForPrediction?: readonly string[];
  readonly nbHits?: number;
  readonly threshold?: number;
  readonly params?: Omit<SearchOptions, 'restrictSearchableAttributes' | 'attributesToSnippet'>;
};
