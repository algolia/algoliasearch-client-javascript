export type ConsequencePromote = {
  /** Unique identifier of the object to promote. */
  readonly objectID?: string;

  /** Promoted rank for the object (zero-based). */
  readonly position?: number;
};
