import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { SearchOptions } from '../types/SearchOptions';
import { SearchResponse } from '../types/SearchResponse';

export const search = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSearch => {
  return {
    ...base,
    search<TObject>(
      query: string,
      requestOptions?: RequestOptions & SearchOptions
    ): Readonly<Promise<SearchResponse<TObject>>> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: encode('1/indexes/%s/query', this.indexName),
          data: {
            query,
          },
          cacheable: true,
        },
        requestOptions
      );
    },
  };
};

export type HasSearch = {
  readonly search: <TObject>(
    query: string,
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<SearchResponse<TObject>>>;
};
