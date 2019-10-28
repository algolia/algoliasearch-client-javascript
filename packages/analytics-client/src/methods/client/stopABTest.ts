import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { AnalyticsClient } from '../../AnalyticsClient';
import { StopABTestResponse } from '../types/StopABTestResponse';

export const stopABTest = <TAnalyticsClient extends AnalyticsClient>(
  base: TAnalyticsClient
): TAnalyticsClient & HasStopABTest => {
  return {
    ...base,
    stopABTest(
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
    },
  };
};

export type HasStopABTest = {
  readonly stopABTest: (
    id: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<StopABTestResponse>>;
};
