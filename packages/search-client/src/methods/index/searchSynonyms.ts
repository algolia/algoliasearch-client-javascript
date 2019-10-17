import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { SearchSynonymsOptions } from '../types/SearchSynonymsOptions';
import { SearchSynonymsResponse } from '../types/SearchSynonymsResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const searchSynonyms = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  return class extends base implements HasSearchSynonyms {
    public searchSynonyms(
      query: string,
      requestOptions?: SearchSynonymsOptions & RequestOptions
    ): Readonly<Promise<SearchSynonymsResponse>> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: encode('1/indexes/%s/synonyms/search', this.indexName),
          data: {
            query,
          },
        },
        requestOptions
      );
    }
  };
};

export type HasSearchSynonyms = {
  readonly searchSynonyms: (
    query: string,
    requestOptions?: SearchSynonymsOptions & RequestOptions
  ) => Readonly<Promise<SearchSynonymsResponse>>;
};
