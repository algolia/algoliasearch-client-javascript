import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions, RequestOptions } from '@algolia/transporter';

import { IndexSettings, SearchIndex } from '../..';

export const getSettings = (base: SearchIndex) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<IndexSettings>> => {
    const options = mapRequestOptions(requestOptions);

    // eslint-disable-next-line functional/immutable-data
    options.queryParameters.getVersion = '2';

    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('1/indexes/%s/settings', base.indexName),
      },
      options
    );
  };
};
