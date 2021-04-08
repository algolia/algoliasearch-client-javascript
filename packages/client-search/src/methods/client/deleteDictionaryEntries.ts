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

export const deleteDictionaryEntries = (base: SearchClient) => {
  return (
    dictionary: DictionaryName,
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & SaveDictionaryEntriesOptions
  ): Readonly<WaitablePromise<SaveDictionaryEntriesResponse>> => {
    const requests = objectIDs.map(objectID => ({
      actionType: 'deleteEntry',
      body: objectID,
    }));

    return createWaitablePromise<SaveDictionaryEntriesResponse>(
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
