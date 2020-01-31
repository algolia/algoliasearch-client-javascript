import { StackFrame } from '.';

export type RetryError = Error & {
  /**
   * Contains report of stack frames of the
   * execution of a certain request.
   */
  readonly transporterStackTrace: readonly StackFrame[];
};
