import { ObjectWithObjectID } from '.';

export type GetObjectsResponse<TObject> = {
  /**
   * The list of results.
   */
  readonly results: ReadonlyArray<TObject & ObjectWithObjectID>;
};
