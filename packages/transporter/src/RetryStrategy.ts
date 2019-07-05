import { Host } from '@algolia/transporter-types';
import { Response } from '@algolia/requester-types';

export const enum RetryOutcome {
  Success = 'SUCCESS',
  Retry = 'RETRY',
  Fail = 'FAIL',
}

export class RetryStrategy {
  public decide(host: Host, response: Response) {
    if (response.isTimedOut) {
      return RetryOutcome.Retry;
    }

    if (this.isRetryable(response)) {
      return RetryOutcome.Retry;
    }

    if (this.isSuccess(response)) {
      return RetryOutcome.Success;
    }

    return RetryOutcome.Fail;
  }

  private isRetryable({ status }: Response): boolean {
    return ~~(status / 100) !== 2 && ~~(status / 100) !== 4;
  }

  private isSuccess({ status }: Response): boolean {
    return status / 100 === 2;
  }
}
