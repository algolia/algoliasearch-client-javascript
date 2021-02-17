import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SaveDictionaryEntriesOptions, SaveDictionaryEntriesResponse, SearchClient } from '../..';
import { waitDictionaryTask } from '.';

// TODO: fill in SaveDictionaryEntriesOptions type
// TODO objectIDs have to be a composite objects with actionType=deleteEntry and body=objectID like MultipleBatch
export const deleteDictionaryEntries = (base: SearchClient) => {
  return (
    dictionary: string,
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & SaveDictionaryEntriesOptions
  ): Readonly<WaitablePromise<SaveDictionaryEntriesResponse>> => {
    return createWaitablePromise<SaveDictionaryEntriesResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Post,
          path: encode('/1/dictionaries/%s/batch', dictionary),
          data: { clearExistingDictionaryEntries: false, requests: objectIDs },
        },
        requestOptions
      ),
      (response, waitRequestOptions) =>
        waitDictionaryTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
