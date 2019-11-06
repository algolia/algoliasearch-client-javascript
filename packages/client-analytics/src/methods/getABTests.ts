import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { GetABTestsOptions, GetABTestsResponse } from '..';

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
