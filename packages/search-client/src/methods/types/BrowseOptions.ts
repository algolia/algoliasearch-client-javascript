export type BrowseOptions<TObject> = {
  /* eslint-disable functional/prefer-readonly-type */
  batch?: (batch: TObject[]) => any;
};
