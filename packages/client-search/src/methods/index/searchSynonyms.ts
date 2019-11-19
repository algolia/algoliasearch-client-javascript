import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex, SearchSynonymsOptions, SearchSynonymsResponse } from '../..';

export const searchSynonyms = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSearchSynonyms => {
  return {
    ...base,
    searchSynonyms(
      query: string,
      requestOptions?: SearchSynonymsOptions & RequestOptions
    ): Readonly<Promise<SearchSynonymsResponse>> {
      return base.transporter.read(
        {
          method: MethodEnum.Post,
          path: encode('1/indexes/%s/synonyms/search', base.indexName),
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
