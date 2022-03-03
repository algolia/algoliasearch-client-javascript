import type { Condition } from './condition';
import type { Consequence } from './consequence';
import type { TimeRange } from './timeRange';

/**
 * Rule object.
 */
export type Rule = {
  /**
   * Unique identifier of the object.
   */
  objectID: string;
  /**
   * A list of conditions that should apply to activate a Rule. You can use up to 25 conditions per Rule.
   */
  conditions?: Condition[];
  consequence: Consequence;
  /**
   * This field is intended for Rule management purposes, in particular to ease searching for Rules and presenting them to human readers. It\'s not interpreted by the API.
   */
  description?: string;
  /**
   * Whether the Rule is enabled. Disabled Rules remain in the index, but aren\'t applied at query time.
   */
  enabled?: boolean;
  /**
   * By default, Rules are permanently valid. When validity periods are specified, the Rule applies only during those periods; it\'s ignored the rest of the time. The list must not be empty.
   */
  validity?: TimeRange[];
};
