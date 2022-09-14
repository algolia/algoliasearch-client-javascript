// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { Status } from './status';

export type UpdateModelParams = {
  /**
   * The model’s instance name.
   */
  name?: string;

  affinities?: string[];

  contentAttributes?: string[];

  status?: Status;
};
