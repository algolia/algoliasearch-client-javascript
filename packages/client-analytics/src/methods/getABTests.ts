import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { AnalyticsClient, GetABTestsOptions, GetABTestsResponse } from '..';

export const getABTests = (base: AnalyticsClient) => {
  return (
    requestOptions?: RequestOptions & GetABTestsOptions
  ): Readonly<Promise<GetABTestsResponse>> => {
    return base.transporter.read(
      {
        method: MethodEnum.Get,
        path: '2/abtests',
      },
      requestOptions
    );
  };
};
