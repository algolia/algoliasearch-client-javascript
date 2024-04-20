import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { ListApiKeysResponse, SearchClient } from '../..';

export const listApiKeys = (base: SearchClient) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<ListApiKeysResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/keys',
      },
      requestOptions
    );
  };
};
