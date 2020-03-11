import { ObjectWithObjectID } from '.';

export type MultipleGetObjectsResponse<TObject> = {
  /**
   * The list of objects.
   */
  results: Array<TObject & ObjectWithObjectID>;
};
