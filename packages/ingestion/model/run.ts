// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { RunOutcome } from './runOutcome';
import type { RunProgress } from './runProgress';
import type { RunStatus } from './runStatus';
import type { RunType } from './runType';

export type Run = {
  runID: string;

  appID: string;

  taskID: string;

  status: RunStatus;

  progress?: RunProgress;

  outcome?: RunOutcome;

  type: RunType;

  /**
   * Date of creation (RFC3339 format).
   */
  createdAt: string;

  /**
   * Date of last update (RFC3339 format).
   */
  updatedAt: string;

  /**
   * Date of start (RFC3339 format).
   */
  startedAt?: string;

  /**
   * Date of finish (RFC3339 format).
   */
  finishedAt?: string;
};
