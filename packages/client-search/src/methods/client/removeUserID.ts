import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, RequestOptions } from '@algolia/transporter';

import { RemoveUserIDResponse, SearchClient } from '../..';

export const removeUserID = (base: SearchClient) => {
  return (
    userID: string,
    requestOptions?: RequestOptions
  ): Readonly<Promise<RemoveUserIDResponse>> => {
    const mappedRequestOptions = mapRequestOptions(requestOptions);

    // eslint-disable-next-line functional/immutable-data
    mappedRequestOptions.headers['X-Algolia-User-ID'] = userID;

    return base.transporter.write(
      {
        method: MethodEnum.Delete,
        path: '1/clusters/mapping',
      },
      mappedRequestOptions
    );
  };
};
