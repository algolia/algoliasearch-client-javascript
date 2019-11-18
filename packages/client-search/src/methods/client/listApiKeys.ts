import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { ListApiKeysResponse } from '../..';

export const listApiKeys = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasListApiKeys => {
  return {
    ...base,
    listApiKeys(requestOptions?: RequestOptions): Readonly<Promise<ListApiKeysResponse>> {
      return this.transporter.read(
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
