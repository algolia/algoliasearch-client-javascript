// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { ABTestConfiguration } from './aBTestConfiguration';
import type { Status } from './status';
import type { Variant } from './variant';

export type ABTest = {
  /**
   * Unique A/B test identifier.
   */
  abTestID: number;

  /**
   * Date and time when the A/B test was last updated, in RFC 3339 format.
   */
  updatedAt: string;

  /**
   * Date and time when the A/B test was created, in RFC 3339 format.
   */
  createdAt: string;

  /**
   * End date and time of the A/B test, in RFC 3339 format.
   */
  endAt: string;

  /**
   * A/B test name.
   */
  name: string;

  status: Status;

  /**
   * A/B test variants.  The first variant is your _control_ index, typically your production index. All of the additional variants are indexes with changed settings that you want to test against the control.
   */
  variants: Array<Variant>;

  configuration?: ABTestConfiguration | undefined;

  /**
   * Unique migrated A/B test identifier.
   */
  migratedAbTestID?: number | undefined;
};
