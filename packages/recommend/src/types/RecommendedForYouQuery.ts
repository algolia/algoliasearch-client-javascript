import { RecommendationsQuery } from './RecommendationsQuery';

export type RecommendedForYouQuery = Omit<RecommendationsQuery, 'model'>;
