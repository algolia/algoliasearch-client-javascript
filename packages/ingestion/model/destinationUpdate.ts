// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { DestinationInput } from './destinationInput';
import type { DestinationType } from './destinationType';

/**
 * Payload to partialy update a Destination.
 */
export type DestinationUpdate = {
  type?: DestinationType;

  /**
   * An human readable name describing the object.
   */
  name?: string;

  input?: DestinationInput;

  authenticationID?: string;
};
