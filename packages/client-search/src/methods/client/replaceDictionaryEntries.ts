import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import {
  DictionaryEntry,
  SaveDictionaryEntriesOptions,
  SaveDictionaryEntriesResponse,
  SearchClient,
} from '../..';
import { waitAppTask } from '.';

// TODO: fill in DictionaryEntry & SaveDictionaryEntriesOptions types
// TODO entries have to be a composite objects with actionType=addEntry and body=DictEntry like MultipleBatch
export const replaceDictionaryEntries = (base: SearchClient) => {
  return (
    dictionary: string,
    entries: readonly DictionaryEntry[],
    requestOptions?: RequestOptions & SaveDictionaryEntriesOptions
  ): Readonly<WaitablePromise<SaveDictionaryEntriesResponse>> => {
    return createWaitablePromise<SaveDictionaryEntriesResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: encode('/1/dictionaries/%s/batch', dictionary),
          data: { clearExistingDictionaryEntries: true, requests: entries },
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitAppTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
