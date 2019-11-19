import { addMethod, createWaitablePromise, encode, WaitablePromise } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { IndexSettings, SearchIndex, SetSettingsResponse } from '../..';
import { waitTask } from '.';

export const setSettings = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSetSettings => {
  return {
    ...base,
    setSettings(
      settings: IndexSettings,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<SetSettingsResponse>> {
      return createWaitablePromise<SetSettingsResponse>(
        base.transporter.write(
          {
            method: MethodEnum.Put,
            path: encode('1/indexes/%s/settings', base.indexName),
            data: settings,
          },
          requestOptions
        )
      ).onWait((response, waitRequestOptions) =>
        addMethod(base, waitTask).waitTask(response.taskID, waitRequestOptions)
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
