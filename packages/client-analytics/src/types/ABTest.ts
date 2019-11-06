import { Variant } from '.';

export type ABTest = {
  /**
   * The ab test name.
   */
  readonly name: string;

  /**
   * The ab test list of variants.
   */
  readonly variants: readonly Variant[];

  /**
   * The ab test end date, if any.
   */
  readonly endAt: string;
};
