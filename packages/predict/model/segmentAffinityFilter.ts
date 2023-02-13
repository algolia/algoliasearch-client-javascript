// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SegmentAffinityFilterValue } from './segmentAffinityFilterValue';
import type { SegmentFilterOperatorNumerical } from './segmentFilterOperatorNumerical';
import type { SegmentFilterProbability } from './segmentFilterProbability';

/**
 * Filter for affinity model predictions.
 */
export type SegmentAffinityFilter = {
  operator?: SegmentFilterOperatorNumerical;

  value: SegmentAffinityFilterValue;

  probability: SegmentFilterProbability;
};
