// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SegmentChildConditionOperands } from './segmentChildConditionOperands';
import type { SegmentConditionOperator } from './segmentConditionOperator';

/**
 * Nested segment conditions that only contain operands.
 */
export type SegmentChildConditions = {
  operator: SegmentConditionOperator;

  operands: SegmentChildConditionOperands[];
};
