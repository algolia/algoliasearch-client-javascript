import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

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
