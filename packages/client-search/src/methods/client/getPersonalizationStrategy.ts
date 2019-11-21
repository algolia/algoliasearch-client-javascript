import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { GetPersonalizationStrategyResponse, SearchClient } from '../..';

export const getPersonalizationStrategy = (base: SearchClient) => {
  return (
    requestOptions?: RequestOptions
  ): Readonly<Promise<GetPersonalizationStrategyResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '1/recommendation/personalization/strategy',
      },
      requestOptions
    );
  };
};
