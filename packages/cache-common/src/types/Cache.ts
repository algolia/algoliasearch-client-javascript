import { CacheEvents } from '.';

export type Cache = {
  readonly get: <TValue>(
    key: object,
    defaultValue: () => Readonly<Promise<TValue>>,
    events?: CacheEvents<TValue>
  ) => Readonly<Promise<TValue>>;
  readonly set: <TValue>(key: object, value: TValue) => Readonly<Promise<TValue>>;
  readonly delete: (key: object) => Readonly<Promise<void>>;
  readonly clear: () => Readonly<Promise<void>>;
};
