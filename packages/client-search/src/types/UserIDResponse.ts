export type UserIDResponse = {
  /**
   * userID of the user.
   */
  readonly userID: string;

  /**
   * Cluster on which the user is assigned
   */
  readonly clusterName: string;

  /**
   * Number of records belonging to the user.
   */
  readonly nbRecords: number;

  /**
   * Data size used by the user.
   */
  readonly dataSize: number;
};
