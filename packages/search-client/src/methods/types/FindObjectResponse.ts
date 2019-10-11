export type FindObjectResponse<TObject> = {
  readonly object: TObject;
  readonly position: number;
  readonly page: number;
};
