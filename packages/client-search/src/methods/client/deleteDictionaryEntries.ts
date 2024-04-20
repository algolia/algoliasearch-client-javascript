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

export const deleteDictionaryEntries = (base: SearchClient) => {
  return (
    dictionary: DictionaryName,
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & DictionaryEntriesOptions
  ): Readonly<WaitablePromise<DictionaryEntriesResponse>> => {
    const requests = objectIDs.map(objectID => ({
      action: 'deleteEntry',
      body: { objectID },
    }));

    return createWaitablePromise<DictionaryEntriesResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: encode('/1/dictionaries/%s/batch', dictionary),
          data: { clearExistingDictionaryEntries: false, requests },
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitAppTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
