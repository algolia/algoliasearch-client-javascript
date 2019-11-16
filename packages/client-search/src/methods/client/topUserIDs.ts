import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { TopUserIDsResponse } from '../..';

export const topUserIDs = <TClient extends TransporterAware>(
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
