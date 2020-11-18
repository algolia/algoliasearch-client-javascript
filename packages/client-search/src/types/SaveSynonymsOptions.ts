export type SaveSynonymsOptions = {
  /**
   * If the saved synonyms should be forward to replicas.
   */
  readonly forwardToReplicas?: boolean;

  /**
   * If the existing synonyms should be removed.
   * @deprecated use clearExistingSynonyms
   */
  readonly replaceExistingSynonyms?: boolean;

  /**
   * If the existing synonyms should be removed.
   */
  readonly clearExistingSynonyms?: boolean;
};
