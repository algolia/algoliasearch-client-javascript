import { Method } from '@algolia/requester-types';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { GetPersonalizationStrategyResponse } from '../types/GetPersonalizationStrategyResponse';

export const getPersonalizationStrategy = <TSearchClient extends SearchClient>(
  base: TSearchClient
): TSearchClient & HasGetPersonalizationStrategy => {
  return {
    ...base,
    getPersonalizationStrategy(
      requestOptions?: RequestOptions
    ): Readonly<Promise<GetPersonalizationStrategyResponse>> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: '1/recommendation/personalization/strategy',
        },
        requestOptions
      );
    },
  };
};

export type HasGetPersonalizationStrategy = {
  readonly getPersonalizationStrategy: (
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetPersonalizationStrategyResponse>>;
};
