import { CacheEvents } from '.';

export type Cache = {
  readonly get: <TValue>(
    key: object | string,
    defaultValue: () => Readonly<Promise<TValue>>,
    events?: CacheEvents<TValue>
  ) => Readonly<Promise<TValue>>;
  readonly set: <TValue>(key: object | string, value: TValue) => Readonly<Promise<TValue>>;
  readonly delete: (key: object | string) => Readonly<Promise<void>>;
};
