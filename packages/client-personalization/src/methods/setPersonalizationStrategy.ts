import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import {
  PersonalizationClient,
  PersonalizationStrategy,
  SetPersonalizationStrategyResponse,
} from '..';

export const setPersonalizationStrategy = (base: PersonalizationClient) => {
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
