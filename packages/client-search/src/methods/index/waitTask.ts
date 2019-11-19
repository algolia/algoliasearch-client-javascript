import { addMethod, createRetryablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../..';
import { getTask } from '.';

export const waitTask = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasWaitTask => {
  return {
    ...base,
    waitTask(taskID: number, requestOptions?: RequestOptions): Readonly<Promise<void>> {
      return createRetryablePromise(retry => {
        return addMethod(base, getTask)
          .getTask(taskID, requestOptions)
          .then(response => (response.status !== 'published' ? retry() : undefined));
      });
    },
  };
};

export type HasWaitTask = {
  readonly waitTask: (taskID: number, requestOptions?: RequestOptions) => Readonly<Promise<void>>;
};
