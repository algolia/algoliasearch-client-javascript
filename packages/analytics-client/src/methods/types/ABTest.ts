import { Variant } from './Variant';

export type ABTest = {
  /* eslint-disable functional/prefer-readonly-type */
  name: string;
  endAt: string;
  variants: Variant[];
};
