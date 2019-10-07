import { ABTest } from './ABTest';

export type GetABTestsResponse = {
  /* eslint-disable functional/prefer-readonly-type */
  count: number;
  total: number;
  abtests: ABTest[] | null;
};
