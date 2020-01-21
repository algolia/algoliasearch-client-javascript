import { StackFrame } from '.';

export type ApiError = Error & {
  /**
   * The http status code.
   */
  readonly status: number;

  /**
   * Contains report of stack frames of the
   * execution of a certain request.
   */
  readonly transporterStackTrace: readonly StackFrame[];
};
