import { Method } from '@algolia/requester-types/src/types/Method';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../../types/SearchIndex';
import { TaskStatusResponse } from '../../types/TaskStatusResponse';

export const getTask = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetTask => {
  return {
    ...base,
    getTask(
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
    },
  };
};

export type HasGetTask = {
  readonly getTask: (
    taskID: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TaskStatusResponse>>;
};
