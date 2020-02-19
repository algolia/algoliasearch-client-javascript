import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { HasPendingMappingsOptions, HasPendingMappingsResponse, SearchClient } from '../..';

export const hasPendingMappings = (base: SearchClient) => {
  return (
    requestOptions?: HasPendingMappingsOptions & RequestOptions
  ): Readonly<Promise<HasPendingMappingsResponse>> => {
    const { retrieveMappings, ...options } = requestOptions || {};

    if (retrieveMappings === true) {
      // eslint-disable-next-line functional/immutable-data
      options.getClusters = true;
    }

    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/clusters/mapping/pending',
      },
      options
    );
  };
};
