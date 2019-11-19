import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { ListApiKeysResponse, SearchClient } from '../..';

export const listApiKeys = <TClient extends SearchClient>(
  base: TClient
): TClient & HasListApiKeys => {
  return {
    ...base,
    listApiKeys(requestOptions?: RequestOptions): Readonly<Promise<ListApiKeysResponse>> {
      return base.transporter.read(
        {
          method: MethodEnum.Get,
          path: '1/keys',
        },
        requestOptions
      );
    },
  };
};

export type HasListApiKeys = {
  readonly listApiKeys: (requestOptions?: RequestOptions) => Readonly<Promise<ListApiKeysResponse>>;
};
