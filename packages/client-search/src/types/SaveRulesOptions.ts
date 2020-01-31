export type SaveRulesOptions = {
  /**
   * If the saved rules should be forward to replicas.
   */
  readonly forwardToReplicas?: boolean;

  /**
   * If the existing rules should be removed.
   */
  readonly clearExistingRules?: boolean;
};
