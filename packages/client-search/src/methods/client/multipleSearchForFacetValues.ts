import { RequestOptions } from '@algolia/transporter';

import { HasSearchForFacetValues, searchForFacetValues } from '..';
import {
  SearchClient,
  SearchForFacetValuesQueryParams,
  SearchForFacetValuesResponse,
  SearchOptions,
} from '../..';
import { initIndex } from '.';

export const multipleSearchForFacetValues = <TClient extends SearchClient>(
  base: TClient
): TClient & HasMultipleSearchForFacetValues => {
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

          return initIndex(base)
            .initIndex<HasSearchForFacetValues>(query.indexName, {
              methods: [searchForFacetValues],
            })
            .searchForFacetValues(facetName, facetQuery, {
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
