import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

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
