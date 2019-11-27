export type CacheEvents<TValue> = {
  // eslint-disable-next-line @typescript-eslint/generic-type-naming
  readonly miss: (value: TValue) => Readonly<Promise<any>>;
};
