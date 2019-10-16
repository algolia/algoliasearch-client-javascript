import { GetABTestResponse } from './GetABTestResponse';

export type GetABTestsResponse = {
  readonly count: number;
  readonly total: number;
  readonly abtests: readonly GetABTestResponse[];
};
