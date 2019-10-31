import { encode } from '@algolia/client-common/helpers';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { SearchIndex } from '../../types/SearchIndex';
import { SearchOptions } from '../../types/SearchOptions';
import { SearchResponse } from '../../types/SearchResponse';

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
          method: MethodEnum.Post,
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
