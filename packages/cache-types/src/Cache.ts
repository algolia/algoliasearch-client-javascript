export type Cache = {
  readonly get: <TValue>(
    key: object,
    defaultValue: () => Readonly<Promise<TValue>>,
    events?: CacheEvents
  ) => Readonly<Promise<TValue>>;
  readonly set: <TValue>(key: object, value: TValue) => Readonly<Promise<TValue>>;
  readonly delete: (key: object) => Readonly<Promise<void>>;
  readonly clear: () => Readonly<Promise<void>>;
};

export type CacheEvents = {
  // eslint-disable-next-line @typescript-eslint/generic-type-naming
  readonly miss?: (value: any) => Readonly<Promise<void>>;
};
