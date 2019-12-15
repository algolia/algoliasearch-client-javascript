export type BrowseOptions<TObject> = {
  readonly batch?: (batch: readonly TObject[]) => any;
};
