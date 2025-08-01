// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { DestinationInput } from './destinationInput';
import type { DestinationType } from './destinationType';

/**
 * API request body for updating a destination.
 */
export type DestinationUpdate = {
  type?: DestinationType | undefined;

  /**
   * Descriptive name for the resource.
   */
  name?: string | undefined;

  input?: DestinationInput | undefined;

  /**
   * Universally unique identifier (UUID) of an authentication resource.
   */
  authenticationID?: string | undefined;

  transformationIDs?: Array<string> | undefined;
};
