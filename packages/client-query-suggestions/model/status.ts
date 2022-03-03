export type Status = {
  /**
   * The targeted index name.
   */
  indexName: string;
  /**
   * True if the Query Suggestions index is running.
   */
  isRunning: boolean;
  /**
   * Date and time of the last build.
   */
  lastBuiltAt: string;
};
