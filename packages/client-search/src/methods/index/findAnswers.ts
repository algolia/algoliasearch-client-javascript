import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { FindAnswersOptions, FindAnswersResponse, SearchIndex } from '../..';

export const findAnswers = (base: SearchIndex) => {
  return <TObject>(
    query: string,
    queryLanguages: readonly string[],
    requestOptions?: RequestOptions & FindAnswersOptions
  ): Readonly<Promise<FindAnswersResponse<TObject>>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: encode('1/answers/%s/prediction', base.indexName),
        data: {
          query,
          queryLanguages,
        },
        cacheable: true,
      },
      requestOptions
    );
  };
};
