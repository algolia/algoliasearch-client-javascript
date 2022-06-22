/**
 * A userID.
 */
export type UserId = {
  /**
   * UserID of the user.
   */
  userID: string;
  /**
   * Cluster on which the user is assigned.
   */
  clusterName: string;
  /**
   * Number of records belonging to the user.
   */
  nbRecords: number;
  /**
   * Data size used by the user.
   */
  dataSize: number;
};
