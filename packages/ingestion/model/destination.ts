// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { DestinationInput } from './destinationInput';
import type { DestinationType } from './destinationType';

/**
 * Destinations are Algolia resources like indices or event streams.
 */
export type Destination = {
  /**
   * Universally unique identifier (UUID) of a destination resource.
   */
  destinationID: string;

  type: DestinationType;

  /**
   * Descriptive name for the resource.
   */
  name: string;

  /**
   * Owner of the resource.
   */
  owner?: string | null;

  input: DestinationInput;

  /**
   * Date of creation in RFC 3339 format.
   */
  createdAt: string;

  /**
   * Date of last update in RFC 3339 format.
   */
  updatedAt: string;

  /**
   * Universally unique identifier (UUID) of an authentication resource.
   */
  authenticationID?: string;

  transformationIDs?: Array<string>;
};
