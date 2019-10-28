import { Log } from './Log';

export type GetLogsResponse = {
  /** List of logs */
  readonly logs: readonly Log[];
};
