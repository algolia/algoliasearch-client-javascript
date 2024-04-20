import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { Rule, SearchIndex } from '../..';

export const getRule = (base: SearchIndex) => {
  return (objectID: string, requestOptions?: RequestOptions): Readonly<Promise<Rule>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('1/indexes/%s/rules/%s', base.indexName, objectID),
      },
      requestOptions
    );
  };
};
