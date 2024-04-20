import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { SearchClient, UserIDResponse } from '../..';

export const getUserID = (base: SearchClient) => {
  return (userID: string, requestOptions?: RequestOptions): Readonly<Promise<UserIDResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('1/clusters/mapping/%s', userID),
      },
      requestOptions
    );
  };
};
