import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { UserIDResponse } from '../..';

export const getUserID = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasGetUserID => {
  return {
    ...base,
    getUserID(userID: string, requestOptions?: RequestOptions): Readonly<Promise<UserIDResponse>> {
      return this.transporter.read(
        {
          method: MethodEnum.Get,
          path: encode('1/clusters/mapping/%s', userID),
        },
        requestOptions
      );
    },
  };
};

export type HasGetUserID = {
  readonly getUserID: (
    userID: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<UserIDResponse>>;
};
