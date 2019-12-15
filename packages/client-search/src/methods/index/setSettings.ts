import { createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, popRequestOption, RequestOptions } from '@algolia/transporter';

import { SearchIndex, SetSettingsOptions, SetSettingsResponse, Settings } from '../..';
import { waitTask } from '.';

export const setSettings = (base: SearchIndex) => {
  return (
    settings: Settings,
    requestOptions?: RequestOptions & SetSettingsOptions
  ): Readonly<WaitablePromise<SetSettingsResponse>> => {
    const options = mapRequestOptions(requestOptions);
    const forward = popRequestOption(requestOptions, 'forwardToReplicas');
    if (forward === true) {
      // eslint-disable-next-line functional/immutable-data
      options.queryParameters.forwardToReplicas = '1';
    }

    return createWaitablePromise<SetSettingsResponse>(
      base.transporter.write(
        {
          method: MethodEnum.Put,
          path: encode('1/indexes/%s/settings', base.indexName),
          data: settings,
        },
        options
      ),
      (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions)
    );
  };
};
