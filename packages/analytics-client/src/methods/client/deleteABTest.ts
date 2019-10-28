import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { AnalyticsClient } from '../../AnalyticsClient';
import { DeleteABTestResponse } from '../types/DeleteABTestResponse';

export const deleteABTest = <TAnalyticsClient extends AnalyticsClient>(
  base: TAnalyticsClient
): TAnalyticsClient & HasDeleteABTest => {
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
