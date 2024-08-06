// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

/**
 * Range object with lower and upper values in meters to define custom ranges.
 */
export type Range = {
  /**
   * Lower boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.
   */
  from?: number;

  /**
   * Upper boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.
   */
  value?: number;
};