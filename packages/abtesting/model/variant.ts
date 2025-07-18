// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { MetricResult } from './metricResult';
import type { VariantMetadata } from './variantMetadata';

export type Variant = {
  /**
   * Description for this variant.
   */
  description: string;

  /**
   * Estimated number of searches required to achieve the desired statistical significance.  The A/B test configuration must include a `minimumDetectableEffect` setting for this number to be included in the response.
   */
  estimatedSampleSize?: number | undefined;

  /**
   * Index name of the A/B test variant (case-sensitive).
   */
  index: string;

  /**
   * Percentage of search requests each variant receives.
   */
  trafficPercentage: number;

  /**
   * All ABTest metrics that were defined during test creation.
   */
  metrics: Array<MetricResult>;

  metadata?: VariantMetadata | undefined;
};
