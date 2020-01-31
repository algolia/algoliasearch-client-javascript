import { Log } from '.';

export type GetLogsResponse = {
  /**
   * The list of logs.
   */
  readonly logs: readonly Log[];
};
