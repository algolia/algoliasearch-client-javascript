import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { ListClustersResponse, SearchClient } from '../..';

export const listClusters = (base: SearchClient) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<ListClustersResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/clusters',
      },
      requestOptions
    );
  };
};
