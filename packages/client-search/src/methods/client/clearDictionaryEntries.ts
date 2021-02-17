import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SaveDictionaryEntriesOptions, SaveDictionaryEntriesResponse, SearchClient } from '../..';
import { waitDictionaryTask } from '.';

// TODO: fill in SaveDictionaryEntriesOptions type
export const clearDictionaryEntries = (base: SearchClient) => {
  return (
    dictionary: string,
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
      (response, waitRequestOptions) =>
        waitDictionaryTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
