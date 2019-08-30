export type Cache = {
  readonly get: <TValue>(
    key: object,
    defaultValue: () => Promise<TValue>,
    events: CacheEvents
  ) => Promise<TValue>;
  readonly set: (key: object, value: any) => Promise<void>;
  readonly delete: (key: object) => Promise<void>;
  readonly clear: () => Promise<void>;
};

export type CacheEvents = {
  // eslint-disable-next-line @typescript-eslint/generic-type-naming
  readonly miss: (value: any) => Promise<void>;
};
