export type Indice = {
  /**
   * Index name.
   */
  readonly name: string;

  /**
   * Index creation date.
   */
  readonly createdAt: number;

  /**
   * Date of last update.
   */
  readonly updatedAt: number;

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
  readonly lastBuildTimes: number;

  /**
   * Number of pending indexing operations.
   */
  readonly numberOfPendingTasks: number;

  /**
   * A boolean which says whether the index has pending tasks.
   */
  readonly pendingTask: boolean;
};
