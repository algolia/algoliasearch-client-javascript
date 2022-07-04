/**
 * Multiple objectIDs to promote as hits.
 */
export type PromoteObjectIDs = {
  /**
   * Array of unique identifiers of the objects to promote.
   */
  objectIDs: string[];
  /**
   * The position to promote the objects to (zero-based). If you pass objectIDs, the objects are placed at this position as a group. For example, if you pass four objectIDs to position 0, the objects take the first four positions.
   */
  position: number;
};
