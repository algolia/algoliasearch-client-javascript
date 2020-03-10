import { ObjectWithObjectID } from '.';

export type BrowseResponse<TObject> = {
  /**
   * The hits per page.
   */
  hits: Array<TObject & ObjectWithObjectID>;

  /**
   * The cursor used for iterate on the next page.
   */
  cursor?: string;
};
