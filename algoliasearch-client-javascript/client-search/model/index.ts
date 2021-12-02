export type Index = {
  /**
   * Index name.
   */
  name: string;
  /**
   * Index creation date. An empty string means that the index has no records.
   */
  createdAt: Date;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: Date;
  /**
   * Number of records contained in the index.
   */
  entries: number;
  /**
   * Number of bytes of the index in minified format.
   */
  dataSize: number;
  /**
   * Number of bytes of the index binary file.
   */
  fileSize: number;
  /**
   * Last build time.
   */
  lastBuildTimeS: number;
  /**
   * Number of pending indexing operations. This value is deprecated and should not be used.
   */
  numberOfPendingTask?: number;
  /**
   * A boolean which says whether the index has pending tasks. This value is deprecated and should not be used.
   */
  pendingTask: boolean;
  /**
   * Only present if the index is a replica. Contains the name of the related primary index.
   */
  primary?: string;
  /**
   * Only present if the index is a primary index with replicas. Contains the names of all linked replicas.
   */
  replicas?: string[];
};
