import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { Rule, SearchIndex } from '../..';

export const getRule = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetRule => {
  return {
    ...base,
    getRule(objectID: string, requestOptions?: RequestOptions): Readonly<Promise<Rule>> {
      return base.transporter.read(
        {
          method: MethodEnum.Get,
          path: encode('1/indexes/%s/rules/%s', base.indexName, objectID),
        },
        requestOptions
      );
    },
  };
};

export type HasGetRule = {
  readonly getRule: (objectID: string, requestOptions?: RequestOptions) => Readonly<Promise<Rule>>;
};
