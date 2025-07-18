// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { MappingFieldDirective } from './mappingFieldDirective';

/**
 * Describes how a destination object should be resolved by means of applying a set of directives.
 */
export type MappingKitAction = {
  /**
   * ID to uniquely identify this action.
   */
  id?: string | undefined;

  /**
   * Whether this action has any effect.
   */
  enabled: boolean;

  /**
   * Condition which must be satisfied to apply the action. If this evaluates to false, the action is not applied, and the process attempts to apply the next action, if any.
   */
  trigger: string;

  fieldDirectives: Array<MappingFieldDirective>;
};
