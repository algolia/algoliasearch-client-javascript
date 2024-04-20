import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

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
