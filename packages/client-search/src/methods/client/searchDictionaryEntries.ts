import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { DictionaryName, SearchClient, SearchDictionaryEntriesResponse } from '../..';

export const searchDictionaryEntries = (base: SearchClient) => {
  return (
    dictionary: DictionaryName,
    query: string,
    requestOptions?: RequestOptions
  ): Readonly<Promise<SearchDictionaryEntriesResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: encode('/1/dictionaries/%s/search', dictionary),
        data: {
          query,
        },
        cacheable: true,
      },
      requestOptions
    );
  };
};
