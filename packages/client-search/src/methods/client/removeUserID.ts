import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, RequestOptions, TransporterAware } from '@algolia/transporter';

import { RemoveUserIDResponse } from '../..';

export const removeUserID = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasRemoveUserID => {
  return {
    ...base,
    removeUserID(
      userID: string,
      requestOptions?: RequestOptions
    ): Readonly<Promise<RemoveUserIDResponse>> {
      const options = mapRequestOptions(requestOptions);

      // eslint-disable-next-line functional/immutable-data
      options.headers['X-Algolia-User-ID'] = userID;

      return base.transporter.write(
        {
          method: MethodEnum.Delete,
          path: '1/clusters/mapping',
        },
        options
      );
    },
  };
};

export type HasRemoveUserID = {
  readonly removeUserID: (
    userID: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<RemoveUserIDResponse>>;
};
