import type { Response, StackFrame } from './types';

class ErrorWithStackTrace extends Error {
  stackTrace: StackFrame[];

  constructor(message: string, stackTrace: StackFrame[]) {
    super(message);
    // the array and object should be frozen to reflect the stackTrace at the time of the error
    this.stackTrace = stackTrace;
  }
}

export class RetryError extends ErrorWithStackTrace {
  constructor(stackTrace: StackFrame[]) {
    super(
      'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
      stackTrace
    );
  }
}

export class ApiError extends ErrorWithStackTrace {
  status: number;

  constructor(message: string, status: number, stackTrace: StackFrame[]) {
    super(message, stackTrace);
    this.status = status;
  }
}

export class DeserializationError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}
