import type { Predictions } from './predictions';
import type { Properties } from './properties';
import type { Segments } from './segments';

export type FetchUserProfileResponse = {
  user: string;
  predictions?: Predictions;
  properties?: Properties;
  segments?: Segments;
};
