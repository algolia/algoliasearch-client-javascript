import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { ListClustersResponse, SearchClient } from '../..';

export const listClusters = <TClient extends SearchClient>(
  base: TClient
): TClient & HasListClusters => {
  return {
    ...base,
    listClusters(requestOptions?: RequestOptions): Readonly<Promise<ListClustersResponse>> {
      return base.transporter.read(
        {
          method: MethodEnum.Get,
          path: '1/clusters',
        },
        requestOptions
      );
    },
  };
};

export type HasListClusters = {
  readonly listClusters: (
    requestOptions?: RequestOptions
  ) => Readonly<Promise<ListClustersResponse>>;
};
