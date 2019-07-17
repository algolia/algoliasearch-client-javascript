import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';

export const getTask = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasGetTask {
    public getTask(taskID: number, requestOptions?: RequestOptions): Promise<TaskStatusResponse> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: `1/indexes/${this.indexName}/task/${taskID}`,
        },
        requestOptions
      );
    }
  };
};

export interface HasGetTask extends SearchIndex {
  getTask(taskID: number, requestOptions?: RequestOptions): Promise<TaskStatusResponse>;
}

export type TaskStatusResponse = {
  status: string;
  pendingTask: boolean;
};
