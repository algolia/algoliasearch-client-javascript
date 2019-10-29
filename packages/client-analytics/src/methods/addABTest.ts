import { Method } from '@algolia/requester-common/src/types/Method';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { ABTest } from '../types/ABTest';
import { AddABTestResponse } from '../types/AddABTestResponse';

export const addABTest = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasAddABTest => {
  return {
    ...base,
    addABTest(
      abTest: ABTest,
      requestOptions?: RequestOptions
    ): Readonly<Promise<AddABTestResponse>> {
      return this.transporter.write(
        {
          method: Method.Post,
          path: '2/abtests',
          data: abTest,
        },
        requestOptions
      );
    },
  };
};

export type HasAddABTest = {
  readonly addABTest: (
    abTest: ABTest,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<AddABTestResponse>>;
};
