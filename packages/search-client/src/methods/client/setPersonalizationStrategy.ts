import { Method } from '@algolia/requester-types';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { PersonalizationStrategy } from '../types/PersonalizationStrategy';
import { SetPersonalizationStrategyResponse } from '../types/SetPersonalizationStrategyResponse';

export const setPersonalizationStrategy = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasSetPersonalizationStrategy => {
  return {
    ...base,
    setPersonalizationStrategy(
      personalizationStrategy: PersonalizationStrategy,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SetPersonalizationStrategyResponse>> {
      return this.transporter.write(
        {
          method: Method.Post,
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
