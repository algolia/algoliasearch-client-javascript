import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

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
