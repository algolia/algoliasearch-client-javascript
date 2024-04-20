import { createRetryablePromise } from '@sefai/client-common';
import { RequestOptions } from '@sefai/transporter';

import { SearchClient } from '../..';
import { getAppTask } from '.';

export const waitAppTask = (base: SearchClient) => {
  return (taskID: number, requestOptions?: RequestOptions): Readonly<Promise<void>> => {
    return createRetryablePromise(retry => {
      return getAppTask(base)(taskID, requestOptions).then(response => {
        return response.status !== 'published' ? retry() : undefined;
      });
    });
  };
};
