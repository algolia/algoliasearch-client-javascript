import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { GetLogsResponse, SearchClient } from '../..';

export const getLogs = (base: SearchClient) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<GetLogsResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/logs',
      },
      requestOptions
    );
  };
};
