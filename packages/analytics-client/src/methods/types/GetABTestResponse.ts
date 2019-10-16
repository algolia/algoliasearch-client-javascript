import { VariantResponse } from './VariantResponse';

export type GetABTestResponse = {
  readonly abTestID: number;
  readonly clickSignificance: number | null;
  readonly conversionSignificance: number | null;
  readonly createdAt: string;
  readonly endAt: string;
  readonly name: string;
  readonly status: string;
  readonly variants: readonly VariantResponse[];
};
