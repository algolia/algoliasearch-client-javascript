import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';
import { WaitablePromise } from '../../WaitablePromise';
import { HasWaitTask, waitTask } from './waitTask';
import { IndexSettings } from '../Types/IndexSettings';

export const setSettings = <TSearchIndex extends ConstructorOf<SearchIndex & HasWaitTask>>(
  base: TSearchIndex
) =>
  waitTask(
    class extends base implements HasSetSettings {
      public setSettings(
        settings: IndexSettings,
        requestOptions?: RequestOptions
      ): WaitablePromise<SetSettingsResponse> {
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
    }
  );

export interface HasSetSettings extends SearchIndex {
  setSettings(
    settings: IndexSettings,
    requestOptions?: RequestOptions
  ): WaitablePromise<SetSettingsResponse>;
}

export type SetSettingsResponse = {
  taskID: number;
  UpdatedAt: number;
};
