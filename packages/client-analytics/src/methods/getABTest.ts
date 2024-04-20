import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { AnalyticsClient, GetABTestResponse } from '..';

export const getABTest = (base: AnalyticsClient) => {
  return (
    abTestID: number,
    requestOptions?: RequestOptions
  ): Readonly<Promise<GetABTestResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: encode('2/abtests/%s', abTestID),
      },
      requestOptions
    );
  };
};
