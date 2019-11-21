import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

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
