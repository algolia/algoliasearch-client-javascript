import { Method } from '@algolia/requester-types';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { GetABTestsOptions } from '../types/GetABTestsOptions';
import { GetABTestsResponse } from '../types/GetABTestsResponse';

export const getABTests = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasGetABTests => {
  return {
    ...base,
    getABTests(
      requestOptions?: RequestOptions & GetABTestsOptions
    ): Readonly<Promise<GetABTestsResponse>> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: '2/abtests',
        },
        requestOptions
      );
    },
  };
};

export type HasGetABTests = {
  readonly getABTests: (requestOptions?: RequestOptions) => Readonly<Promise<GetABTestsResponse>>;
};
