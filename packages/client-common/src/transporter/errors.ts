import type { Response, StackFrame } from '../types';

export class AlgoliaError extends Error {
  name: string;

  constructor(message: string, name: string) {
    super(message);
    this.name = name ?? 'AlgoliaError';
  }
}

export class ErrorWithStackTrace extends AlgoliaError {
  stackTrace: StackFrame[];

  constructor(message: string, stackTrace: StackFrame[], name: string) {
    super(message, name);
    // the array and object should be frozen to reflect the stackTrace at the time of the error
    this.stackTrace = stackTrace;
  }
}

export class RetryError extends ErrorWithStackTrace {
  constructor(stackTrace: StackFrame[]) {
    super(
      'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
      stackTrace,
      'RetryError'
    );
  }
}

export class ApiError extends ErrorWithStackTrace {
  status: number;

  constructor(message: string, status: number, stackTrace: StackFrame[]) {
    super(message, stackTrace, 'ApiError');
    this.status = status;
  }
}

export class DeserializationError extends AlgoliaError {
  response: Response;

  constructor(message: string, response: Response) {
    super(message, 'DeserializationError');
    this.response = response;
  }
}
