// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { AuthenticationType } from './authenticationType';

/**
 * The authentication scheme for the URL that will be fetched.
 */
export type PostURLJobAuth = {
  type: AuthenticationType;
  /**
   * The login to use for Basic Auth.
   */
  login: string;
  /**
   * The password to use for Basic Auth.
   */
  password: string;
};
