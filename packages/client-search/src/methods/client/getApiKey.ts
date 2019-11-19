import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { GetApiKeyResponse, SearchClient } from '../..';

export const getApiKey = <TClient extends SearchClient>(base: TClient): TClient & HasGetApiKey => {
  return {
    ...base,
    getApiKey(
      apiKey: string,
      requestOptions?: RequestOptions
    ): Readonly<Promise<GetApiKeyResponse>> {
      return base.transporter.read(
        {
          method: MethodEnum.Get,
          path: encode('1/keys/%s', apiKey),
        },
        requestOptions
      );
    },
  };
};

export type HasGetApiKey = {
  readonly getApiKey: (
    apiKey: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetApiKeyResponse>>;
};
