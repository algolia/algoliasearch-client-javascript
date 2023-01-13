// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ActionType } from './actionType';
import type { TriggerInput } from './triggerInput';

export type TaskCreate = {
  sourceID: string;

  destinationID: string;

  trigger: TriggerInput;

  action: ActionType;

  enabled?: boolean;
};
