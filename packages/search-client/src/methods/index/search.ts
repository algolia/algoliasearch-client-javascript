import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { SearchOptions } from '../types/SearchOptions';
import { SearchResponse } from '../types/SearchResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const search = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasSearch {
    public search<TObject>(
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
    }
  };
};

export type HasSearch = {
  readonly search: <TObject>(
    query: string,
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<SearchResponse<TObject>>>;
};
