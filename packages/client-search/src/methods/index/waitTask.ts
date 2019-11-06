import { RequestOptions } from '@algolia/transporter';

import { SearchIndex, TaskStatusResponse } from '../..';
import { getTask, HasGetTask } from '.';

export const waitTask = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetTask & HasWaitTask => {
  return {
    ...getTask(base),
    waitTask(
      taskID: number,
      requestOptions?: RequestOptions
    ): Readonly<Promise<TaskStatusResponse>> {
      // eslint-disable-next-line functional/no-let
      let retriesCount = 0;

      return this.getTask(taskID, requestOptions).then(response => {
        if (response.status !== 'published') {
          retriesCount++;

          return new Promise<TaskStatusResponse>(resolve => {
            setTimeout(() => {
              resolve(this.waitTask(taskID, requestOptions));
            }, Math.min(100 * retriesCount, 1000));
          });
        }

        return response;
      });
    },
  };
};

export type HasWaitTask = {
  readonly waitTask: (
    taskID: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TaskStatusResponse>>;
};
