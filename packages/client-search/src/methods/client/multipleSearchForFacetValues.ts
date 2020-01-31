import { RequestOptions } from '@algolia/transporter';

import {
  initIndex,
  SearchClient,
  searchForFacetValues,
  SearchForFacetValuesQueryParams,
  SearchForFacetValuesResponse,
  SearchOptions,
} from '../..';

export const multipleSearchForFacetValues = (base: SearchClient) => {
  return (
    queries: ReadonlyArray<{
      readonly indexName: string;
      readonly params: SearchForFacetValuesQueryParams & SearchOptions;
    }>,
    requestOptions?: RequestOptions
  ): Readonly<Promise<readonly SearchForFacetValuesResponse[]>> => {
    return Promise.all(
      queries.map(query => {
        const { facetName, facetQuery, ...params } = query.params;

        return initIndex(base)(query.indexName, {
          methods: { searchForFacetValues },
        }).searchForFacetValues(facetName, facetQuery, {
          ...requestOptions,
          ...params,
        });
      })
    );
  };
};
