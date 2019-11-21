import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient, TopUserIDsResponse } from '../..';

export const topUserIDs = (base: SearchClient) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<TopUserIDsResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/clusters/mapping/top',
      },
      requestOptions
    );
  };
};
