import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { AssignUserIDsResponse, SearchClient } from '../..';

export const assignUserIDs = (base: SearchClient) => {
  return (
    userIDs: readonly string[],
    clusterName: string,
    requestOptions?: RequestOptions
  ): Readonly<Promise<AssignUserIDsResponse>> => {
    return base.transporter.write(
      {
        method: MethodEnum.Post,
        path: '1/clusters/mapping/batch',
        data: {
          users: userIDs,
          cluster: clusterName,
        },
      },
      requestOptions
    );
  };
};
