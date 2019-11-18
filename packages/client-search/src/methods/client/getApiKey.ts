import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { GetApiKeyResponse } from '../..';

export const getApiKey = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasGetApiKey => {
  return {
    ...base,
    getApiKey(
      apiKey: string,
      requestOptions?: RequestOptions
    ): Readonly<Promise<GetApiKeyResponse>> {
      return this.transporter.read(
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
