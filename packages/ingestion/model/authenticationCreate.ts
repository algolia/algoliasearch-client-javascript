// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { AuthInput } from './authInput';
import type { AuthenticationType } from './authenticationType';
import type { Platform } from './platform';

/**
 * The payload when creating an authentication.
 */
export type AuthenticationCreate = {
  type: AuthenticationType;

  /**
   * An human readable name describing the object.
   */
  name: string;

  platform?: Platform;

  input: AuthInput;
};
