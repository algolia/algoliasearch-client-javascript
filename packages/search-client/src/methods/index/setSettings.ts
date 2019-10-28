import { Method } from '@algolia/requester-types';
import { encode, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { IndexSettings } from '../types/IndexSettings';
import { SetSettingsResponse } from '../types/SetSettingsResponse';
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
      return WaitablePromise.from<SetSettingsResponse>(
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
