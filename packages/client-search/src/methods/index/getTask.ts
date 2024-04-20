import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { SearchIndex, TaskStatusResponse } from '../..';

export const getTask = (base: SearchIndex) => {
  return (
    taskID: number,
    requestOptions?: RequestOptions
  ): Readonly<Promise<TaskStatusResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('1/indexes/%s/task/%s', base.indexName, taskID.toString()),
      },
      requestOptions
    );
  };
};
