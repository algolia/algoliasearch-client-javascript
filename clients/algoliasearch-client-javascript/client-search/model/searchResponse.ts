import { BaseSearchResponse } from './baseSearchResponse';
import { BaseSearchResponseFacetsStats } from './baseSearchResponseFacetsStats';
import { Record } from './record';
import { SearchHits } from './searchHits';

export type SearchResponse = BaseSearchResponse & SearchHits;
