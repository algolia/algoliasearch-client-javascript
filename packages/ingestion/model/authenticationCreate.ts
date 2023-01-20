// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { AuthInput } from './authInput';
import type { AuthenticationType } from './authenticationType';
import type { Platform } from './platform';

export type AuthenticationCreate = {
  type: AuthenticationType;

  name: string;

  platform?: Platform;

  input: AuthInput;
};
