import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { ListIndicesResponse, SearchClient } from '../..';

export const listIndices = (base: SearchClient) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<ListIndicesResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/indexes',
      },
      requestOptions
    );
  };
};
