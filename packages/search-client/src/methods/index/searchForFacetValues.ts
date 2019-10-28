import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchForFacetValuesResponse } from '../types/SearchForFacetValuesResponse';
import { SearchIndex } from '../types/SearchIndex';
import { SearchOptions } from '../types/SearchOptions';

export const searchForFacetValues = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSearchForFacetValues => {
  return {
    ...base,
    searchForFacetValues(
      facetName: string,
      facetQuery: string,
      requestOptions?: RequestOptions & SearchOptions
    ): Readonly<Promise<SearchForFacetValuesResponse>> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: encode('1/indexes/%s/facets/%s/query', this.indexName, facetName),
          data: {
            facetQuery,
          },
          cacheable: true,
        },
        requestOptions
      );
    },
  };
};

export type HasSearchForFacetValues = SearchIndex & {
  readonly searchForFacetValues: (
    facetName: string,
    facetQuery: string,
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<SearchForFacetValuesResponse>>;
};
