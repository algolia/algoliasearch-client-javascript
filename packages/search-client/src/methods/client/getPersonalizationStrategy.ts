import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { GetPersonalizationStrategyResponse } from '../types/GetPersonalizationStrategyResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getPersonalizationStrategy = <TSearchClient extends ConstructorOf<SearchClient>>(
  base: TSearchClient
) => {
  return class extends base implements HasGetPersonalizationStrategy {
    public getPersonalizationStrategy(
      requestOptions?: RequestOptions
    ): Readonly<Promise<GetPersonalizationStrategyResponse>> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: '1/recommendation/personalization/strategy',
        },
        requestOptions
      );
    }
  };
};

export type HasGetPersonalizationStrategy = {
  readonly getPersonalizationStrategy: (
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetPersonalizationStrategyResponse>>;
};
