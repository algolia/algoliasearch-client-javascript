// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { AuthenticationType } from './authenticationType';
import type { Platform } from './platform';

/**
 * An authentication is used to login into a Source or a Destination.
 */
export type Authentication = {
  /**
   * The authentication UUID.
   */
  authenticationID: string;

  type: AuthenticationType;

  /**
   * An human readable name describing the object.
   */
  name: string;

  platform?: Platform;

  /**
   * Date of creation (RFC3339 format).
   */
  createdAt: string;

  /**
   * Date of last update (RFC3339 format).
   */
  updatedAt?: string;
};
