import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, RequestOptions } from '@algolia/transporter';

import { ListUserIDsOptions, ListUserIDsResponse, SearchClient } from '../..';

export const listUserIDs = (base: SearchClient) => {
  return (
    requestOptions?: ListUserIDsOptions & RequestOptions
  ): Readonly<Promise<ListUserIDsResponse>> => {
    const { page, hitsPerPage, ...options } = requestOptions || {};
    const mappedRequestOptions = mapRequestOptions(options);

    if (page) {
      mappedRequestOptions.queryParameters.page = page; // eslint-disable-line functional/immutable-data
    }

    if (hitsPerPage) {
      mappedRequestOptions.queryParameters.hitsPerPage = hitsPerPage; // eslint-disable-line functional/immutable-data
    }

    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/clusters/mapping',
      },
      mappedRequestOptions
    );
  };
};
