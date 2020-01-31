import { ObjectWithObjectID } from '.';

export type MultipleGetObjectsResponse<TObject> = {
  /**
   * The list of objects.
   */
  readonly results: ReadonlyArray<TObject & ObjectWithObjectID>;
};
