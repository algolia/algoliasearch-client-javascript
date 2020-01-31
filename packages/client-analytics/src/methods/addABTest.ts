import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions } from '@algolia/transporter';

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
