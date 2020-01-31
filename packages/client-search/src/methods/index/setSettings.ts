import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { createMappedRequestOptions, RequestOptions } from '@algolia/transporter';

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
