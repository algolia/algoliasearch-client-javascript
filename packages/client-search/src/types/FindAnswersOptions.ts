import { SearchOptions } from './SearchOptions';

export type FindAnswersOptions = {
  readonly attributesForPrediction?: readonly string[];
  readonly nbHits?: number;
  readonly threshold?: number;
  readonly searchParameters?: SearchOptions;
};
