// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SegmentChildConditions } from './segmentChildConditions';
import type { SegmentOperandAffinity } from './segmentOperandAffinity';
import type { SegmentOperandFunnelStage } from './segmentOperandFunnelStage';
import type { SegmentOperandOrderValue } from './segmentOperandOrderValue';
import type { SegmentOperandProperty } from './segmentOperandProperty';

export type SegmentParentConditionOperands =
  | SegmentChildConditions
  | SegmentOperandAffinity
  | SegmentOperandFunnelStage
  | SegmentOperandOrderValue
  | SegmentOperandProperty;
