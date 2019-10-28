import { Method } from '@algolia/requester-types';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { ListClustersResponse } from '../types/ListClustersResponse';

export const listClusters = <TSearchClient extends SearchClient>(
  base: TSearchClient
): TSearchClient & HasListClusters => {
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
