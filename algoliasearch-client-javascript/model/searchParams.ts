import { RequestFile } from './models';

export class SearchParams {
  /**
   * The text to search in the index.
   */
  'query': string;
  /**
   * Overrides the query parameter and performs a more generic search that can be used to find \"similar\" results.
   */
  'similarQuery'?: string;
  /**
   * The complete list of attributes used for searching.
   */
  'searchableAttributes'?: Array<string>;
  /**
   * The complete list of attributes that will be used for faceting.
   */
  'attributesForFaceting'?: Array<string>;
  /**
   * List of attributes that can’t be retrieved at query time.
   */
  'unretrievableAttributes'?: Array<string>;
  /**
   * This parameter controls which attributes to retrieve and which not to retrieve.
   */
  'attributesToRetrieve'?: Array<string>;
  /**
   * Restricts a given query to look in only a subset of your searchable attributes.
   */
  'restrictSearchableAttributes'?: Array<string>;
  /**
   * Controls how Algolia should sort your results.
   */
  'ranking'?: Array<string>;
  /**
   * Specifies the custom ranking criterion.
   */
  'customRanking'?: Array<string>;
  /**
   * Controls the relevancy threshold below which less relevant results aren’t included in the results.
   */
  'relevancyStrictness'?: number;
  /**
   * Filter the query with numeric, facet and/or tag filters.
   */
  'filters'?: string;
  /**
   * Filter hits by facet value.
   */
  'facetFilters'?: Array<string>;
  /**
   * Create filters for ranking purposes, where records that match the filter are ranked higher, or lower in the case of a negative optional filter.
   */
  'optionalFilters'?: Array<string>;
  /**
   * Filter on numeric attributes.
   */
  'numericFilters'?: Array<string>;
  /**
   * Filter hits by tags.
   */
  'tagFilters'?: Array<string>;
  /**
   * Determines how to calculate the total score for filtering.
   */
  'sumOrFiltersScores'?: boolean;
  /**
   * Retrieve facets and their facet values.
   */
  'facets'?: Array<string>;
  /**
   * Maximum number of facet values to return for each facet during a regular search.
   */
  'maxValuesPerFacet'?: number;
  /**
   * Force faceting to be applied after de-duplication (via the Distinct setting).
   */
  'facetingAfterDistinct'?: boolean;
  /**
   * Controls how facet values are fetched.
   */
  'sortFacetValuesBy'?: string;
  /**
   * List of attributes to highlight.
   */
  'attributesToHighlight'?: Array<string>;
  /**
   * List of attributes to snippet, with an optional maximum number of words to snippet.
   */
  'attributesToSnippet'?: Array<string>;
  /**
   * The HTML string to insert before the highlighted parts in all highlight and snippet results.
   */
  'highlightPreTag'?: string;
  /**
   * The HTML string to insert after the highlighted parts in all highlight and snippet results.
   */
  'highlightPostTag'?: string;
  /**
   * String used as an ellipsis indicator when a snippet is truncated.
   */
  'snippetEllipsisText'?: string;
  /**
   * Restrict highlighting and snippeting to items that matched the query.
   */
  'restrictHighlightAndSnippetArrays'?: boolean;
  /**
   * Specify the page to retrieve.
   */
  'page'?: number;
  /**
   * Set the number of hits per page.
   */
  'hitsPerPage'?: number;
  /**
   * Specify the offset of the first hit to return.
   */
  'offset'?: number;
  /**
   * Set the number of hits to retrieve (used only with offset).
   */
  'length'?: number;
  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 1 typo.
   */
  'minWordSizefor1Typo'?: number;
  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 2 typos.
   */
  'minWordSizefor2Typos'?: number;
  /**
   * Controls whether typo tolerance is enabled and how it is applied.
   */
  'typoTolerance'?: SearchParams.TypoToleranceEnum;
  /**
   * Whether to allow typos on numbers (“numeric tokens”) in the query string.
   */
  'allowTyposOnNumericTokens'?: boolean;
  /**
   * List of attributes on which you want to disable typo tolerance.
   */
  'disableTypoToleranceOnAttributes'?: Array<string>;
  /**
   * Control which separators are indexed.
   */
  'separatorsToIndex'?: string;
  /**
   * Search for entries around a central geolocation, enabling a geo search within a circular area.
   */
  'aroundLatLng'?: string;
  /**
   * Search for entries around a given location automatically computed from the requester’s IP address.
   */
  'aroundLatLngViaIP'?: boolean;
  'aroundRadius'?: number | string;
  /**
   * Precision of geo search (in meters), to add grouping by geo location to the ranking formula.
   */
  'aroundPrecision'?: number;
  /**
   * Minimum radius (in meters) used for a geo search when aroundRadius is not set.
   */
  'minimumAroundRadius'?: number;
  /**
   * Search inside a rectangular area (in geo coordinates).
   */
  'insideBoundingBox'?: Array<number>;
  /**
   * Search inside a polygon (in geo coordinates).
   */
  'insidePolygon'?: Array<number>;
  /**
   * Treats singular, plurals, and other forms of declensions as matching terms.
   */
  'ignorePlurals'?: string;
  /**
   * Removes stop (common) words from the query before executing it.
   */
  'removeStopWords'?: string;
  /**
   * List of characters that the engine shouldn’t automatically normalize.
   */
  'keepDiacriticsOnCharacters'?: string;
  /**
   * Sets the languages to be used by language-specific settings and functionalities such as ignorePlurals, removeStopWords, and CJK word-detection.
   */
  'queryLanguages'?: Array<string>;
  /**
   * This parameter changes the default values of certain parameters and settings that work best for a natural language query, such as ignorePlurals, removeStopWords, removeWordsIfNoResults, analyticsTags and ruleContexts. These parameters and settings work well together when the query is formatted in natural language instead of keywords, for example when your user performs a voice search.
   */
  'naturalLanguages'?: Array<string>;
  /**
   * Splits compound words into their composing atoms in the query.
   */
  'decompoundQuery'?: boolean;
  /**
   * Whether Rules should be globally enabled.
   */
  'enableRules'?: boolean;
  /**
   * Enables contextual rules.
   */
  'ruleContexts'?: Array<string>;
  /**
   * Enable the Personalization feature.
   */
  'enablePersonalization'?: boolean;
  /**
   * Define the impact of the Personalization feature.
   */
  'personalizationImpact'?: number;
  /**
   * Associates a certain user token with the current search.
   */
  'userToken'?: string;
  /**
   * Controls if and how query words are interpreted as prefixes.
   */
  'queryType'?: SearchParams.QueryTypeEnum;
  /**
   * Selects a strategy to remove words from the query when it doesn’t match any hits.
   */
  'removeWordsIfNoResults'?: SearchParams.RemoveWordsIfNoResultsEnum;
  /**
   * Enables the advanced query syntax.
   */
  'advancedSyntax'?: boolean;
  /**
   * A list of words that should be considered as optional when found in the query.
   */
  'optionalWords'?: Array<string>;
  /**
   * List of attributes on which you want to disable the exact ranking criterion.
   */
  'disableExactOnAttributes'?: Array<string>;
  /**
   * Controls how the exact ranking criterion is computed when the query contains only one word.
   */
  'exactOnSingleWordQuery'?: SearchParams.ExactOnSingleWordQueryEnum;
  /**
   * List of alternatives that should be considered an exact match by the exact ranking criterion.
   */
  'alternativesAsExact'?: Array<SearchParams.AlternativesAsExactEnum>;
  /**
   * Allows you to specify which advanced syntax features are active when ‘advancedSyntax’ is enabled.
   */
  'advancedSyntaxFeatures'?: Array<SearchParams.AdvancedSyntaxFeaturesEnum>;
  /**
   * Enables de-duplication or grouping of results.
   */
  'distinct'?: number;
  /**
   * Retrieve detailed ranking information.
   */
  'getRankingInfo'?: boolean;
  /**
   * Enable the Click Analytics feature.
   */
  'clickAnalytics'?: boolean;
  /**
   * Whether the current query will be taken into account in the Analytics.
   */
  'analytics'?: boolean;
  /**
   * List of tags to apply to the query for analytics purposes.
   */
  'analyticsTags'?: Array<string>;
  /**
   * Whether to take into account an index’s synonyms for a particular search.
   */
  'synonyms'?: boolean;
  /**
   * Whether to highlight and snippet the original word that matches the synonym or the synonym itself.
   */
  'replaceSynonymsInHighlight'?: boolean;
  /**
   * Precision of the proximity ranking criterion.
   */
  'minProximity'?: number;
  /**
   * Choose which fields to return in the API response. This parameters applies to search and browse queries.
   */
  'responseFields'?: Array<string>;
  /**
   * Maximum number of facet hits to return during a search for facet values.
   */
  'maxFacetHits'?: number;
  /**
   * Whether to include or exclude a query from the processing-time percentile computation.
   */
  'percentileComputation'?: boolean;
  /**
   * When attribute is ranked above proximity in your ranking formula, proximity is used to select which searchable attribute is matched in the attribute ranking stage.
   */
  'attributeCriteriaComputedByMinProximity'?: boolean;
  /**
   * Whether this search should participate in running AB tests.
   */
  'enableABTest'?: boolean;
  /**
   * Whether this search should use AI Re-Ranking.
   */
  'enableReRanking'?: boolean;
  /**
   * Content defining how the search interface should be rendered. Can be set via the settings for a default value and can be overridden via rules.
   */
  'renderingContent'?: object;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'query',
      baseName: 'query',
      type: 'string',
    },
    {
      name: 'similarQuery',
      baseName: 'similarQuery',
      type: 'string',
    },
    {
      name: 'searchableAttributes',
      baseName: 'searchableAttributes',
      type: 'Array<string>',
    },
    {
      name: 'attributesForFaceting',
      baseName: 'attributesForFaceting',
      type: 'Array<string>',
    },
    {
      name: 'unretrievableAttributes',
      baseName: 'unretrievableAttributes',
      type: 'Array<string>',
    },
    {
      name: 'attributesToRetrieve',
      baseName: 'attributesToRetrieve',
      type: 'Array<string>',
    },
    {
      name: 'restrictSearchableAttributes',
      baseName: 'restrictSearchableAttributes',
      type: 'Array<string>',
    },
    {
      name: 'ranking',
      baseName: 'ranking',
      type: 'Array<string>',
    },
    {
      name: 'customRanking',
      baseName: 'customRanking',
      type: 'Array<string>',
    },
    {
      name: 'relevancyStrictness',
      baseName: 'relevancyStrictness',
      type: 'number',
    },
    {
      name: 'filters',
      baseName: 'filters',
      type: 'string',
    },
    {
      name: 'facetFilters',
      baseName: 'facetFilters',
      type: 'Array<string>',
    },
    {
      name: 'optionalFilters',
      baseName: 'optionalFilters',
      type: 'Array<string>',
    },
    {
      name: 'numericFilters',
      baseName: 'numericFilters',
      type: 'Array<string>',
    },
    {
      name: 'tagFilters',
      baseName: 'tagFilters',
      type: 'Array<string>',
    },
    {
      name: 'sumOrFiltersScores',
      baseName: 'sumOrFiltersScores',
      type: 'boolean',
    },
    {
      name: 'facets',
      baseName: 'facets',
      type: 'Array<string>',
    },
    {
      name: 'maxValuesPerFacet',
      baseName: 'maxValuesPerFacet',
      type: 'number',
    },
    {
      name: 'facetingAfterDistinct',
      baseName: 'facetingAfterDistinct',
      type: 'boolean',
    },
    {
      name: 'sortFacetValuesBy',
      baseName: 'sortFacetValuesBy',
      type: 'string',
    },
    {
      name: 'attributesToHighlight',
      baseName: 'attributesToHighlight',
      type: 'Array<string>',
    },
    {
      name: 'attributesToSnippet',
      baseName: 'attributesToSnippet',
      type: 'Array<string>',
    },
    {
      name: 'highlightPreTag',
      baseName: 'highlightPreTag',
      type: 'string',
    },
    {
      name: 'highlightPostTag',
      baseName: 'highlightPostTag',
      type: 'string',
    },
    {
      name: 'snippetEllipsisText',
      baseName: 'snippetEllipsisText',
      type: 'string',
    },
    {
      name: 'restrictHighlightAndSnippetArrays',
      baseName: 'restrictHighlightAndSnippetArrays',
      type: 'boolean',
    },
    {
      name: 'page',
      baseName: 'page',
      type: 'number',
    },
    {
      name: 'hitsPerPage',
      baseName: 'hitsPerPage',
      type: 'number',
    },
    {
      name: 'offset',
      baseName: 'offset',
      type: 'number',
    },
    {
      name: 'length',
      baseName: 'length',
      type: 'number',
    },
    {
      name: 'minWordSizefor1Typo',
      baseName: 'minWordSizefor1Typo',
      type: 'number',
    },
    {
      name: 'minWordSizefor2Typos',
      baseName: 'minWordSizefor2Typos',
      type: 'number',
    },
    {
      name: 'typoTolerance',
      baseName: 'typoTolerance',
      type: 'SearchParams.TypoToleranceEnum',
    },
    {
      name: 'allowTyposOnNumericTokens',
      baseName: 'allowTyposOnNumericTokens',
      type: 'boolean',
    },
    {
      name: 'disableTypoToleranceOnAttributes',
      baseName: 'disableTypoToleranceOnAttributes',
      type: 'Array<string>',
    },
    {
      name: 'separatorsToIndex',
      baseName: 'separatorsToIndex',
      type: 'string',
    },
    {
      name: 'aroundLatLng',
      baseName: 'aroundLatLng',
      type: 'string',
    },
    {
      name: 'aroundLatLngViaIP',
      baseName: 'aroundLatLngViaIP',
      type: 'boolean',
    },
    {
      name: 'aroundRadius',
      baseName: 'aroundRadius',
      type: 'number | string',
    },
    {
      name: 'aroundPrecision',
      baseName: 'aroundPrecision',
      type: 'number',
    },
    {
      name: 'minimumAroundRadius',
      baseName: 'minimumAroundRadius',
      type: 'number',
    },
    {
      name: 'insideBoundingBox',
      baseName: 'insideBoundingBox',
      type: 'Array<number>',
    },
    {
      name: 'insidePolygon',
      baseName: 'insidePolygon',
      type: 'Array<number>',
    },
    {
      name: 'ignorePlurals',
      baseName: 'ignorePlurals',
      type: 'string',
    },
    {
      name: 'removeStopWords',
      baseName: 'removeStopWords',
      type: 'string',
    },
    {
      name: 'keepDiacriticsOnCharacters',
      baseName: 'keepDiacriticsOnCharacters',
      type: 'string',
    },
    {
      name: 'queryLanguages',
      baseName: 'queryLanguages',
      type: 'Array<string>',
    },
    {
      name: 'naturalLanguages',
      baseName: 'naturalLanguages',
      type: 'Array<string>',
    },
    {
      name: 'decompoundQuery',
      baseName: 'decompoundQuery',
      type: 'boolean',
    },
    {
      name: 'enableRules',
      baseName: 'enableRules',
      type: 'boolean',
    },
    {
      name: 'ruleContexts',
      baseName: 'ruleContexts',
      type: 'Array<string>',
    },
    {
      name: 'enablePersonalization',
      baseName: 'enablePersonalization',
      type: 'boolean',
    },
    {
      name: 'personalizationImpact',
      baseName: 'personalizationImpact',
      type: 'number',
    },
    {
      name: 'userToken',
      baseName: 'userToken',
      type: 'string',
    },
    {
      name: 'queryType',
      baseName: 'queryType',
      type: 'SearchParams.QueryTypeEnum',
    },
    {
      name: 'removeWordsIfNoResults',
      baseName: 'removeWordsIfNoResults',
      type: 'SearchParams.RemoveWordsIfNoResultsEnum',
    },
    {
      name: 'advancedSyntax',
      baseName: 'advancedSyntax',
      type: 'boolean',
    },
    {
      name: 'optionalWords',
      baseName: 'optionalWords',
      type: 'Array<string>',
    },
    {
      name: 'disableExactOnAttributes',
      baseName: 'disableExactOnAttributes',
      type: 'Array<string>',
    },
    {
      name: 'exactOnSingleWordQuery',
      baseName: 'exactOnSingleWordQuery',
      type: 'SearchParams.ExactOnSingleWordQueryEnum',
    },
    {
      name: 'alternativesAsExact',
      baseName: 'alternativesAsExact',
      type: 'Array<SearchParams.AlternativesAsExactEnum>',
    },
    {
      name: 'advancedSyntaxFeatures',
      baseName: 'advancedSyntaxFeatures',
      type: 'Array<SearchParams.AdvancedSyntaxFeaturesEnum>',
    },
    {
      name: 'distinct',
      baseName: 'distinct',
      type: 'number',
    },
    {
      name: 'getRankingInfo',
      baseName: 'getRankingInfo',
      type: 'boolean',
    },
    {
      name: 'clickAnalytics',
      baseName: 'clickAnalytics',
      type: 'boolean',
    },
    {
      name: 'analytics',
      baseName: 'analytics',
      type: 'boolean',
    },
    {
      name: 'analyticsTags',
      baseName: 'analyticsTags',
      type: 'Array<string>',
    },
    {
      name: 'synonyms',
      baseName: 'synonyms',
      type: 'boolean',
    },
    {
      name: 'replaceSynonymsInHighlight',
      baseName: 'replaceSynonymsInHighlight',
      type: 'boolean',
    },
    {
      name: 'minProximity',
      baseName: 'minProximity',
      type: 'number',
    },
    {
      name: 'responseFields',
      baseName: 'responseFields',
      type: 'Array<string>',
    },
    {
      name: 'maxFacetHits',
      baseName: 'maxFacetHits',
      type: 'number',
    },
    {
      name: 'percentileComputation',
      baseName: 'percentileComputation',
      type: 'boolean',
    },
    {
      name: 'attributeCriteriaComputedByMinProximity',
      baseName: 'attributeCriteriaComputedByMinProximity',
      type: 'boolean',
    },
    {
      name: 'enableABTest',
      baseName: 'enableABTest',
      type: 'boolean',
    },
    {
      name: 'enableReRanking',
      baseName: 'enableReRanking',
      type: 'boolean',
    },
    {
      name: 'renderingContent',
      baseName: 'renderingContent',
      type: 'object',
    },
  ];

  static getAttributeTypeMap() {
    return SearchParams.attributeTypeMap;
  }
}

export namespace SearchParams {
  export enum TypoToleranceEnum {
    True = <any>'true',
    False = <any>'false',
    Min = <any>'min',
    Strict = <any>'strict',
  }
  export enum QueryTypeEnum {
    PrefixLast = <any>'prefixLast',
    PrefixAll = <any>'prefixAll',
    PrefixNone = <any>'prefixNone',
  }
  export enum RemoveWordsIfNoResultsEnum {
    None = <any>'none',
    LastWords = <any>'lastWords',
    FirstWords = <any>'firstWords',
    AllOptional = <any>'allOptional',
  }
  export enum ExactOnSingleWordQueryEnum {
    Attribute = <any>'attribute',
    None = <any>'none',
    Word = <any>'word',
  }
  export enum AlternativesAsExactEnum {
    IgnorePlurals = <any>'ignorePlurals',
    SingleWordSynonym = <any>'singleWordSynonym',
    MultiWordsSynonym = <any>'multiWordsSynonym',
  }
  export enum AdvancedSyntaxFeaturesEnum {
    ExactPhrase = <any>'exactPhrase',
    ExcludeWords = <any>'excludeWords',
  }
}
