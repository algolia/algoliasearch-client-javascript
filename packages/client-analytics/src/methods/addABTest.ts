import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { ABTest, AddABTestResponse } from '..';
import { AnalyticsClient } from '../types';

export const addABTest = <TClient extends AnalyticsClient>(
  base: TClient
): TClient & HasAddABTest => {
  return {
    ...base,
    addABTest(
      abTest: ABTest,
      requestOptions?: RequestOptions
    ): Readonly<Promise<AddABTestResponse>> {
      return this.transporter.write(
        {
          method: MethodEnum.Post,
          path: '2/abtests',
          data: abTest,
        },
        requestOptions
      );
    },
  };
};

export type HasAddABTest = {
  readonly addABTest: (
    abTest: ABTest,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<AddABTestResponse>>;
};
