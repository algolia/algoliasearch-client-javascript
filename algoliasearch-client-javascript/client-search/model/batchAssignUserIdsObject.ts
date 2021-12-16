/**
 * Assign userID object.
 */
export type BatchAssignUserIdsObject = {
  /**
   * Name of the cluster.
   */
  cluster: string;
  /**
   * UserIDs to assign. Note you cannot move users with this method.
   */
  users: string[];
};
