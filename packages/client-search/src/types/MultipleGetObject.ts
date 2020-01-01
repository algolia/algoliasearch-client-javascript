export type MultipleGetObject = {
  /**
   * The index name.
   */
  readonly indexName: string;

  /**
   * The object id.
   */
  readonly objectID: string;

  /**
   * The attributes that should be returned with the object.
   */
  readonly attributesToRetrieve?: readonly string[];
};
