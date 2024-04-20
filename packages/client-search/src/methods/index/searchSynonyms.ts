import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { SearchIndex, SearchSynonymsOptions, SearchSynonymsResponse } from '../..';

export const searchSynonyms = (base: SearchIndex) => {
  return (
    query: string,
    requestOptions?: SearchSynonymsOptions & RequestOptions
  ): Readonly<Promise<SearchSynonymsResponse>> => {
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
  };
};
