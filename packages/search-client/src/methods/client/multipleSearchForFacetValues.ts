import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { HasSearchForFacetValues, searchForFacetValues } from '../index/searchForFacetValues';
import { SearchForFacetValuesQueryParams } from '../types/SearchForFacetValuesQueryParams';
import { SearchForFacetValuesResponse } from '../types/SearchForFacetValuesResponse';
import { SearchOptions } from '../types/SearchOptions';

export const multipleSearchForFacetValues = <TSearchClient extends SearchClient>(
  base: TSearchClient
): TSearchClient & HasMultipleSearchForFacetValues => {
  return {
    ...base,
    multipleSearchForFacetValues(
      queries: ReadonlyArray<{
        readonly indexName: string;
        readonly params: SearchForFacetValuesQueryParams & SearchOptions;
      }>,
      requestOptions?: RequestOptions
    ): Readonly<Promise<readonly SearchForFacetValuesResponse[]>> {
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

          return this.initIndex<HasSearchForFacetValues>(query.indexName, {
            methods: [searchForFacetValues],
          }).searchForFacetValues(facetName, facetQuery, {
            ...requestOptions,
            ...params,
          });
        })
      );
    },

    searchForFacetValues(
      queries: ReadonlyArray<{
        readonly indexName: string;
        readonly params: SearchForFacetValuesQueryParams;
      }>,
      requestOptions?: RequestOptions
    ): Readonly<Promise<readonly SearchForFacetValuesResponse[]>> {
      return this.multipleSearchForFacetValues(queries, requestOptions);
    },
  };
};

export type HasMultipleSearchForFacetValues = {
  readonly searchForFacetValues: (
    queries: ReadonlyArray<{
      readonly indexName: string;
      readonly params: SearchForFacetValuesQueryParams;
    }>,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<readonly SearchForFacetValuesResponse[]>>;

  readonly multipleSearchForFacetValues: (
    queries: ReadonlyArray<{
      readonly indexName: string;
      readonly params: SearchForFacetValuesQueryParams;
    }>,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<readonly SearchForFacetValuesResponse[]>>;
};
