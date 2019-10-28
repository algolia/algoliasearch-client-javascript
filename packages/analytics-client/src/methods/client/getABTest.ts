import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { AnalyticsClient } from '../../AnalyticsClient';
import { GetABTestResponse } from '../types/GetABTestResponse';

export const getABTest = <TAnalyticsClient extends AnalyticsClient>(
  base: TAnalyticsClient
): TAnalyticsClient & HasGetABTest => {
  return {
    ...base,
    getABTest(
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
    },
  };
};

export type HasGetABTest = {
  readonly getABTest: (
    abTestID: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetABTestResponse>>;
};
