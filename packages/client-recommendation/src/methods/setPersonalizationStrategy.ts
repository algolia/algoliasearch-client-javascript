import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import {
  PersonalizationStrategy,
  RecommendationClient,
  SetPersonalizationStrategyResponse,
} from '..';

export const setPersonalizationStrategy = (base: RecommendationClient) => {
  return (
    personalizationStrategy: PersonalizationStrategy,
    requestOptions?: RequestOptions
  ): Readonly<Promise<SetPersonalizationStrategyResponse>> => {
    return base.transporter.write(
      {
        method: MethodEnum.Post,
        path: '1/strategies/personalization',
        data: personalizationStrategy,
      },
      requestOptions
    );
  };
};
