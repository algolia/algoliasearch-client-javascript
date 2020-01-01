export type FindObjectOptions = {
  /**
   * If the underlying find object options should paginate
   * over a search method.
   */
  readonly paginate?: boolean;

  /**
   * The query used by the underlying find object to
   * find the object.
   */
  readonly query?: string;
};
