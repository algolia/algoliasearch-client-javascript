import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { GetPersonalizationStrategyResponse, RecommendationClient } from '..';

export const getPersonalizationStrategy = (base: RecommendationClient) => {
  return (
    requestOptions?: RequestOptions
  ): Readonly<Promise<GetPersonalizationStrategyResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/strategies/personalization',
      },
      requestOptions
    );
  };
};
