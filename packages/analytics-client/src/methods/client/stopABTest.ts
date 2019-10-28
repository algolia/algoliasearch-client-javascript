import { Method } from '@algolia/requester-types';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { HasWaitTask, waitTask } from '../../../../search-client/src/methods/index/waitTask';
import { AnalyticsClient } from '../../AnalyticsClient';
import { StopABTestResponse } from '../types/StopABTestResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const stopABTest = <TAnalyticsClient extends ConstructorOf<AnalyticsClient>>(
  base: TAnalyticsClient
) => {
  return class extends base implements HasStopABTest {
    public stopABTest(
      id: number,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<StopABTestResponse>> {
      return WaitablePromise.from<StopABTestResponse>(
        this.transporter.write(
          {
            method: Method.Post,
            path: `2/abtests/${id}/stop`,
          },
          requestOptions
        )
      ).onWait(response =>
        this.searchClient
          .initIndex<HasWaitTask>(response.index, { methods: [waitTask] })
          .waitTask(response.taskID)
      );
    }
  };
};

export type HasStopABTest = AnalyticsClient & {
  readonly stopABTest: (
    id: number,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<StopABTestResponse>>;
};
