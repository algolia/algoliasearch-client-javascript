import { RecommendationsQuery } from './RecommendationsQuery';

export type LookingSimilarQuery = Omit<RecommendationsQuery, 'model'>;
