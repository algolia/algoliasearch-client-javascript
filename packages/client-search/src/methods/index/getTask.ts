import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common/src/types/MethodType';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';

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
          method: MethodEnum.Get,
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
