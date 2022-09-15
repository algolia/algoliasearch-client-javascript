// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { SegmentStatus } from './segmentStatus';
import type { SegmentType } from './segmentType';

export type Segment = {
  /**
   * The ID of the segment.
   */
  segmentID: string;

  name: string;

  conditions: string;

  segmentStatus: SegmentStatus;

  type: SegmentType;

  errorMessage?: string;
};
