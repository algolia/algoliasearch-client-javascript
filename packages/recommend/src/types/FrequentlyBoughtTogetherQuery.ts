import { RecommendationsQuery } from './RecommendationsQuery';

export type FrequentlyBoughtTogetherQuery = Omit<
  RecommendationsQuery,
  'model' | 'fallbackParameters'
>;
