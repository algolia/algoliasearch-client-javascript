import { ObjectWithObjectID } from '.';

export type GetObjectsResponse<TObject> = {
  readonly results: ReadonlyArray<TObject & ObjectWithObjectID>;
};
