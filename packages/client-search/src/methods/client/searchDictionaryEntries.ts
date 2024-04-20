import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

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
