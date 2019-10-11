export type BrowseResponse<TObject> = {
  /* eslint-disable functional/prefer-readonly-type */
  hits: TObject[];
  cursor?: string;
};
