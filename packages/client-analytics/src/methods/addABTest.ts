import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { ABTest, AddABTestResponse, AnalyticsClient } from '..';

export const addABTest = (base: AnalyticsClient) => {
  return (
    abTest: ABTest,
    requestOptions?: RequestOptions
  ): Readonly<Promise<AddABTestResponse>> => {
    return base.transporter.write(
      {
        method: MethodEnum.Post,
        path: '2/abtests',
        data: abTest,
      },
      requestOptions
    );
  };
};
