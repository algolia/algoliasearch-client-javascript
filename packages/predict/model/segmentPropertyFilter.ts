// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SegmentFilterOperatorNumerical } from './segmentFilterOperatorNumerical';
import type { SegmentPropertyFilterValue } from './segmentPropertyFilterValue';

/**
 * Filter for user profile properties.
 */
export type SegmentPropertyFilter = {
  operator?: SegmentFilterOperatorNumerical;

  value: SegmentPropertyFilterValue;
};
