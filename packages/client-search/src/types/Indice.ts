export type Index = {
  /**
   * Index name.
   */
  readonly name: string;

  /**
   * Index creation date. (ISO-8601 format)
   */
  readonly createdAt: string;

  /**
   * Date of last update. (ISO-8601 format)
   */
  readonly updatedAt: string;

  /**
   * Number of records contained in the index
   */
  readonly entries: number;

  /**
   * Number of bytes of the index in minified format.
   */
  readonly dataSize: number;

  /**
   * Number of bytes of the index binary file.
   */
  readonly fileSize: number;

  /**
   * Last build time in seconds.
   */
  readonly lastBuildTimeS: number;

  /**
   * Number of pending indexing operations.
   */
  readonly numberOfPendingTasks: number;

  /**
   * A boolean which says whether the index has pending tasks.
   */
  readonly pendingTask: boolean;

  /**
   * Only present if the index is a replica.
   * Contains the name of the related primary index.
   */
  readonly primary?: string;

  /**
   * Only present if the index is a primary index with replicas.
   * Contains the names of all linked replicas.
   */
  readonly replicas?: readonly string[];
};

/**
 * @deprecated please use `Index` instead of `Indice`
 */
export type Indice = Index;
