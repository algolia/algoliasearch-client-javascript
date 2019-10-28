import { Method } from '@algolia/requester-types';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { ListClustersResponse } from '../../types/ListClustersResponse';

export const listClusters = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasListClusters => {
  return {
    ...base,
    listClusters(requestOptions?: RequestOptions): Readonly<Promise<ListClustersResponse>> {
      return this.transporter.read(
        {
          method: Method.Get,
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
