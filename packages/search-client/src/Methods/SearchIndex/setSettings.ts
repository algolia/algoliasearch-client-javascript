import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';
import { WaitablePromise } from '../../WaitablePromise';
import { waitTask } from './waitTask';
import { IndexSettings } from '../Types/IndexSettings';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const setSettings = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  const Mixin = waitTask(base);

  return class extends Mixin implements HasSetSettings {
    public setSettings(
      settings: IndexSettings,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<SetSettingsResponse>> {
      return WaitablePromise.from<SetSettingsResponse>(
        this.transporter.write(
          {
            method: Method.Put,
            path: `1/indexes/${this.indexName}/settings`,
            data: settings,
          },
          requestOptions
        )
      ).onWait(response => this.waitTask(response.taskID));
    }
  };
};

export interface HasSetSettings extends SearchIndex {
  readonly setSettings: (
    settings: IndexSettings,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<SetSettingsResponse>>;
}

export type SetSettingsResponse = {
  readonly taskID: number;
  readonly UpdatedAt: number;
};
