import { createWaitablePromise, WaitablePromise } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { DictionaryEntriesResponse, DictionarySettings, SearchClient } from '../..';
import { waitAppTask } from '.';

export const setDictionarySettings = (base: SearchClient) => {
  return (
    settings: DictionarySettings,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<DictionaryEntriesResponse>> => {
    return createWaitablePromise<DictionaryEntriesResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Put,
          path: '/1/dictionaries/*/settings',
          data: settings,
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitAppTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
