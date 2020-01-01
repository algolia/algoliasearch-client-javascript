import { ObjectWithObjectID } from '.';

export type BrowseResponse<TObject> = {
  /**
   * The hits per page.
   */
  readonly hits: ReadonlyArray<TObject & ObjectWithObjectID>;

  /**
   * The cursor used for iterate on the next page.
   */
  readonly cursor?: string;
};
