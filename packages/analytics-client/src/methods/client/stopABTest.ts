import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { AnalyticsClient } from '../../AnalyticsClient';
import { StopABTestResponse } from '../types/StopABTestResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const stopABTest = <TAnalyticsClient extends ConstructorOf<AnalyticsClient>>(
  base: TAnalyticsClient
) => {
  return class extends base implements HasStopABTest {
    public stopABTest(
      abTestID: number,
      requestOptions?: RequestOptions
    ): Readonly<Promise<StopABTestResponse>> {
      return this.transporter.write(
        {
          method: Method.Post,
          path: encode('2/abtests/%s/stop', abTestID),
        },
        requestOptions
      );
    }
  };
};

export type HasStopABTest = {
  readonly stopABTest: (
    id: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<StopABTestResponse>>;
};
