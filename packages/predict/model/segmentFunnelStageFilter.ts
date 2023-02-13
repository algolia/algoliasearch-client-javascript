// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SegmentFilterOperatorBoolean } from './segmentFilterOperatorBoolean';
import type { SegmentFilterProbability } from './segmentFilterProbability';

/**
 * Filter for funnel stage model predictions.
 */
export type SegmentFunnelStageFilter = {
  operator?: SegmentFilterOperatorBoolean;

  value: string;

  probability: SegmentFilterProbability;
};
