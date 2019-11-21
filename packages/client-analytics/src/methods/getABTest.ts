import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

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
