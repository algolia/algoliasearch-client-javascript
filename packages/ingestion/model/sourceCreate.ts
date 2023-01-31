// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SourceInput } from './sourceInput';
import type { SourceType } from './sourceType';

export type SourceCreate = {
  type: SourceType;

  name: string;

  input: SourceInput;

  /**
   * The authentication UUID.
   */
  authenticationID: string;
};
