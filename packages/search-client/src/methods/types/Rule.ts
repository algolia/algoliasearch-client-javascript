import { Condition } from './Condition';
import { Consequence } from './Consequence';
import { TimeRange } from './TimeRange';

export type Rule = {
  /** Unique identifier for the rule (format: [A-Za-z0-9_-]+). */
  readonly objectID: string;

  /** Condition of the rule, expressed using the following variables: pattern, anchoring, context. */
  readonly condition?: Condition;

  /** Consequence of the rule. At least one of the following object must be used: params, promote, hide, userData */
  readonly consequence?: Consequence;

  /** This field is intended for rule management purposes, in particular to ease searching for rules and presenting them to human readers. It is not interpreted by the API. */
  readonly description?: string;

  /** Whether the rule is enabled. Disabled rules remain in the index, but are not applied at query time. */
  readonly enabled?: boolean;

  /**
   * By default, rules are permanently valid. When validity periods are specified, the rule applies only during those periods; it is ignored the rest of the time.
   * The list must not be empty.
   */
  readonly validity?: readonly TimeRange[];
};
