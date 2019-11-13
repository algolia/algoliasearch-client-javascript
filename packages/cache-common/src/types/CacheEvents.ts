export type CacheEvents = {
  // eslint-disable-next-line @typescript-eslint/generic-type-naming
  readonly miss: (value: any) => Readonly<Promise<void>>;
};
