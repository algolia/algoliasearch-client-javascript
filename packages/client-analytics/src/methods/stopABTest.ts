import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

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
