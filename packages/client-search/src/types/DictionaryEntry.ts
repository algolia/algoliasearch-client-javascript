export type DictionaryEntry = {
  /**
   * Unique identifier for the rule (format: [A-Za-z0-9_-]+).
   */
  readonly objectID: string;

  readonly language: string;

  readonly word?: string;

  readonly words?: readonly string[];

  readonly decomposition?: readonly string[];

  readonly state?: 'enabled' | 'disabled';
};
