export type Cache = {
  readonly get: <TValue>(
    key: object,
    defaultValue: () => Promise<TValue>,
    events?: CacheEvents
  ) => Promise<TValue>;
  readonly set: <TValue>(key: object, value: TValue) => Promise<TValue>;
  readonly delete: (key: object) => Promise<void>;
  readonly clear: () => Promise<void>;
};

export type CacheEvents = {
  // eslint-disable-next-line @typescript-eslint/generic-type-naming
  readonly miss?: (value: any) => Promise<void>;
};
