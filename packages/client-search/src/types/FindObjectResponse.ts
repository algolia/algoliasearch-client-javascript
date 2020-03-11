import { ObjectWithObjectID } from '.';

export type FindObjectResponse<TObject> = {
  /**
   * The found object.
   */
  object: TObject & ObjectWithObjectID;

  /**
   * The position where the object was found.
   */
  position: number;

  /**
   * The page where the object was found.
   */
  page: number;
};
