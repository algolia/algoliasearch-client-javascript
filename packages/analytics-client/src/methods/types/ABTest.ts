import { Variant } from './Variant';

export type ABTest = {
  /* eslint-disable functional/prefer-readonly-type */
  name: string;
  status: string;
  variants: Variant[];
  endAt: Date | string | null;
  createAt: Date | string | null;
  abTestID: number | null;
  clickSignificance: number | null;
  conversionSignificance: number | null;
};
