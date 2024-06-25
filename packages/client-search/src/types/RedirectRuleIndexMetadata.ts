export type RedirectRuleIndexMetadata = {
  /**
   * Source index for the redirect rule
   */
  readonly source: string;

  /**
   * Destination index for the redirect rule
   */
  readonly dest: string;

  /**
   * Reason for the redirect rule
   */
  readonly reason: string;

  /**
   * Status for the redirect rule
   */
  readonly succeed: boolean;

  /**
   * Data for the redirect rule
   */
  readonly data: {
    /**
     * Rule objectId
     */
    readonly ruleObjectID: string;
  };
};
