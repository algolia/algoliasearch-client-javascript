import { ObjectWithObjectID } from '.';

export type GetObjectsResponse<TObject> = {
  /**
   * The list of results.
   */
  results: Array<(TObject & ObjectWithObjectID) | null>;
};
