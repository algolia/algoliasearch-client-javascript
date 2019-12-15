import { ObjectWithObjectID } from '.';

export type BrowseResponse<TObject> = {
  readonly hits: ReadonlyArray<TObject & ObjectWithObjectID>;
  readonly cursor?: string;
};
