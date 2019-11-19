import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { GetPersonalizationStrategyResponse, SearchClient } from '../..';

export const getPersonalizationStrategy = <TClient extends SearchClient>(
  base: TClient
): TClient & HasGetPersonalizationStrategy => {
  return {
    ...base,
    getPersonalizationStrategy(
      requestOptions?: RequestOptions
    ): Readonly<Promise<GetPersonalizationStrategyResponse>> {
      return base.transporter.read(
        {
          method: MethodEnum.Get,
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
