import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

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
