import { encode } from '@algolia/client-common';
import { Method } from '@algolia/requester-common/src/types/Method';
import { RequestOptions } from '@algolia/transporter/src/types/RequestOptions';
import { TransporterAware } from '@algolia/transporter/src/types/TransporterAware';

import { DeleteABTestResponse } from '../types/DeleteABTestResponse';

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
          method: Method.Delete,
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
