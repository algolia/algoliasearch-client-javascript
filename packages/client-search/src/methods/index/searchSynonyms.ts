import { encode } from '@algolia/client-common/helpers';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { SearchIndex } from '../../types/SearchIndex';
import { SearchSynonymsOptions } from '../../types/SearchSynonymsOptions';
import { SearchSynonymsResponse } from '../../types/SearchSynonymsResponse';

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
          method: MethodEnum.Post,
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
