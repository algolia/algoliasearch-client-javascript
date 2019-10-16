import { SearchOptions } from '../../../../search-client/src/methods/types/SearchOptions';

export type Variant = {
  /* eslint-disable functional/prefer-readonly-type */
  index: string;
  trafficPercentage: number;
  description?: string;
  customSearchParameters?: SearchOptions;
};
