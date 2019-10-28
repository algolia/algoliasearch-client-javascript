import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';
import { TransporterAware } from '@algolia/transporter/src/TransporterAware';

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
          method: Method.Get,
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
