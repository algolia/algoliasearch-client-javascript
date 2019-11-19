import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { PersonalizationStrategy, SearchClient, SetPersonalizationStrategyResponse } from '../..';

export const setPersonalizationStrategy = <TClient extends SearchClient>(
  base: TClient
): TClient & HasSetPersonalizationStrategy => {
  return {
    ...base,
    setPersonalizationStrategy(
      personalizationStrategy: PersonalizationStrategy,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SetPersonalizationStrategyResponse>> {
      return base.transporter.write(
        {
          method: MethodEnum.Post,
          path: '1/recommendation/personalization/strategy',
          data: personalizationStrategy,
        },
        requestOptions
      );
    },
  };
};

export type HasSetPersonalizationStrategy = {
  readonly setPersonalizationStrategy: (
    personalizationStrategy: PersonalizationStrategy,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SetPersonalizationStrategyResponse>>;
};
