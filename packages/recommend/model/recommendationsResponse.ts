import type { BaseSearchResponse } from './baseSearchResponse';
import type { RecommendHits } from './recommendHits';

export type RecommendationsResponse = BaseSearchResponse & RecommendHits;
