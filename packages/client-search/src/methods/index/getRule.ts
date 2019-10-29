import { encode } from '@algolia/client-common';
import { Method } from '@algolia/requester-common/src/types/Method';
import { RequestOptions } from '@algolia/transporter';

import { Rule } from '../../types/Rule';
import { SearchIndex } from '../../types/SearchIndex';

export const getRule = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasGetRule => {
  return {
    ...base,
    getRule(objectID: string, requestOptions?: RequestOptions): Readonly<Promise<Rule>> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: encode('1/indexes/%s/rules/%s', this.indexName, objectID),
        },
        requestOptions
      );
    },
  };
};

export type HasGetRule = {
  readonly getRule: (objectID: string, requestOptions?: RequestOptions) => Readonly<Promise<Rule>>;
};
