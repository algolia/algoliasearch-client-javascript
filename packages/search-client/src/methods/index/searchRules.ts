import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { SearchIndex } from '../../SearchIndex';
import { Rule } from '../types/Rule';
import { SearchResponse } from '../types/SearchResponse';
import { SearchRulesOptions } from '../types/SearchRulesOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const searchRules = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  return class extends base implements HasSearchRules {
    public searchRules(
      query: string,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SearchResponse<Rule>>> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: `1/indexes/${this.indexName}/rules/search`,
          data: {
            query,
          },
        },
        requestOptions
      );
    }
  };
};

export type HasSearchRules = {
  readonly searchRules: (
    query?: string,
    requestOptions?: SearchRulesOptions & RequestOptions
  ) => Readonly<Promise<SearchResponse<Rule>>>;
};
