import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { GetPersonalizationStrategyResponse } from '../..';

export const getPersonalizationStrategy = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasGetPersonalizationStrategy => {
  return {
    ...base,
    getPersonalizationStrategy(
      requestOptions?: RequestOptions
    ): Readonly<Promise<GetPersonalizationStrategyResponse>> {
      return this.transporter.read(
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
