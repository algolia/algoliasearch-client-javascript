import { Host } from '@algolia/transporter-types';
import { Response } from '@algolia/requester-types';

export class RetryStrategy {
  public decide(host: Host, response: Response, outcomes: Outcomes): void {
    if (this.isRetryable(response)) {
      if (!response.isTimedOut) {
        host.setAsDown();
      }

      return outcomes.retry();
    }

    if (this.isSuccess(response)) {
      return outcomes.success();
    }

    return outcomes.fail();
  }

  private isRetryable(response: Response): boolean {
    const status = response.status;
    const isTimedOut = response.isTimedOut;

    return (
      isTimedOut ||
      this.isNetworkError(response) ||
      (~~(status / 100) !== 2 && ~~(status / 100) !== 4)
    );
  }

  private isSuccess({ status }: Response): boolean {
    return ~~(status / 100) === 2;
  }

  private isNetworkError({ isTimedOut, status }: Response): boolean {
    return !isTimedOut && ~~status === 0;
  }
}

export const enum RetryOutcome {
  Success = 'success',
  Retry = 'retry',
  Fail = 'fail',
}

type Outcomes = {
  // eslint-disable-next-line @typescript-eslint/generic-type-naming
  [key in RetryOutcome]: () => void;
};
