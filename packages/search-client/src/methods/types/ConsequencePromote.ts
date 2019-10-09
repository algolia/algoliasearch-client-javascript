export type ConsequencePromote = {
  /* eslint-disable functional/prefer-readonly-type */

  /** Unique identifier of the object to promote. */
  objectID?: string;

  /** Promoted rank for the object (zero-based). */
  position?: number;
};
