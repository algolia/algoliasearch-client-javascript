import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { IndexSettings, SearchIndex, SetSettingsResponse } from '../..';
import { waitTask } from '.';

export const setSettings = (base: SearchIndex) => {
  return (
    settings: IndexSettings,
    requestOptions?: RequestOptions
  ): Readonly<WaitablePromise<SetSettingsResponse>> => {
    return createWaitablePromise<SetSettingsResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Put,
          path: encode('1/indexes/%s/settings', base.indexName),
          data: settings,
        },
        requestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
