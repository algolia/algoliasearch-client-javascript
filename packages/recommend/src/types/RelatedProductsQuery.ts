import { RecommendationsQuery } from './RecommendationsQuery';

export type RelatedProductsQuery = Omit<RecommendationsQuery, 'model' | 'facetName' | 'facetValue'>;
