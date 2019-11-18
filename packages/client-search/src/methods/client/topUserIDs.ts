import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient, TopUserIDsResponse } from '../..';

export const topUserIDs = <TClient extends SearchClient>(
  base: TClient
): TClient & HasTopUserIDs => {
  return {
    ...base,
    topUserIDs(requestOptions?: RequestOptions): Readonly<Promise<TopUserIDsResponse>> {
      return this.transporter.read(
        {
          method: MethodEnum.Get,
          path: '1/clusters/mapping/top',
        },
        requestOptions
      );
    },
  };
};

export type HasTopUserIDs = {
  readonly topUserIDs: (requestOptions?: RequestOptions) => Readonly<Promise<TopUserIDsResponse>>;
};
