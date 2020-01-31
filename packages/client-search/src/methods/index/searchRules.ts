import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { Rule, SearchIndex, SearchResponse, SearchRulesOptions } from '../..';

export const searchRules = (base: SearchIndex) => {
  return (
    query: string,
    requestOptions?: RequestOptions & SearchRulesOptions
  ): Readonly<Promise<SearchResponse<Rule>>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: encode('1/indexes/%s/rules/search', base.indexName),
        data: {
          query,
        },
      },
      requestOptions
    );
  };
};
