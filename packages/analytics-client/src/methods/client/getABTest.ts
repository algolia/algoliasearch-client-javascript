import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { AnalyticsClient } from '../../AnalyticsClient';
import { GetABTestResponse } from '../types/GetABTestResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getABTest = <TAnalyticsClient extends ConstructorOf<AnalyticsClient>>(
  base: TAnalyticsClient
) => {
  return class extends base implements HasGetABTest {
    public getABTest(
      abTestID: number,
      requestOptions?: RequestOptions
    ): Readonly<Promise<GetABTestResponse>> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: encode('2/abtests/%s', abTestID),
        },
        requestOptions
      );
    }
  };
};

export type HasGetABTest = {
  readonly getABTest: (
    abTestID: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetABTestResponse>>;
};
