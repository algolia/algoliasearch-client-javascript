import { Method } from '@algolia/requester-types';
import { ConstructorOf, encode } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { AnalyticsClient } from '../../AnalyticsClient';
import { DeleteABTestResponse } from '../types/DeleteABTestResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const deleteABTest = <TAnalyticsClient extends ConstructorOf<AnalyticsClient>>(
  base: TAnalyticsClient
) => {
  return class extends base implements HasDeleteABTest {
    public deleteABTest(
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
    }
  };
};

export type HasDeleteABTest = {
  readonly deleteABTest: (
    abTestId: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<DeleteABTestResponse>>;
};
