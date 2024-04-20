import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { GetApiKeyResponse, SearchClient } from '../..';

export const getApiKey = (base: SearchClient) => {
  return (
    apiKey: string,
    requestOptions?: RequestOptions
  ): Readonly<Promise<GetApiKeyResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('1/keys/%s', apiKey),
      },
      requestOptions
    );
  };
};
