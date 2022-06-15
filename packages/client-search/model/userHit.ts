import type { UserHighlightResult } from './userHighlightResult';

export type UserHit = {
  /**
   * UserID of the user.
   */
  userID: string;
  /**
   * Name of the cluster.
   */
  clusterName: string;
  /**
   * Number of records in the cluster.
   */
  nbRecords: number;
  /**
   * Data size taken by all the users assigned to the cluster.
   */
  dataSize: number;
  /**
   * UserID of the requested user. Same as userID.
   */
  objectID: string;
  _highlightResult: UserHighlightResult;
};
