import { ObjectWithObjectID } from '.';

export type FindObjectResponse<TObject> = {
  /**
   * The found object.
   */
  readonly object: TObject & ObjectWithObjectID;

  /**
   * The position where the object was found.
   */
  readonly position: number;

  /**
   * The page where the object was found.
   */
  readonly page: number;
};
