import { Method } from '@algolia/requester-types/src/types/Method';
import { encode } from '@algolia/support';
import { RequestOptions, TransporterAware } from '@algolia/transporter';

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
