import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { SearchSynonymsOptions } from '../types/SearchSynonymsOptions';
import { SearchSynonymsResponse } from '../types/SearchSynonymsResponse';

export const searchSynonyms = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSearchSynonyms => {
  return {
    ...base,
    searchSynonyms(
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
    },
  };
};

export type HasSearchSynonyms = {
  readonly searchSynonyms: (
    query: string,
    requestOptions?: SearchSynonymsOptions & RequestOptions
  ) => Readonly<Promise<SearchSynonymsResponse>>;
};
