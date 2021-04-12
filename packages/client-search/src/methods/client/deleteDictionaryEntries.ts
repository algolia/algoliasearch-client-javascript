import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

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
