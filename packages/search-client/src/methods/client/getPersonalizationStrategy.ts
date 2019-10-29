import { Method } from '@algolia/requester-types/src/types/Method';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { GetPersonalizationStrategyResponse } from '../../types/GetPersonalizationStrategyResponse';

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
