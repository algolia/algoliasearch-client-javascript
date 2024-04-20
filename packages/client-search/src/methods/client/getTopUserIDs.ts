import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { GetTopUserIDsResponse, SearchClient } from '../..';

export const getTopUserIDs = (base: SearchClient) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<GetTopUserIDsResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/clusters/mapping/top',
      },
      requestOptions
    );
  };
};
