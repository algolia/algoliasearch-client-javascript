import { createWaitablePromise, encode, WaitablePromise } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import {
  DictionaryEntriesOptions,
  DictionaryEntriesResponse,
  DictionaryName,
  SearchClient,
} from '../..';
import { waitAppTask } from '.';

export const clearDictionaryEntries = (base: SearchClient) => {
  return (
    dictionary: DictionaryName,
    requestOptions?: RequestOptions & DictionaryEntriesOptions
  ): Readonly<WaitablePromise<DictionaryEntriesResponse>> => {
    return createWaitablePromise<DictionaryEntriesResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: encode('/1/dictionaries/%s/batch', dictionary),
          data: {
            clearExistingDictionaryEntries: true,
            requests: { action: 'addEntry', body: [] },
          },
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitAppTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
