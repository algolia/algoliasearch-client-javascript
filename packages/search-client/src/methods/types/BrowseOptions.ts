export type BrowseOptions<TObject> = {
  readonly batch?: (batch: readonly TObject[]) => any;
  // eslint-disable-next-line functional/no-mixed-type
  readonly hitsPerPage?: number;
};
