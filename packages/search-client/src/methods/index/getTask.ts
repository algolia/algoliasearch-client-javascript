import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';
import { TaskStatusResponse } from '../types/TaskStatusResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

export type HasGetTask = {
  readonly getTask: (
    taskID: number,
    requestOptions?: RequestOptions
  ) => Promise<TaskStatusResponse>;
};
