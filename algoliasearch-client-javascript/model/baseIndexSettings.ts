export type BaseIndexSettings = {
  /**
   * Creates replicas, exact copies of an index.
   */
  replicas?: Array<string>;
  /**
   * Set the maximum number of hits accessible via pagination.
   */
  paginationLimitedTo?: number;
  /**
   * A list of words for which you want to turn off typo tolerance.
   */
  disableTypoToleranceOnWords?: Array<string>;
  /**
   * Specify on which attributes to apply transliteration.
   */
  attributesToTransliterate?: Array<string>;
  /**
   * List of attributes on which to do a decomposition of camel case words.
   */
  camelCaseAttributes?: Array<string>;
  /**
   * Specify on which attributes in your index Algolia should apply word segmentation, also known as decompounding.
   */
  decompoundedAttributes?: { [key: string]: object };
  /**
   * Sets the languages at the index level for language-specific processing such as tokenization and normalization.
   */
  indexLanguages?: Array<string>;
  /**
   * Whether promoted results should match the filters of the current search, except for geographic filters.
   */
  filterPromotes?: boolean;
  /**
   * List of attributes on which you want to disable prefix matching.
   */
  disablePrefixOnAttributes?: Array<string>;
  /**
   * Enables compression of large integer arrays.
   */
  allowCompressionOfIntegerArray?: boolean;
  /**
   * List of numeric attributes that can be used as numerical filters.
   */
  numericAttributesForFiltering?: Array<string>;
  /**
   * Lets you store custom data in your indices.
   */
  userData?: { [key: string]: object };
};
