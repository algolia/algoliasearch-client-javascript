import { createRetryablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex } from '../..';
import { getTask } from '.';

export const waitTask = (base: SearchIndex) => {
  return (taskID: number, requestOptions?: RequestOptions): Readonly<Promise<void>> => {
    return createRetryablePromise(retry => {
      return getTask(base)(taskID, requestOptions).then(response => {
        return response.status !== 'published' ? retry() : undefined;
      });
    });
  };
};
