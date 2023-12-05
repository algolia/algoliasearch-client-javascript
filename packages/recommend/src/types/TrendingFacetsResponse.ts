import { SearchResponse } from '@algolia/client-search';

import { TrendingFacetHit } from './TrendingFacetHit';

export type TrendingFacetsResponse<TObject> = Omit<SearchResponse<TObject>, 'hits'> & {
  readonly hits: ReadonlyArray<TrendingFacetHit<TObject>>;
};
