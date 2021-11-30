import { BaseSearchResponse } from './baseSearchResponse';
import { BaseSearchResponseFacetsStats } from './baseSearchResponseFacetsStats';
import { RecommendHits } from './recommendHits';
import { RecommendRecord } from './recommendRecord';

export type RecommendationsResponse = BaseSearchResponse & RecommendHits;
