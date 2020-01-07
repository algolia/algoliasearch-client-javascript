import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchIndex, Settings } from '../..';

export const getSettings = (base: SearchIndex) => {
  return (requestOptions?: RequestOptions): Readonly<Promise<Settings>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('1/indexes/%s/settings', base.indexName),
        data: {
          getVersion: 2,
        },
      },
      requestOptions
    );
  };
};
