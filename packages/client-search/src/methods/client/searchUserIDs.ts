import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient, SearchUserIDsOptions, SearchUserIDsResponse } from '../..';

export const searchUserIDs = (base: SearchClient) => {
  return (
    query: string,
    requestOptions?: SearchUserIDsOptions & RequestOptions
  ): Readonly<Promise<SearchUserIDsResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: '1/clusters/mapping/search',
        data: {
          query,
        },
      },
      requestOptions
    );
  };
};
