// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { Predictions } from './predictions';
import type { Properties } from './properties';
import type { Segments } from './segments';

export type FetchUserProfileResponse = {
  user: string;
  predictions?: Predictions;
  properties?: Properties;
  segments?: Segments;
};
