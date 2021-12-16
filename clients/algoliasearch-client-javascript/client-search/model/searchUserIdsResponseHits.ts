import type { SearchUserIdsResponseHighlightResult } from './searchUserIdsResponseHighlightResult';
import type { UserId } from './userId';

export type SearchUserIdsResponseHits = {
  userID: UserId;
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
  _highlightResult: SearchUserIdsResponseHighlightResult;
};
