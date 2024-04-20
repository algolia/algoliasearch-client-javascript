import { encode } from '@sefai/client-common';
import { MethodEnum } from '@sefai/requester-common';
import { RequestOptions } from '@sefai/transporter';

import { AnalyticsClient, DeleteABTestResponse } from '..';

export const deleteABTest = (base: AnalyticsClient) => {
  return (
    abTestID: number,
    requestOptions?: RequestOptions
  ): Readonly<Promise<DeleteABTestResponse>> => {
    return base.transporter.write(
      {
        method: MethodEnum.Delete,
        path: encode('2/abtests/%s', abTestID),
      },
      requestOptions
    );
  };
};
