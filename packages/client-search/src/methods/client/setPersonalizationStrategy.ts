import { MethodEnum } from '@algolia/requester-common/src/types/MethodType';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/src/types/TransporterAware';

import { PersonalizationStrategy } from '../../types/PersonalizationStrategy';
import { SetPersonalizationStrategyResponse } from '../../types/SetPersonalizationStrategyResponse';

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
