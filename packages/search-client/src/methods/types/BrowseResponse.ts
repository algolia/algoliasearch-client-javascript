export type BrowseResponse<TObject> = {
  readonly hits: readonly TObject[];
  readonly cursor?: string;
};
