export type BrowseOptions<TObject> = {
  readonly batch?: (batch: readonly TObject[]) => any;
  readonly hitsPerPage?: number;
};
