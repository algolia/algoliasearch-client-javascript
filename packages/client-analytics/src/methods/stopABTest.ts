import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

import { AnalyticsClient, StopABTestResponse } from '..';

export const stopABTest = (base: AnalyticsClient) => {
  return (
    abTestID: number,
    requestOptions?: RequestOptions
  ): Readonly<Promise<StopABTestResponse>> => {
    return base.transporter.write(
      {
        method: MethodEnum.Post,
        path: encode('2/abtests/%s/stop', abTestID),
      },
      requestOptions
    );
  };
};
