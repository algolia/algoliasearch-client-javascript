import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { createMappedRequestOptions, RequestOptions } from '@algolia/transporter';

import { SearchIndex, Settings } from '../..';

export const getSettings = (base: SearchIndex) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<Settings>> => {
    const mappedRequestOptions = createMappedRequestOptions(requestOptions);

    // eslint-disable-next-line functional/immutable-data
    mappedRequestOptions.queryParameters.getVersion = '2';

    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('1/indexes/%s/settings', base.indexName),
      },
      mappedRequestOptions
    );
  };
};
