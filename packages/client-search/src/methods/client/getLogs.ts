import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

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
