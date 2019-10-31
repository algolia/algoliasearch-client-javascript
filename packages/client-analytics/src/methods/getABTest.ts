import { encode } from '@algolia/client-common/helpers';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

import { GetABTestResponse } from '../types/GetABTestResponse';

export const getABTest = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasGetABTest => {
  return {
    ...base,
    getABTest(
      abTestID: number,
      requestOptions?: RequestOptions
    ): Readonly<Promise<GetABTestResponse>> {
      return this.transporter.read(
        {
          method: MethodEnum.Get,
          path: encode('2/abtests/%s', abTestID),
        },
        requestOptions
      );
    },
  };
};

export type HasGetABTest = {
  readonly getABTest: (
    abTestID: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetABTestResponse>>;
};
