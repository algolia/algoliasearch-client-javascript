import { Method } from '@algolia/requester-types';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter-types';

import { HasWaitTask, waitTask } from '../../../../search-client/src/methods/index/waitTask';
import { AnalyticsClient } from '../../AnalyticsClient';
import { ABTest } from '../types/ABTest';
import { AddABTestResponse } from '../types/AddABTestResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const addABTest = <TAnalyticsClient extends ConstructorOf<AnalyticsClient>>(
  base: TAnalyticsClient
) => {
  return class extends base implements HasAddABTest {
    public addABTest(
      abTest: ABTest,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<AddABTestResponse>> {
      return WaitablePromise.from<AddABTestResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: `2/abtests`,
            data: abTest,
          },
          requestOptions
        )
      ).onWait(response =>
        this.searchClient
          .initIndex<HasWaitTask>(abTest.variants[0].index, { methods: [waitTask] })
          .waitTask(response.taskID)
      );
    }
  };
};

export type HasAddABTest = AnalyticsClient & {
  readonly addABTest: (
    abTest: ABTest,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<AddABTestResponse>>;
};
