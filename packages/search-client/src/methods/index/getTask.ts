import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../SearchIndex';
import { TaskStatusResponse } from '../types/TaskStatusResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getTask = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasGetTask {
    public getTask(
      taskID: number,
      requestOptions?: RequestOptions
    ): Readonly<Promise<TaskStatusResponse>> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: encode('1/indexes/%s/task/%s', this.indexName, taskID.toString()),
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
  ) => Readonly<Promise<TaskStatusResponse>>;
};
