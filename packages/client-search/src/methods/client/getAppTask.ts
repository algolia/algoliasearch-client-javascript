import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient, TaskStatusResponse } from '../..';

export const getAppTask = (base: SearchClient) => {
  return (
    taskID: number,
    requestOptions?: RequestOptions
  ): Readonly<Promise<TaskStatusResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('1/task/%s', taskID.toString()),
      },
      requestOptions
    );
  };
};
