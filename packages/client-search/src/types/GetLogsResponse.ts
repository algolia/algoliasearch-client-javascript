import { Log } from '.';

export type GetLogsResponse = {
  /** List of logs */
  readonly logs: readonly Log[];
};
