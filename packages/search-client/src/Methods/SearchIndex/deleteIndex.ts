import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';
import { WaitablePromise } from '../../WaitablePromise';
import { HasWaitTask, waitTask } from './waitTask';

export const deleteIndex = <TSearchIndex extends ConstructorOf<SearchIndex & HasWaitTask>>(
  base: TSearchIndex
) =>
  waitTask(
    class extends base implements HasDelete {
      public delete(requestOptions?: RequestOptions): WaitablePromise<DeleteResponse> {
        return WaitablePromise.from<DeleteResponse>(
          this.transporter.write(
            {
              method: Method.Delete,
              path: `1/indexes/${this.indexName}`,
            },
            requestOptions
          )
        ).onWait(response => this.waitTask(response.taskID));
      }
    }
  );

export interface HasDelete extends SearchIndex {
  delete(requestOptions?: RequestOptions): WaitablePromise<DeleteResponse>;
}

export type DeleteResponse = {
  taskID: number;
};
