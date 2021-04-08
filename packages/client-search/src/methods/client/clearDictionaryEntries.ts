import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import {
  DictionaryName,
  SaveDictionaryEntriesOptions,
  SaveDictionaryEntriesResponse,
  SearchClient,
} from '../..';
import { waitAppTask } from '.';

export const clearDictionaryEntries = (base: SearchClient) => {
  return (
    dictionary: DictionaryName,
    requestOptions?: RequestOptions & SaveDictionaryEntriesOptions
  ): Readonly<WaitablePromise<SaveDictionaryEntriesResponse>> => {
    return createWaitablePromise<SaveDictionaryEntriesResponse>(
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
