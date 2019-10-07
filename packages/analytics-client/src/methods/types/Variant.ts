import { SearchOptions } from './SearchOptions';

export type Variant = {
  /* eslint-disable functional/prefer-readonly-type */
  index: string;
  trafficPercentage?: number;
  description: string;
  averageClickPostion?: number;
  clickCount?: number;
  clickThroughRate?: number;
  conversionCount?: number;
  conversionRate?: number;
  noResultCount?: number;
  searchCount?: number;
  userCount?: number;
  customSearchParameters: SearchOptions;
};
