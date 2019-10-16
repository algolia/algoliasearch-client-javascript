import { Method } from '@algolia/requester-types';
import { ConstructorOf, endpoint } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { Rule } from '../types/Rule';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getRule = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasGetRule {
    public getRule(objectID: string, requestOptions?: RequestOptions): Promise<Rule> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: endpoint(`1/indexes/%s/rules/%s`, this.indexName, objectID),
        },
        requestOptions
      );
    }
  };
};

export type HasGetRule = {
  readonly getRule: (objectID: string, requestOptions?: RequestOptions) => Readonly<Promise<Rule>>;
};
