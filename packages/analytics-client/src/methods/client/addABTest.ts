import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { AnalyticsClient } from '../../AnalyticsClient';
import { ABTest } from '../types/ABTest';
import { AddABTestResponse } from '../types/AddABTestResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const addABTest = <TAnalyticsClient extends ConstructorOf<AnalyticsClient>>(
  base: TAnalyticsClient
) => {
  return class extends base implements HasAddABTest {
    public addABTest(
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
    }
  };
};

export type HasAddABTest = {
  readonly addABTest: (
    abTest: ABTest,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<AddABTestResponse>>;
};
