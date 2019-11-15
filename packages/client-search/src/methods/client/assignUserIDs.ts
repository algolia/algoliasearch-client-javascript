import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { AssignUserIDsResponse } from '../..';

export const assignUserIDs = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasAssignUserIDs => {
  return {
    ...base,
    assignUserIDs(
      userIDs: readonly string[],
      clusterName: string,
      requestOptions?: RequestOptions
    ): Readonly<Promise<AssignUserIDsResponse>> {
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
    },
  };
};

export type HasAssignUserIDs = {
  readonly assignUserIDs: (
    userIDs: readonly string[],
    clusterName: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<AssignUserIDsResponse>>;
};
