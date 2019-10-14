import { Response } from '@algolia/requester-types';
import { Host } from '@algolia/transporter-types';

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

export const decision = <TResponse>(
  host: Host,
  response: Response,
  outcomes: Outcomes
): Promise<TResponse> => {
  if (isRetryable(response)) {
    if (!response.isTimedOut) {
      host.setAsDown();
    }

    return outcomes.retry<TResponse>();
  }

  if (isSuccess(response)) {
    return outcomes.success<TResponse>();
  }

  return outcomes.fail<TResponse>();
};

type Outcomes = {
  readonly fail: <TResponse>() => Promise<TResponse>;
  readonly success: <TResponse>() => Promise<TResponse>;
  readonly retry: <TResponse>() => Promise<TResponse>;
};
