import { Method } from '@algolia/requester-types/src/types/Method';
import { createWaitablePromise, encode } from '@algolia/support';
import { WaitablePromise } from '@algolia/support/src/types/WaitablePromise';
import { RequestOptions } from '@algolia/transporter';

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
            method: Method.Put,
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
