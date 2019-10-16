import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { AnalyticsClient } from '../../AnalyticsClient';
import { GetABTestResponse } from '../types/GetABTestResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getABTest = <TAnalyticsClient extends ConstructorOf<AnalyticsClient>>(
  base: TAnalyticsClient
) => {
  return class extends base implements HasGetABTest {
    public getABTest(
      id: number,
      requestOptions?: RequestOptions
    ): Readonly<Promise<GetABTestResponse>> {
      return this.transporter.read(
        {
          method: Method.Get,
          path: `2/abtests/${id}`,
        },
        requestOptions
      );
    }
  };
};

export type HasGetABTest = AnalyticsClient & {
  readonly getABTest: (
    id: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetABTestResponse>>;
};
