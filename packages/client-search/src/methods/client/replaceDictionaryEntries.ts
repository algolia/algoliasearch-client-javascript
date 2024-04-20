import { createWaitablePromise, encode, WaitablePromise } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import {
  DictionaryEntriesOptions,
  DictionaryEntriesResponse,
  DictionaryEntry,
  DictionaryName,
  SearchClient,
} from '../..';
import { waitAppTask } from '.';

export const replaceDictionaryEntries = (base: SearchClient) => {
  return (
    dictionary: DictionaryName,
    entries: readonly DictionaryEntry[],
    requestOptions?: RequestOptions & DictionaryEntriesOptions
  ): Readonly<WaitablePromise<DictionaryEntriesResponse>> => {
    const requests = entries.map(entry => ({
      action: 'addEntry',
      body: entry,
    }));

    return createWaitablePromise<DictionaryEntriesResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: encode('/1/dictionaries/%s/batch', dictionary),
          data: { clearExistingDictionaryEntries: true, requests },
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitAppTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
