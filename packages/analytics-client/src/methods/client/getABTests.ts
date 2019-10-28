import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { AnalyticsClient } from '../../AnalyticsClient';
import { GetABTestsOptions } from '../types/GetABTestsOptions';
import { GetABTestsResponse } from '../types/GetABTestsResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getABTests = <TAnalyticsClient extends ConstructorOf<AnalyticsClient>>(
  base: TAnalyticsClient
) => {
  return class extends base implements HasGetABTests {
    public getABTests(
      requestOptions?: RequestOptions & GetABTestsOptions
    ): Readonly<Promise<GetABTestsResponse>> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: '2/abtests',
        },
        requestOptions
      );
    }
  };
};

export type HasGetABTests = {
  readonly getABTests: (requestOptions?: RequestOptions) => Readonly<Promise<GetABTestsResponse>>;
};
