import { Variant } from './Variant';

export type VariantResponse = Variant & {
  readonly averageClickPosition: number | null;
  readonly clickCount: number | null;
  readonly clickThroughRate: number | null;
  readonly conversionCount: number | null;
  readonly conversionRate: number | null;
  readonly description: string | null;
  readonly noResultCount: number | null;
  readonly searchCount: number | null;
  readonly userCount: number | null;
};
