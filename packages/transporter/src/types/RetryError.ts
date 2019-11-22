import { StackFrame } from '.';

export type RetryError = Error & {
  readonly stackTrace: readonly StackFrame[];
};
