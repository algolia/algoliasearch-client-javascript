import { StackFrame } from './types';

export function stackTraceWithoutCredentials(
  stackTrace: readonly StackFrame[]
): readonly StackFrame[] {
  return stackTrace.map(stackFrame => stackFrameWithoutCredentials(stackFrame));
}

export function stackFrameWithoutCredentials(stackFrame: StackFrame): StackFrame {
  const modifiedHeaders: Readonly<Record<string, string>> = stackFrame.request.headers[
    'x-algolia-api-key'
  ]
    ? { 'x-algolia-api-key': '*****' }
    : {};

  return {
    ...stackFrame,
    request: {
      ...stackFrame.request,
      headers: {
        ...stackFrame.request.headers,
        ...modifiedHeaders,
      },
    },
  };
}
