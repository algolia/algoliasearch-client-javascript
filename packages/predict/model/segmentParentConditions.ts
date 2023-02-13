// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SegmentConditionOperator } from './segmentConditionOperator';
import type { SegmentParentConditionOperands } from './segmentParentConditionOperands';

/**
 * The conditions that define which user profiles are included in the segment.  Can contain operands and a maximum of 1 level of nested conditions.
 */
export type SegmentParentConditions = {
  operator: SegmentConditionOperator;

  operands: SegmentParentConditionOperands[];
};
