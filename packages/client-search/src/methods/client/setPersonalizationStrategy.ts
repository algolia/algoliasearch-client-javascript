import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { PersonalizationStrategy, SearchClient, SetPersonalizationStrategyResponse } from '../..';

export const setPersonalizationStrategy = (base: SearchClient) => {
  return (
    personalizationStrategy: PersonalizationStrategy,
    requestOptions?: RequestOptions
  ): Readonly<Promise<SetPersonalizationStrategyResponse>> => {
    return base.transporter.write(
      {
        method: MethodEnum.Post,
        path: '1/recommendation/personalization/strategy',
        data: personalizationStrategy,
      },
      requestOptions
    );
  };
};
