import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

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
