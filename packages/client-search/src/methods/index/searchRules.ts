import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { Rule, SearchIndex, SearchResponse, SearchRulesOptions } from '../..';

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
          method: MethodEnum.Post,
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
