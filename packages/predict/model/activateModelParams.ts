// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ModelsToRetrieve } from './modelsToRetrieve';

export type ActivateModelParams = {
  type: ModelsToRetrieve;

  /**
   * The model’s instance name.
   */
  name: string;

  /**
   * The data source ID, as returned by the (external) sources API.
   */
  sourceID: string;

  /**
   * The index name.
   */
  index: string;

  modelAttributes?: string[];
};
