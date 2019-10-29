import { Method } from '@algolia/requester-types/src/types/Method';
import { encode } from '@algolia/support';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

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
