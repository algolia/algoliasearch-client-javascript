import { Host } from '@algolia/transporter-types';
import { Response } from '@algolia/requester-types';

const isNetworkError = ({ isTimedOut, status }: Response): boolean => {
  return !isTimedOut && ~~status === 0;
};

const isRetryable = (response: Response): boolean => {
  const status = response.status;
  const isTimedOut = response.isTimedOut;

  return (
    isTimedOut || isNetworkError(response) || (~~(status / 100) !== 2 && ~~(status / 100) !== 4)
  );
};

const isSuccess = ({ status }: Response): boolean => {
  return ~~(status / 100) === 2;
};

export default (host: Host, response: Response, outcomes: Outcomes): void => {
  if (isRetryable(response)) {
    if (!response.isTimedOut) {
      host.setAsDown();
    }

    return outcomes.retry();
  }

  if (isSuccess(response)) {
    return outcomes.success();
  }

  return outcomes.fail();
};

const enum RetryOutcome {
  Success = 'success',
  Retry = 'retry',
  Fail = 'fail',
}

type Outcomes = {
  // eslint-disable-next-line @typescript-eslint/generic-type-naming
  [key in RetryOutcome]: () => void;
};
