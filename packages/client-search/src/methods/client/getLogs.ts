import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, RequestOptions } from '@algolia/transporter';

import { GetLogsResponse, SearchClient } from '../..';

export const getLogs = (base: SearchClient) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<GetLogsResponse>> => {
    const { length, offset, type, ...options } = requestOptions || {};
    const mappedRequestOptions = mapRequestOptions(options);

    if (length) {
      mappedRequestOptions.queryParameters.length = length; // eslint-disable-line functional/immutable-data
    }

    if (offset) {
      mappedRequestOptions.queryParameters.offset = offset; // eslint-disable-line functional/immutable-data
    }

    if (type) {
      mappedRequestOptions.queryParameters.type = type; // eslint-disable-line functional/immutable-data
    }

    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/logs',
      },
      mappedRequestOptions
    );
  };
};
