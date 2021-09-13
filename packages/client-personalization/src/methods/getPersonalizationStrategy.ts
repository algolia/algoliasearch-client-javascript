import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { GetPersonalizationStrategyResponse, PersonalizationClient } from '..';

export const getPersonalizationStrategy = (base: PersonalizationClient) => {
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
