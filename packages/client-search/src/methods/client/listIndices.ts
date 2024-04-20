import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

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
