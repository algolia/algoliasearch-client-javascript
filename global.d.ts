export {};

declare global {
  // eslint-disable-next-line no-redeclare
  const testing: {
    readonly environment: () => string;
    readonly isBrowser: () => boolean;
    readonly isBrowserLite: () => boolean;
  };
}

// eslint-disable-next-line import/no-unresolved
import { MethodStubSetter } from 'ts-mockito/lib/MethodStubSetter';

declare module 'ts-mockito' {
  export function when<TResponse>(
    method: Readonly<Promise<TResponse>>
  ): MethodStubSetter<Readonly<Promise<TResponse>>, TResponse, Error>;
}
