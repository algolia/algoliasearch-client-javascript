import { Method } from '@algolia/requester-types/src/types/Method';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { Rule } from '../../types/Rule';
import { SearchIndex } from '../../types/SearchIndex';
import { SearchResponse } from '../../types/SearchResponse';
import { SearchRulesOptions } from '../../types/SearchRulesOptions';

export const searchRules = <TSearchIndex extends SearchIndex>(
  base: TSearchIndex
): TSearchIndex & HasSearchRules => {
  return {
    ...base,
    searchRules(
      query: string,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SearchResponse<Rule>>> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: encode('1/indexes/%s/rules/search', this.indexName),
          data: {
            query,
          },
        },
        requestOptions
      );
    },
  };
};

export type HasSearchRules = {
  readonly searchRules: (
    query: string,
    requestOptions?: SearchRulesOptions & RequestOptions
  ) => Readonly<Promise<SearchResponse<Rule>>>;
};
