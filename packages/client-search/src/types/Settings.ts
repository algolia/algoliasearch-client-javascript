export type Settings = {
  /**
   * The complete list of attributes that will be used for searching.
   */
  readonly searchableAttributes?: readonly string[];

  /**
   * @deprecated Use `searchableAttributes` instead.
   */
  readonly attributesToIndex?: readonly string[];

  /**
   * The complete list of attributes that will be used for faceting.
   */
  readonly attributesForFaceting?: readonly string[];

  /**
   * List of attributes that cannot be retrieved at query time.
   */
  readonly unretrievableAttributes?: readonly string[];

  /**
   * Gives control over which attributes to retrieve and which not to retrieve.
   */
  readonly attributesToRetrieve?: readonly string[];

  /**
   * Controls the way results are sorted.
   */
  readonly ranking?: readonly string[];

  /**
   * Specifies the custom ranking criterion.
   */
  readonly customRanking?: readonly string[];

  /**
   * Creates replicas, exact copies of an index.
   */
  readonly replicas?: readonly string[];

  /**
   * @deprecated Use `replicas` instead.
   */
  readonly slaves?: readonly string[];

  /**
   * The primary parameter is automatically added to a replica's settings when the replica is created and cannot be modified.
   *
   * Can not be setted.
   */
  readonly primary?: string;

  /**
   * Maximum number of facet values to return for each facet during a regular search.
   */
  readonly maxValuesPerFacet?: number;

  /**
   * Controls how facet values are sorted.
   */
  readonly sortFacetValuesBy?: 'count' | 'alpha';

  /**
   * List of attributes to highlight.
   */
  readonly attributesToHighlight?: readonly string[];

  /**
   * List of attributes to snippet, with an optional maximum number of words to snippet.
   */
  readonly attributesToSnippet?: readonly string[];

  /**
   * The HTML string to insert before the highlighted parts in all highlight and snippet results.
   */
  readonly highlightPreTag?: string;

  /**
   * The HTML string to insert after the highlighted parts in all highlight and snippet results.
   */
  readonly highlightPostTag?: string;

  /**
   * String used as an ellipsis indicator when a snippet is truncated.
   */
  readonly snippetEllipsisText?: string;

  /**
   * Restrict highlighting and snippeting to items that matched the query.
   */
  readonly restrictHighlightAndSnippetArrays?: boolean;

  /**
   * Set the number of hits per page.
   */
  readonly hitsPerPage?: number;

  /**
   * Set the maximum number of hits accessible via pagination.
   */
  readonly paginationLimitedTo?: number;

  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 1 typo.
   */
  readonly minWordSizefor1Typo?: number;

  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 2 typos.
   */
  readonly minWordSizefor2Typos?: number;

  /**
   * Controls whether typo tolerance is enabled and how it is applied.
   */
  readonly typoTolerance?: string | boolean;

  /**
   * hether to allow typos on numbers (“numeric tokens”) in the query string.
   */
  readonly allowTyposOnNumericTokens?: boolean;

  /**
   * List of attributes on which you want to disable typo tolerance.
   */
  readonly disableTypoToleranceOnAttributes?: readonly string[];

  /**
   * List of words on which you want to disable typo tolerance.
   */
  readonly disableTypoToleranceOnWords?: readonly string[];

  /**
   * Control which separators are indexed.
   */
  readonly separatorsToIndex?: string;

  /**
   * Treats singular, plurals, and other forms of declensions as matching terms.
   */
  readonly ignorePlurals?: readonly string[] | boolean;

  /**
   * Sets the languages to be used by language-specific settings and functionalities such as ignorePlurals, removeStopWords, and CJK word-detection.
   */
  readonly queryLanguages?: readonly string[];

  /**
   * A list of language ISO code.
   */
  readonly indexLanguages?: readonly string[];

  /**
   * Whether rules should be globally enabled.
   */
  readonly enableRules?: boolean;

  /**
   * Controls if and how query words are interpreted as prefixes.
   */
  readonly queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone';

  /**
   * Selects a strategy to remove words from the query when it doesn’t match any hits.
   */
  readonly removeWordsIfNoResults?: 'none' | 'lastWords' | 'firstWords' | 'allOptional';

  /**
   * Enables the advanced query syntax.
   */
  readonly advancedSyntax?: boolean;

  /**
   * AdvancedSyntaxFeatures can be exactPhrase or excludeWords
   */
  readonly advancedSyntaxFeatures?: ReadonlyArray<'exactPhrase' | 'excludeWords'>;

  /**
   * A list of words that should be considered as optional when found in the query.
   */
  readonly optionalWords?: readonly string[];

  /**
   * List of attributes on which you want to disable prefix matching.
   */
  readonly disablePrefixOnAttributes?: readonly string[];

  /**
   * List of attributes on which you want to disable the exact ranking criterion.
   */
  readonly disableExactOnAttributes?: readonly string[];

  /**
   * Controls how the exact ranking criterion is computed when the query contains only one word.
   */
  readonly exactOnSingleWordQuery?: 'attribute' | 'none' | 'word';

  /**
   * List of alternatives that should be considered an exact match by the exact ranking criterion.
   */
  readonly alternativesAsExact?: ReadonlyArray<
    'ignorePlurals' | 'singleWordSynonym' | 'multiWordsSynonym'
  >;

  /**
   * Removes stop (common) words from the query before executing it.
   */
  readonly removeStopWords?: boolean | readonly string[];

  /**
   * List of numeric attributes that can be used as numerical filters.
   */
  readonly numericAttributesForFiltering?: readonly string[];

  /**
   * Enables compression of large integer arrays.
   */
  readonly allowCompressionOfIntegerArray?: boolean;

  /**
   * Name of the de-duplication attribute to be used with the distinct feature.
   */
  readonly attributeForDistinct?: string;

  /**
   * Enables de-duplication or grouping of results.
   */
  readonly distinct?: boolean | number;

  /**
   * Whether to highlight and snippet the original word that matches the synonym or the synonym itself.
   */
  readonly replaceSynonymsInHighlight?: boolean;

  /**
   * Allows proximity to impact which searchable attribute is matched in the attribute ranking stage.
   */
  readonly attributeCriteriaComputedByMinProximity?: boolean;

  /**
   * Precision of the proximity ranking criterion.
   */
  readonly minProximity?: number;

  /**
   * Choose which fields the response will contain. Applies to search and browse queries.
   */
  readonly responseFields?: readonly string[];

  /**
   * Maximum number of facet hits to return during a search for facet values.
   */
  readonly maxFacetHits?: number;

  /**
   * List of attributes on which to do a decomposition of camel case words.
   */
  readonly camelCaseAttributes?: readonly string[];

  /**
   * Specify on which attributes in your index Algolia should apply word-splitting (“decompounding”)
   */
  readonly decompoundedAttributes?: Readonly<Record<string, readonly string[]>>;

  /**
   * Characters that should not be automatically normalized by the search engine.
   */

  readonly keepDiacriticsOnCharacters?: string;

  /**
   * Overrides Algolia's default normalization.
   */
  readonly customNormalization?: Readonly<Record<string, Readonly<Record<string, string>>>>;

  /**
   * Enable personalization for queries by default
   */
  readonly enablePersonalization?: boolean;

  /**
   * Custom userData that could be added to the Settings.
   */
  readonly userData?: any;

  /**
   * Enable word segmentation (also called decompounding) at query time for
   * compatible languages. For example, this turns the Dutch query
   * "spaanplaatbehang" into "spaan plaat behang" to retrieve more relevant
   * results.
   */
  readonly decompoundQuery?: boolean;

  /**
   * Specify on which attributes in your index Algolia should apply Japanese
   * transliteration to make words indexed in Katakana or Kanji searchable in Hiragana.
   */
  readonly attributesToTransliterate?: readonly string[];

  /**
   * The relevancy threshold to apply to search in a virtual index [0-100]. A Bigger
   * value means fewer, but more relevant results, smaller value means more, but
   * less relevant results.
   */
  readonly relevancyStrictness?: number;
};
