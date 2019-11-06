import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

import { DeleteABTestResponse } from '..';

export const deleteABTest = <TClient extends TransporterAware>(
  base: TClient
): TClient & HasDeleteABTest => {
  return {
    ...base,
    deleteABTest(
      abTestID: number,
      requestOptions?: RequestOptions
    ): Readonly<Promise<DeleteABTestResponse>> {
      return this.transporter.write(
        {
          method: MethodEnum.Delete,
          path: encode('2/abtests/%s', abTestID),
        },
        requestOptions
      );
    },
  };
};

export type HasDeleteABTest = {
  readonly deleteABTest: (
    abTestId: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<DeleteABTestResponse>>;
};
