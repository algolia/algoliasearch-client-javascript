import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

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
