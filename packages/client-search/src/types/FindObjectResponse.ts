import { ObjectWithObjectID } from '.';

export type FindObjectResponse<TObject> = {
  readonly object: TObject & ObjectWithObjectID;
  readonly position: number;
  readonly page: number;
};
