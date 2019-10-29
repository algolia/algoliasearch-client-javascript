import { encode } from '@algolia/client-common';
import { Method } from '@algolia/requester-common/src/types/Method';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/src/types/TransporterAware';

import { StopABTestResponse } from '../types/StopABTestResponse';

export const stopABTest = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasStopABTest => {
  return {
    ...base,
    stopABTest(
      abTestID: number,
      requestOptions?: RequestOptions
    ): Readonly<Promise<StopABTestResponse>> {
      return this.transporter.write(
        {
          method: Method.Post,
          path: encode('2/abtests/%s/stop', abTestID),
        },
        requestOptions
      );
    },
  };
};

export type HasStopABTest = {
  readonly stopABTest: (
    id: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<StopABTestResponse>>;
};
