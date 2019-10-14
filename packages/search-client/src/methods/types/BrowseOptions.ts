export type BrowseOptions<TObject> = {
  /* eslint-disable functional/prefer-readonly-type,functional/no-mixed-type */
  batch?: (batch: TObject[]) => any;
  hitsPerPage?: number;
};
