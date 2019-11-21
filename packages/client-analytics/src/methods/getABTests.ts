import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

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
