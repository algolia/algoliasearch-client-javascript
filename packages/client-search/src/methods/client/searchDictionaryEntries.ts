import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient, SearchDictionaryEntriesResponse } from '../..';

// TODO: fill in SearchDictionaryEntriesResponse type
export const searchDictionaryEntries = (base: SearchClient) => {
  return <TObject>(
    dictionary: string,
    query: string,
    requestOptions?: RequestOptions
  ): Readonly<Promise<SearchDictionaryEntriesResponse<TObject>>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: encode('1/indexes/%s/query', dictionary),
        data: {
          query,
        },
        cacheable: true,
      },
      requestOptions
    );
  };
};
