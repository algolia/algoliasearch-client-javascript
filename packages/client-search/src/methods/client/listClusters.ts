import { MethodEnum } from '@algolia/requester-common/src/types/MethodType';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/src/types/TransporterAware';

import { ListClustersResponse } from '../../types/ListClustersResponse';

export const listClusters = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasListClusters => {
  return {
    ...base,
    listClusters(requestOptions?: RequestOptions): Readonly<Promise<ListClustersResponse>> {
      return this.transporter.read(
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
