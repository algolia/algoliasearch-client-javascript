import { createWaitablePromise } from '@algolia/client-common/createWaitablePromise';
import { encode } from '@algolia/client-common/helpers';
import { WaitablePromise } from '@algolia/client-common/types/WaitablePromise';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';

import { IndexSettings } from '../../types/IndexSettings';
import { SearchIndex } from '../../types/SearchIndex';
import { SetSettingsResponse } from '../../types/SetSettingsResponse';
import { HasWaitTask, waitTask } from './waitTask';

export const setSettings = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask & HasSetSettings => {
  return {
    ...waitTask(base),
    setSettings(
      settings: IndexSettings,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<SetSettingsResponse>> {
      return createWaitablePromise<SetSettingsResponse>(
        this.transporter.write(
          {
            method: MethodEnum.Put,
            path: encode('1/indexes/%s/settings', this.indexName),
            data: settings,
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        this.waitTask(response.taskID, waitRequestOptions)
      );
    },
  };
};

export type HasSetSettings = SearchIndex & {
  readonly setSettings: (
    settings: IndexSettings,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<SetSettingsResponse>>;
};
