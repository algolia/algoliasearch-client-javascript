import { Host } from '@algolia/transporter-types';
import { Response } from '@algolia/requester-types';

export const enum RetryOutcome {
  Success = 'SUCCESS',
  Retry = 'RETRY',
  Fail = 'FAIL',
}

export class RetryStrategy {
  public decide(host: Host, response: Response) {
    if (this.isRetryable(response)) {
      if (!response.isTimedOut) {
        host.setAsDown();
      }

      return RetryOutcome.Retry;
    }

    if (this.isSuccess(response)) {
      return RetryOutcome.Success;
    }

    return RetryOutcome.Fail;
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
