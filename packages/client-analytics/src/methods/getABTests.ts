import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { RequestOptions } from '@algolia/transporter/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/types/TransporterAware';

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
          method: MethodEnum.Get,
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
