import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { SearchForAnswersOptions, SearchForAnswersResponse, SearchIndex } from '../..';

export const searchForAnswers = (base: SearchIndex) => {
  return <TObject>(
    query: string,
    queryLanguages: readonly string[],
    requestOptions?: RequestOptions & SearchForAnswersOptions
  ): Readonly<Promise<SearchForAnswersResponse<TObject>>> => {
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
