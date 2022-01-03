/**
 * GetObject operation on an index.
 */
export type MultipleGetObjectsObject = {
  /**
   * List of attributes to retrieve. By default, all retrievable attributes are returned.
   */
  attributesToRetrieve?: string[];
  /**
   * ID of the object within that index.
   */
  objectID: string;
  /**
   * Name of the index containing the object.
   */
  indexName: string;
};
