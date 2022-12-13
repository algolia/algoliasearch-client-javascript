// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { DestinationInput } from './destinationInput';
import type { DestinationType } from './destinationType';

export type Destination = {
  destinationID: string;

  type: DestinationType;

  name: string;

  input: DestinationInput;

  /**
   * Date of creation (RFC3339 format).
   */
  createdAt: string;

  /**
   * Date of last update (RFC3339 format).
   */
  updatedAt?: string;

  authenticationID: string;
};
