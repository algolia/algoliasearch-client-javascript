// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { AuthInput } from './authInput';
import type { AuthenticationType } from './authenticationType';
import type { PlatformType } from './platformType';

export type Authentication = {
  authenticationID: string;

  type: AuthenticationType;

  name: string;

  platform?: PlatformType;

  input: AuthInput;

  /**
   * Date of creation (RFC3339 format).
   */
  createdAt: string;

  /**
   * Date of last update (RFC3339 format).
   */
  updatedAt?: string;
};
