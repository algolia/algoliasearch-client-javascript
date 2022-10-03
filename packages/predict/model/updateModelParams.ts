// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ModelStatus } from './modelStatus';

export type UpdateModelParams = {
  /**
   * The model’s instance name.
   */
  name?: string;

  modelAttributes?: string[];

  contentAttributes?: string[];

  modelStatus?: ModelStatus;
};
