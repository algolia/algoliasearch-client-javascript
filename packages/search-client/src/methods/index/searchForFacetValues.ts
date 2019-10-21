import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { SearchForFacetValuesResponse } from '../types/SearchForFacetValuesResponse';
import { SearchOptions } from '../types/SearchOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const searchForFacetValues = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  return class extends base implements HasSearchForFacetValues {
    public searchForFacetValues(
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
    }
  };
};

export type HasSearchForFacetValues = SearchIndex & {
  readonly searchForFacetValues: (
    facetName: string,
    facetQuery: string,
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<SearchForFacetValuesResponse>>;
};
