import { createRetryablePromise } from '@algolia/client-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../..';
import { getDictionaryTask } from '.';

export const waitDictionaryTask = (base: SearchClient) => {
  return (taskID: number, requestOptions?: RequestOptions): Readonly<Promise<void>> => {
    return createRetryablePromise(retry => {
      return getDictionaryTask(base)(taskID, requestOptions).then(response => {
        return response.status !== 'published' ? retry() : undefined;
      });
    });
  };
};
