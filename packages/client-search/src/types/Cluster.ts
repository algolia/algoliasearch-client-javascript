export type Cluster = {
  /**
   * The cluster name
   */
  readonly clusterName: string;

  /**
   * Number of records in the cluster.
   */
  readonly nbRecords: number;

  /**
   * Number of users assign to the cluster.
   */
  readonly nbUserIDs: number;

  /**
   * Data size taken by all the users assigned to the cluster.
   */
  readonly dataSize: number;
};
