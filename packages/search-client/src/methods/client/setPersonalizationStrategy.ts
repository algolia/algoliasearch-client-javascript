import { Method } from '@algolia/requester-types';
import { RequestOptions } from '@algolia/transporter';

import { SearchClient } from '../../SearchClient';
import { PersonalizationStrategy } from '../types/PersonalizationStrategy';
import { SetPersonalizationStrategyResponse } from '../types/SetPersonalizationStrategyResponse';

export const setPersonalizationStrategy = <TSearchClient extends SearchClient>(
  base: TSearchClient
): TSearchClient & HasSetPersonalizationStrategy => {
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
