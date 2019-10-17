import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { TaskStatusResponse } from '../types/TaskStatusResponse';
import { getTask, HasGetTask } from './getTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const waitTask = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const mixin: ConstructorOf<SearchIndex & HasGetTask> = getTask(base);

  return class extends mixin implements HasWaitTask {
    public waitTask(
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
    }
  };
};

export type HasWaitTask = {
  readonly waitTask: (
    taskID: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TaskStatusResponse>>;
};
