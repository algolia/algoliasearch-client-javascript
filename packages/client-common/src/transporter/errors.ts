import type { Response, StackFrame } from '../types';

export class AlgoliaError extends Error {
  override name: string = 'AlgoliaError';

  constructor(message: string, name: string) {
    super(message);

    if (name) {
      this.name = name;
    }
  }
}

export class IndexNotFoundError extends AlgoliaError {
  constructor(indexName: string) {
    super(`${indexName} does not exist`, 'IndexNotFoundError');
  }
}

export class IndicesInSameAppError extends AlgoliaError {
  constructor() {
    super('Indices are in the same application. Use operationIndex instead.', 'IndicesInSameAppError');
  }
}

export class IndexAlreadyExistsError extends AlgoliaError {
  constructor(indexName: string) {
    super(`${indexName} index already exists.`, 'IndexAlreadyExistsError');
  }
}

export class ErrorWithStackTrace extends AlgoliaError {
  stackTrace: StackFrame[];

  correlationId?: string | undefined;

  constructor(message: string, stackTrace: StackFrame[], name: string, correlationId?: string | undefined) {
    super(correlationId ? `${message} (Correlation-ID: ${correlationId})` : message, name);
    // the array and object should be frozen to reflect the stackTrace at the time of the error
    this.stackTrace = stackTrace;
    this.correlationId = correlationId;
  }
}

export class RetryError extends ErrorWithStackTrace {
  constructor(stackTrace: StackFrame[], correlationId?: string | undefined) {
    super(
      'Unreachable hosts - your application id may be incorrect. If the error persists, please visit our help center https://alg.li/support-unreachable-hosts or reach out to the Algolia Support team: https://alg.li/support',
      stackTrace,
      'RetryError',
      correlationId,
    );
  }
}

export class ApiError extends ErrorWithStackTrace {
  status: number;

  constructor(
    message: string,
    status: number,
    stackTrace: StackFrame[],
    name = 'ApiError',
    correlationId?: string | undefined,
  ) {
    super(message, stackTrace, name, correlationId);
    this.status = status;
  }
}

export class DeserializationError extends AlgoliaError {
  response: Response;

  correlationId?: string | undefined;

  constructor(message: string, response: Response, correlationId?: string | undefined) {
    super(correlationId ? `${message} (Correlation-ID: ${correlationId})` : message, 'DeserializationError');
    this.response = response;
    this.correlationId = correlationId;
  }
}

export type DetailedErrorWithMessage = {
  message: string;
  label: string;
};

export type DetailedErrorWithTypeID = {
  id: string;
  type: string;
  name?: string | undefined;
};

export type DetailedError = {
  code: string;
  details?: DetailedErrorWithMessage[] | DetailedErrorWithTypeID[] | undefined;
};

// DetailedApiError is only used by the ingestion client to return more informative error, other clients will use ApiClient.
export class DetailedApiError extends ApiError {
  error: DetailedError;

  constructor(
    message: string,
    status: number,
    error: DetailedError,
    stackTrace: StackFrame[],
    correlationId?: string | undefined,
  ) {
    super(message, status, stackTrace, 'DetailedApiError', correlationId);
    this.error = error;
  }
}
