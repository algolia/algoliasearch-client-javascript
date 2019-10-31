import { encode } from '@algolia/client-common/helpers';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

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
          method: MethodEnum.Post,
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
