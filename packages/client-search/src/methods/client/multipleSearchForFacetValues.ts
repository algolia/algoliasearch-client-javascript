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
        const params = Object.assign({}, query.params);
        const facetName = params.facetName;
        const facetQuery = params.facetQuery;

        // @ts-ignore
        // eslint-disable-next-line functional/immutable-data, no-param-reassign
        delete params.facetName;
        // @ts-ignore
        // eslint-disable-next-line functional/immutable-data, no-param-reassign
        delete params.facetQuery;

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
