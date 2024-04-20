import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { SearchIndex, SearchOptions, SearchResponse } from '../..';

export const search = (base: SearchIndex) => {
  return <TObject>(
    query: string,
    requestOptions?: RequestOptions & SearchOptions
  ): Readonly<Promise<SearchResponse<TObject>>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: encode('1/indexes/%s/query', base.indexName),
        data: {
          query,
        },
        cacheable: true,
      },
      requestOptions
    );
  };
};
