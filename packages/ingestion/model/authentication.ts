// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { AuthenticationType } from './authenticationType';
import type { Platform } from './platform';

export type Authentication = {
  authenticationID: string;

  type: AuthenticationType;

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
