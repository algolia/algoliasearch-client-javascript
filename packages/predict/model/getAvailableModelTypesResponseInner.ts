// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { CompatibleSources } from './compatibleSources';
import type { GetAvailableModelTypesResponseInnerDataRequirements } from './getAvailableModelTypesResponseInnerDataRequirements';

export type GetAvailableModelTypesResponseInner = {
  /**
   * Name of the model.
   */
  name: string;

  /**
   * Description of the model.
   */
  type: string;

  compatibleSources: CompatibleSources[];

  dataRequirements: GetAvailableModelTypesResponseInnerDataRequirements;
};
