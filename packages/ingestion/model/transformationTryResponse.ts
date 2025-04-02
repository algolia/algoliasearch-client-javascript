// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { TransformationError } from './transformationError';

export type TransformationTryResponse = {
  /**
   * The array of stringified records returned by the transformation service.
   */
  payloads: Array<string>;

  error?: TransformationError;
};
