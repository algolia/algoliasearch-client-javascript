// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ActionType } from './actionType';
import type { Trigger } from './trigger';

export type TaskCreate = {
  sourceID: string;

  destinationID: string;

  trigger: Trigger;

  action: ActionType;

  enabled?: boolean;
};
