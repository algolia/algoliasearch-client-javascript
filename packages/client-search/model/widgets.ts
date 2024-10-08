// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { Banner } from './banner';

/**
 * widgets returned from any rules that are applied to the current search.
 */
export type Widgets = {
  /**
   * banners defined in the merchandising studio for the given search.
   */
  banners?: Array<Banner>;
};
