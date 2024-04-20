import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { ListUserIDsOptions, ListUserIDsResponse, SearchClient } from '../..';

export const listUserIDs = (base: SearchClient) => {
  return (
    requestOptions?: ListUserIDsOptions & RequestOptions
  ): Readonly<Promise<ListUserIDsResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/clusters/mapping',
      },
      requestOptions
    );
  };
};
