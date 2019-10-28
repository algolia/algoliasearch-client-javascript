import { Method } from '@algolia/requester-types';
import { RequestOptions } from '@algolia/transporter';

import { AnalyticsClient } from '../../AnalyticsClient';
import { ABTest } from '../types/ABTest';
import { AddABTestResponse } from '../types/AddABTestResponse';

export const addABTest = <TAnalyticsClient extends AnalyticsClient>(
  base: TAnalyticsClient
): TAnalyticsClient & HasAddABTest => {
  return {
    ...base,
    addABTest(
      abTest: ABTest,
      requestOptions?: RequestOptions
    ): Readonly<Promise<AddABTestResponse>> {
      return this.transporter.write(
        {
          method: Method.Post,
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
