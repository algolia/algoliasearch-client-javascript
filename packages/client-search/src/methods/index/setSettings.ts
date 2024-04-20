import { createWaitablePromise, encode, WaitablePromise } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { createMappedRequestOptions, RequestOptions } from '@sefai/transporter';

import { SearchIndex, SetSettingsOptions, SetSettingsResponse, Settings, waitTask } from '../..';

export const setSettings = (base: SearchIndex) => {
  return (
    settings: Settings,
    requestOptions?: RequestOptions & SetSettingsOptions
  ): Readonly<WaitablePromise<SetSettingsResponse>> => {
    const { forwardToReplicas, ...options } = requestOptions || {};
    const mappedRequestOptions = createMappedRequestOptions(options);

    if (forwardToReplicas) {
      mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
    }

    return createWaitablePromise<SetSettingsResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Put,
          path: encode('1/indexes/%s/settings', base.indexName),
          data: settings,
        },
        mappedRequestOptions
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
