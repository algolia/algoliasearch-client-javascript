export type Condition = {
  /* eslint-disable functional/prefer-readonly-type */

  /** Query patterns are expressed as a string with a specific syntax. A pattern is a sequence of tokens. */
  pattern?: string;

  /** { is | startsWith | endsWith | contains }: Whether the pattern must match the beginning or the end of the query string, or both, or none. */
  anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains';

  /**
   * Rule context (format: [A-Za-z0-9_-]+). When specified, the rule is contextual and applies only when the same context is specified at query time (using the ruleContexts parameter).
   * When absent, the rule is generic and always applies (provided that its other conditions are met, of course).
   */
  context?: string;

  /**
   * If set to true, alternatives make the rule to trigger on synonyms, typos and plurals.
   * Note that setting ignorePlurals to false overrides this parameter.
   */
  alternatives?: boolean;
};
