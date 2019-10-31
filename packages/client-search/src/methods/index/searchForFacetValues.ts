import { encode } from '@algolia/client-common/helpers';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { SearchForFacetValuesResponse } from '../../types/SearchForFacetValuesResponse';
import { SearchIndex } from '../../types/SearchIndex';
import { SearchOptions } from '../../types/SearchOptions';

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
          method: MethodEnum.Post,
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
