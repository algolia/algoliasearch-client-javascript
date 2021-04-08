import { createWaitablePromise, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { DictionarySettings, SearchClient, SetDictionarySettingsResponse } from '../..';
import { waitAppTask } from '.';

export const setDictionarySettings = (base: SearchClient) => {
  return (
    settings: DictionarySettings,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<SetDictionarySettingsResponse>> => {
    return createWaitablePromise<SetDictionarySettingsResponse>(
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
