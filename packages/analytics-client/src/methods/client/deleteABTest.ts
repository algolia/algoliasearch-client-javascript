import { Method } from '@algolia/requester-types';
import { ConstructorOf, WaitablePromise } from '@algolia/support';
import { RequestOptions } from '@algolia/transporter';

import { HasWaitTask, waitTask } from '../../../../search-client/src/methods/index/waitTask';
import { AnalyticsClient } from '../../AnalyticsClient';
import { DeleteABTestResponse } from '../types/DeleteABTestResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const deleteABTest = <TAnalyticsClient extends ConstructorOf<AnalyticsClient>>(
  base: TAnalyticsClient
) => {
  return class extends base implements HasDeleteABTest {
    public deleteABTest(
      id: number,
      requestOptions?: RequestOptions
    ): Readonly<WaitablePromise<DeleteABTestResponse>> {
      return WaitablePromise.from<DeleteABTestResponse>(
        this.transporter.read(
          {
            method: Method.Delete,
            path: `2/abtests/${id}`,
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

export type HasDeleteABTest = AnalyticsClient & {
  readonly deleteABTest: (
    id: number,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteABTestResponse>>;
};
