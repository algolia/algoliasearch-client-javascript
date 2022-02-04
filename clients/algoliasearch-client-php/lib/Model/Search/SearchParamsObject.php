<?php

namespace Algolia\AlgoliaSearch\Model\Search;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * SearchParamsObject Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class SearchParamsObject implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'searchParamsObject';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'similarQuery' => 'string',
        'filters' => 'string',
        'facetFilters' => 'string[]',
        'optionalFilters' => 'string[]',
        'numericFilters' => 'string[]',
        'tagFilters' => 'string[]',
        'sumOrFiltersScores' => 'bool',
        'facets' => 'string[]',
        'maxValuesPerFacet' => 'int',
        'facetingAfterDistinct' => 'bool',
        'sortFacetValuesBy' => 'string',
        'page' => 'int',
        'offset' => 'int',
        'length' => 'int',
        'aroundLatLng' => 'string',
        'aroundLatLngViaIP' => 'bool',
        'aroundRadius' => 'OneOfIntegerString',
        'aroundPrecision' => 'int',
        'minimumAroundRadius' => 'int',
        'insideBoundingBox' => 'float[]',
        'insidePolygon' => 'float[]',
        'naturalLanguages' => 'string[]',
        'ruleContexts' => 'string[]',
        'personalizationImpact' => 'int',
        'userToken' => 'string',
        'getRankingInfo' => 'bool',
        'clickAnalytics' => 'bool',
        'analytics' => 'bool',
        'analyticsTags' => 'string[]',
        'percentileComputation' => 'bool',
        'enableABTest' => 'bool',
        'enableReRanking' => 'bool',
        'query' => 'string',
        'searchableAttributes' => 'string[]',
        'attributesForFaceting' => 'string[]',
        'unretrievableAttributes' => 'string[]',
        'attributesToRetrieve' => 'string[]',
        'restrictSearchableAttributes' => 'string[]',
        'ranking' => 'string[]',
        'customRanking' => 'string[]',
        'relevancyStrictness' => 'int',
        'attributesToHighlight' => 'string[]',
        'attributesToSnippet' => 'string[]',
        'highlightPreTag' => 'string',
        'highlightPostTag' => 'string',
        'snippetEllipsisText' => 'string',
        'restrictHighlightAndSnippetArrays' => 'bool',
        'hitsPerPage' => 'int',
        'minWordSizefor1Typo' => 'int',
        'minWordSizefor2Typos' => 'int',
        'typoTolerance' => 'string',
        'allowTyposOnNumericTokens' => 'bool',
        'disableTypoToleranceOnAttributes' => 'string[]',
        'separatorsToIndex' => 'string',
        'ignorePlurals' => 'string',
        'removeStopWords' => 'string',
        'keepDiacriticsOnCharacters' => 'string',
        'queryLanguages' => 'string[]',
        'decompoundQuery' => 'bool',
        'enableRules' => 'bool',
        'enablePersonalization' => 'bool',
        'queryType' => 'string',
        'removeWordsIfNoResults' => 'string',
        'advancedSyntax' => 'bool',
        'optionalWords' => 'string[]',
        'disableExactOnAttributes' => 'string[]',
        'exactOnSingleWordQuery' => 'string',
        'alternativesAsExact' => 'string[]',
        'advancedSyntaxFeatures' => 'string[]',
        'distinct' => 'int',
        'synonyms' => 'bool',
        'replaceSynonymsInHighlight' => 'bool',
        'minProximity' => 'int',
        'responseFields' => 'string[]',
        'maxFacetHits' => 'int',
        'attributeCriteriaComputedByMinProximity' => 'bool',
        'renderingContent' => 'object',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'similarQuery' => null,
        'filters' => null,
        'facetFilters' => null,
        'optionalFilters' => null,
        'numericFilters' => null,
        'tagFilters' => null,
        'sumOrFiltersScores' => null,
        'facets' => null,
        'maxValuesPerFacet' => null,
        'facetingAfterDistinct' => null,
        'sortFacetValuesBy' => null,
        'page' => null,
        'offset' => null,
        'length' => null,
        'aroundLatLng' => null,
        'aroundLatLngViaIP' => null,
        'aroundRadius' => null,
        'aroundPrecision' => null,
        'minimumAroundRadius' => null,
        'insideBoundingBox' => null,
        'insidePolygon' => null,
        'naturalLanguages' => null,
        'ruleContexts' => null,
        'personalizationImpact' => null,
        'userToken' => null,
        'getRankingInfo' => null,
        'clickAnalytics' => null,
        'analytics' => null,
        'analyticsTags' => null,
        'percentileComputation' => null,
        'enableABTest' => null,
        'enableReRanking' => null,
        'query' => null,
        'searchableAttributes' => null,
        'attributesForFaceting' => null,
        'unretrievableAttributes' => null,
        'attributesToRetrieve' => null,
        'restrictSearchableAttributes' => null,
        'ranking' => null,
        'customRanking' => null,
        'relevancyStrictness' => null,
        'attributesToHighlight' => null,
        'attributesToSnippet' => null,
        'highlightPreTag' => null,
        'highlightPostTag' => null,
        'snippetEllipsisText' => null,
        'restrictHighlightAndSnippetArrays' => null,
        'hitsPerPage' => null,
        'minWordSizefor1Typo' => null,
        'minWordSizefor2Typos' => null,
        'typoTolerance' => null,
        'allowTyposOnNumericTokens' => null,
        'disableTypoToleranceOnAttributes' => null,
        'separatorsToIndex' => null,
        'ignorePlurals' => null,
        'removeStopWords' => null,
        'keepDiacriticsOnCharacters' => null,
        'queryLanguages' => null,
        'decompoundQuery' => null,
        'enableRules' => null,
        'enablePersonalization' => null,
        'queryType' => null,
        'removeWordsIfNoResults' => null,
        'advancedSyntax' => null,
        'optionalWords' => null,
        'disableExactOnAttributes' => null,
        'exactOnSingleWordQuery' => null,
        'alternativesAsExact' => null,
        'advancedSyntaxFeatures' => null,
        'distinct' => null,
        'synonyms' => null,
        'replaceSynonymsInHighlight' => null,
        'minProximity' => null,
        'responseFields' => null,
        'maxFacetHits' => null,
        'attributeCriteriaComputedByMinProximity' => null,
        'renderingContent' => null,
    ];

    /**
     * Array of property to type mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPITypes()
    {
        return self::$openAPITypes;
    }

    /**
     * Array of property to format mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPIFormats()
    {
        return self::$openAPIFormats;
    }

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @var string[]
     */
    protected static $attributeMap = [
        'similarQuery' => 'similarQuery',
        'filters' => 'filters',
        'facetFilters' => 'facetFilters',
        'optionalFilters' => 'optionalFilters',
        'numericFilters' => 'numericFilters',
        'tagFilters' => 'tagFilters',
        'sumOrFiltersScores' => 'sumOrFiltersScores',
        'facets' => 'facets',
        'maxValuesPerFacet' => 'maxValuesPerFacet',
        'facetingAfterDistinct' => 'facetingAfterDistinct',
        'sortFacetValuesBy' => 'sortFacetValuesBy',
        'page' => 'page',
        'offset' => 'offset',
        'length' => 'length',
        'aroundLatLng' => 'aroundLatLng',
        'aroundLatLngViaIP' => 'aroundLatLngViaIP',
        'aroundRadius' => 'aroundRadius',
        'aroundPrecision' => 'aroundPrecision',
        'minimumAroundRadius' => 'minimumAroundRadius',
        'insideBoundingBox' => 'insideBoundingBox',
        'insidePolygon' => 'insidePolygon',
        'naturalLanguages' => 'naturalLanguages',
        'ruleContexts' => 'ruleContexts',
        'personalizationImpact' => 'personalizationImpact',
        'userToken' => 'userToken',
        'getRankingInfo' => 'getRankingInfo',
        'clickAnalytics' => 'clickAnalytics',
        'analytics' => 'analytics',
        'analyticsTags' => 'analyticsTags',
        'percentileComputation' => 'percentileComputation',
        'enableABTest' => 'enableABTest',
        'enableReRanking' => 'enableReRanking',
        'query' => 'query',
        'searchableAttributes' => 'searchableAttributes',
        'attributesForFaceting' => 'attributesForFaceting',
        'unretrievableAttributes' => 'unretrievableAttributes',
        'attributesToRetrieve' => 'attributesToRetrieve',
        'restrictSearchableAttributes' => 'restrictSearchableAttributes',
        'ranking' => 'ranking',
        'customRanking' => 'customRanking',
        'relevancyStrictness' => 'relevancyStrictness',
        'attributesToHighlight' => 'attributesToHighlight',
        'attributesToSnippet' => 'attributesToSnippet',
        'highlightPreTag' => 'highlightPreTag',
        'highlightPostTag' => 'highlightPostTag',
        'snippetEllipsisText' => 'snippetEllipsisText',
        'restrictHighlightAndSnippetArrays' => 'restrictHighlightAndSnippetArrays',
        'hitsPerPage' => 'hitsPerPage',
        'minWordSizefor1Typo' => 'minWordSizefor1Typo',
        'minWordSizefor2Typos' => 'minWordSizefor2Typos',
        'typoTolerance' => 'typoTolerance',
        'allowTyposOnNumericTokens' => 'allowTyposOnNumericTokens',
        'disableTypoToleranceOnAttributes' => 'disableTypoToleranceOnAttributes',
        'separatorsToIndex' => 'separatorsToIndex',
        'ignorePlurals' => 'ignorePlurals',
        'removeStopWords' => 'removeStopWords',
        'keepDiacriticsOnCharacters' => 'keepDiacriticsOnCharacters',
        'queryLanguages' => 'queryLanguages',
        'decompoundQuery' => 'decompoundQuery',
        'enableRules' => 'enableRules',
        'enablePersonalization' => 'enablePersonalization',
        'queryType' => 'queryType',
        'removeWordsIfNoResults' => 'removeWordsIfNoResults',
        'advancedSyntax' => 'advancedSyntax',
        'optionalWords' => 'optionalWords',
        'disableExactOnAttributes' => 'disableExactOnAttributes',
        'exactOnSingleWordQuery' => 'exactOnSingleWordQuery',
        'alternativesAsExact' => 'alternativesAsExact',
        'advancedSyntaxFeatures' => 'advancedSyntaxFeatures',
        'distinct' => 'distinct',
        'synonyms' => 'synonyms',
        'replaceSynonymsInHighlight' => 'replaceSynonymsInHighlight',
        'minProximity' => 'minProximity',
        'responseFields' => 'responseFields',
        'maxFacetHits' => 'maxFacetHits',
        'attributeCriteriaComputedByMinProximity' => 'attributeCriteriaComputedByMinProximity',
        'renderingContent' => 'renderingContent',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'similarQuery' => 'setSimilarQuery',
        'filters' => 'setFilters',
        'facetFilters' => 'setFacetFilters',
        'optionalFilters' => 'setOptionalFilters',
        'numericFilters' => 'setNumericFilters',
        'tagFilters' => 'setTagFilters',
        'sumOrFiltersScores' => 'setSumOrFiltersScores',
        'facets' => 'setFacets',
        'maxValuesPerFacet' => 'setMaxValuesPerFacet',
        'facetingAfterDistinct' => 'setFacetingAfterDistinct',
        'sortFacetValuesBy' => 'setSortFacetValuesBy',
        'page' => 'setPage',
        'offset' => 'setOffset',
        'length' => 'setLength',
        'aroundLatLng' => 'setAroundLatLng',
        'aroundLatLngViaIP' => 'setAroundLatLngViaIP',
        'aroundRadius' => 'setAroundRadius',
        'aroundPrecision' => 'setAroundPrecision',
        'minimumAroundRadius' => 'setMinimumAroundRadius',
        'insideBoundingBox' => 'setInsideBoundingBox',
        'insidePolygon' => 'setInsidePolygon',
        'naturalLanguages' => 'setNaturalLanguages',
        'ruleContexts' => 'setRuleContexts',
        'personalizationImpact' => 'setPersonalizationImpact',
        'userToken' => 'setUserToken',
        'getRankingInfo' => 'setGetRankingInfo',
        'clickAnalytics' => 'setClickAnalytics',
        'analytics' => 'setAnalytics',
        'analyticsTags' => 'setAnalyticsTags',
        'percentileComputation' => 'setPercentileComputation',
        'enableABTest' => 'setEnableABTest',
        'enableReRanking' => 'setEnableReRanking',
        'query' => 'setQuery',
        'searchableAttributes' => 'setSearchableAttributes',
        'attributesForFaceting' => 'setAttributesForFaceting',
        'unretrievableAttributes' => 'setUnretrievableAttributes',
        'attributesToRetrieve' => 'setAttributesToRetrieve',
        'restrictSearchableAttributes' => 'setRestrictSearchableAttributes',
        'ranking' => 'setRanking',
        'customRanking' => 'setCustomRanking',
        'relevancyStrictness' => 'setRelevancyStrictness',
        'attributesToHighlight' => 'setAttributesToHighlight',
        'attributesToSnippet' => 'setAttributesToSnippet',
        'highlightPreTag' => 'setHighlightPreTag',
        'highlightPostTag' => 'setHighlightPostTag',
        'snippetEllipsisText' => 'setSnippetEllipsisText',
        'restrictHighlightAndSnippetArrays' => 'setRestrictHighlightAndSnippetArrays',
        'hitsPerPage' => 'setHitsPerPage',
        'minWordSizefor1Typo' => 'setMinWordSizefor1Typo',
        'minWordSizefor2Typos' => 'setMinWordSizefor2Typos',
        'typoTolerance' => 'setTypoTolerance',
        'allowTyposOnNumericTokens' => 'setAllowTyposOnNumericTokens',
        'disableTypoToleranceOnAttributes' => 'setDisableTypoToleranceOnAttributes',
        'separatorsToIndex' => 'setSeparatorsToIndex',
        'ignorePlurals' => 'setIgnorePlurals',
        'removeStopWords' => 'setRemoveStopWords',
        'keepDiacriticsOnCharacters' => 'setKeepDiacriticsOnCharacters',
        'queryLanguages' => 'setQueryLanguages',
        'decompoundQuery' => 'setDecompoundQuery',
        'enableRules' => 'setEnableRules',
        'enablePersonalization' => 'setEnablePersonalization',
        'queryType' => 'setQueryType',
        'removeWordsIfNoResults' => 'setRemoveWordsIfNoResults',
        'advancedSyntax' => 'setAdvancedSyntax',
        'optionalWords' => 'setOptionalWords',
        'disableExactOnAttributes' => 'setDisableExactOnAttributes',
        'exactOnSingleWordQuery' => 'setExactOnSingleWordQuery',
        'alternativesAsExact' => 'setAlternativesAsExact',
        'advancedSyntaxFeatures' => 'setAdvancedSyntaxFeatures',
        'distinct' => 'setDistinct',
        'synonyms' => 'setSynonyms',
        'replaceSynonymsInHighlight' => 'setReplaceSynonymsInHighlight',
        'minProximity' => 'setMinProximity',
        'responseFields' => 'setResponseFields',
        'maxFacetHits' => 'setMaxFacetHits',
        'attributeCriteriaComputedByMinProximity' => 'setAttributeCriteriaComputedByMinProximity',
        'renderingContent' => 'setRenderingContent',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'similarQuery' => 'getSimilarQuery',
        'filters' => 'getFilters',
        'facetFilters' => 'getFacetFilters',
        'optionalFilters' => 'getOptionalFilters',
        'numericFilters' => 'getNumericFilters',
        'tagFilters' => 'getTagFilters',
        'sumOrFiltersScores' => 'getSumOrFiltersScores',
        'facets' => 'getFacets',
        'maxValuesPerFacet' => 'getMaxValuesPerFacet',
        'facetingAfterDistinct' => 'getFacetingAfterDistinct',
        'sortFacetValuesBy' => 'getSortFacetValuesBy',
        'page' => 'getPage',
        'offset' => 'getOffset',
        'length' => 'getLength',
        'aroundLatLng' => 'getAroundLatLng',
        'aroundLatLngViaIP' => 'getAroundLatLngViaIP',
        'aroundRadius' => 'getAroundRadius',
        'aroundPrecision' => 'getAroundPrecision',
        'minimumAroundRadius' => 'getMinimumAroundRadius',
        'insideBoundingBox' => 'getInsideBoundingBox',
        'insidePolygon' => 'getInsidePolygon',
        'naturalLanguages' => 'getNaturalLanguages',
        'ruleContexts' => 'getRuleContexts',
        'personalizationImpact' => 'getPersonalizationImpact',
        'userToken' => 'getUserToken',
        'getRankingInfo' => 'getGetRankingInfo',
        'clickAnalytics' => 'getClickAnalytics',
        'analytics' => 'getAnalytics',
        'analyticsTags' => 'getAnalyticsTags',
        'percentileComputation' => 'getPercentileComputation',
        'enableABTest' => 'getEnableABTest',
        'enableReRanking' => 'getEnableReRanking',
        'query' => 'getQuery',
        'searchableAttributes' => 'getSearchableAttributes',
        'attributesForFaceting' => 'getAttributesForFaceting',
        'unretrievableAttributes' => 'getUnretrievableAttributes',
        'attributesToRetrieve' => 'getAttributesToRetrieve',
        'restrictSearchableAttributes' => 'getRestrictSearchableAttributes',
        'ranking' => 'getRanking',
        'customRanking' => 'getCustomRanking',
        'relevancyStrictness' => 'getRelevancyStrictness',
        'attributesToHighlight' => 'getAttributesToHighlight',
        'attributesToSnippet' => 'getAttributesToSnippet',
        'highlightPreTag' => 'getHighlightPreTag',
        'highlightPostTag' => 'getHighlightPostTag',
        'snippetEllipsisText' => 'getSnippetEllipsisText',
        'restrictHighlightAndSnippetArrays' => 'getRestrictHighlightAndSnippetArrays',
        'hitsPerPage' => 'getHitsPerPage',
        'minWordSizefor1Typo' => 'getMinWordSizefor1Typo',
        'minWordSizefor2Typos' => 'getMinWordSizefor2Typos',
        'typoTolerance' => 'getTypoTolerance',
        'allowTyposOnNumericTokens' => 'getAllowTyposOnNumericTokens',
        'disableTypoToleranceOnAttributes' => 'getDisableTypoToleranceOnAttributes',
        'separatorsToIndex' => 'getSeparatorsToIndex',
        'ignorePlurals' => 'getIgnorePlurals',
        'removeStopWords' => 'getRemoveStopWords',
        'keepDiacriticsOnCharacters' => 'getKeepDiacriticsOnCharacters',
        'queryLanguages' => 'getQueryLanguages',
        'decompoundQuery' => 'getDecompoundQuery',
        'enableRules' => 'getEnableRules',
        'enablePersonalization' => 'getEnablePersonalization',
        'queryType' => 'getQueryType',
        'removeWordsIfNoResults' => 'getRemoveWordsIfNoResults',
        'advancedSyntax' => 'getAdvancedSyntax',
        'optionalWords' => 'getOptionalWords',
        'disableExactOnAttributes' => 'getDisableExactOnAttributes',
        'exactOnSingleWordQuery' => 'getExactOnSingleWordQuery',
        'alternativesAsExact' => 'getAlternativesAsExact',
        'advancedSyntaxFeatures' => 'getAdvancedSyntaxFeatures',
        'distinct' => 'getDistinct',
        'synonyms' => 'getSynonyms',
        'replaceSynonymsInHighlight' => 'getReplaceSynonymsInHighlight',
        'minProximity' => 'getMinProximity',
        'responseFields' => 'getResponseFields',
        'maxFacetHits' => 'getMaxFacetHits',
        'attributeCriteriaComputedByMinProximity' => 'getAttributeCriteriaComputedByMinProximity',
        'renderingContent' => 'getRenderingContent',
    ];

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @return array
     */
    public static function attributeMap()
    {
        return self::$attributeMap;
    }

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @return array
     */
    public static function setters()
    {
        return self::$setters;
    }

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @return array
     */
    public static function getters()
    {
        return self::$getters;
    }

    /**
     * The original name of the model.
     *
     * @return string
     */
    public function getModelName()
    {
        return self::$openAPIModelName;
    }

    const TYPO_TOLERANCE_TRUE = 'true';
    const TYPO_TOLERANCE_FALSE = 'false';
    const TYPO_TOLERANCE_MIN = 'min';
    const TYPO_TOLERANCE_STRICT = 'strict';
    const QUERY_TYPE_PREFIX_LAST = 'prefixLast';
    const QUERY_TYPE_PREFIX_ALL = 'prefixAll';
    const QUERY_TYPE_PREFIX_NONE = 'prefixNone';
    const REMOVE_WORDS_IF_NO_RESULTS_NONE = 'none';
    const REMOVE_WORDS_IF_NO_RESULTS_LAST_WORDS = 'lastWords';
    const REMOVE_WORDS_IF_NO_RESULTS_FIRST_WORDS = 'firstWords';
    const REMOVE_WORDS_IF_NO_RESULTS_ALL_OPTIONAL = 'allOptional';
    const EXACT_ON_SINGLE_WORD_QUERY_ATTRIBUTE = 'attribute';
    const EXACT_ON_SINGLE_WORD_QUERY_NONE = 'none';
    const EXACT_ON_SINGLE_WORD_QUERY_WORD = 'word';
    const ALTERNATIVES_AS_EXACT_IGNORE_PLURALS = 'ignorePlurals';
    const ALTERNATIVES_AS_EXACT_SINGLE_WORD_SYNONYM = 'singleWordSynonym';
    const ALTERNATIVES_AS_EXACT_MULTI_WORDS_SYNONYM = 'multiWordsSynonym';
    const ADVANCED_SYNTAX_FEATURES_EXACT_PHRASE = 'exactPhrase';
    const ADVANCED_SYNTAX_FEATURES_EXCLUDE_WORDS = 'excludeWords';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public function getTypoToleranceAllowableValues()
    {
        return [
            self::TYPO_TOLERANCE_TRUE,
            self::TYPO_TOLERANCE_FALSE,
            self::TYPO_TOLERANCE_MIN,
            self::TYPO_TOLERANCE_STRICT,
        ];
    }

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public function getQueryTypeAllowableValues()
    {
        return [
            self::QUERY_TYPE_PREFIX_LAST,
            self::QUERY_TYPE_PREFIX_ALL,
            self::QUERY_TYPE_PREFIX_NONE,
        ];
    }

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public function getRemoveWordsIfNoResultsAllowableValues()
    {
        return [
            self::REMOVE_WORDS_IF_NO_RESULTS_NONE,
            self::REMOVE_WORDS_IF_NO_RESULTS_LAST_WORDS,
            self::REMOVE_WORDS_IF_NO_RESULTS_FIRST_WORDS,
            self::REMOVE_WORDS_IF_NO_RESULTS_ALL_OPTIONAL,
        ];
    }

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public function getExactOnSingleWordQueryAllowableValues()
    {
        return [
            self::EXACT_ON_SINGLE_WORD_QUERY_ATTRIBUTE,
            self::EXACT_ON_SINGLE_WORD_QUERY_NONE,
            self::EXACT_ON_SINGLE_WORD_QUERY_WORD,
        ];
    }

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public function getAlternativesAsExactAllowableValues()
    {
        return [
            self::ALTERNATIVES_AS_EXACT_IGNORE_PLURALS,
            self::ALTERNATIVES_AS_EXACT_SINGLE_WORD_SYNONYM,
            self::ALTERNATIVES_AS_EXACT_MULTI_WORDS_SYNONYM,
        ];
    }

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public function getAdvancedSyntaxFeaturesAllowableValues()
    {
        return [
            self::ADVANCED_SYNTAX_FEATURES_EXACT_PHRASE,
            self::ADVANCED_SYNTAX_FEATURES_EXCLUDE_WORDS,
        ];
    }

    /**
     * Associative array for storing property values
     *
     * @var mixed[]
     */
    protected $container = [];

    /**
     * Constructor
     *
     * @param mixed[] $data Associated array of property values
     *                      initializing the model
     */
    public function __construct(array $data = null)
    {
        $this->container['similarQuery'] = $data['similarQuery'] ?? '';
        $this->container['filters'] = $data['filters'] ?? '';
        $this->container['facetFilters'] = $data['facetFilters'] ?? null;
        $this->container['optionalFilters'] = $data['optionalFilters'] ?? null;
        $this->container['numericFilters'] = $data['numericFilters'] ?? null;
        $this->container['tagFilters'] = $data['tagFilters'] ?? null;
        $this->container['sumOrFiltersScores'] = $data['sumOrFiltersScores'] ?? false;
        $this->container['facets'] = $data['facets'] ?? null;
        $this->container['maxValuesPerFacet'] = $data['maxValuesPerFacet'] ?? 100;
        $this->container['facetingAfterDistinct'] = $data['facetingAfterDistinct'] ?? false;
        $this->container['sortFacetValuesBy'] = $data['sortFacetValuesBy'] ?? 'count';
        $this->container['page'] = $data['page'] ?? 0;
        $this->container['offset'] = $data['offset'] ?? null;
        $this->container['length'] = $data['length'] ?? null;
        $this->container['aroundLatLng'] = $data['aroundLatLng'] ?? '';
        $this->container['aroundLatLngViaIP'] = $data['aroundLatLngViaIP'] ?? false;
        $this->container['aroundRadius'] = $data['aroundRadius'] ?? null;
        $this->container['aroundPrecision'] = $data['aroundPrecision'] ?? 10;
        $this->container['minimumAroundRadius'] = $data['minimumAroundRadius'] ?? null;
        $this->container['insideBoundingBox'] = $data['insideBoundingBox'] ?? null;
        $this->container['insidePolygon'] = $data['insidePolygon'] ?? null;
        $this->container['naturalLanguages'] = $data['naturalLanguages'] ?? null;
        $this->container['ruleContexts'] = $data['ruleContexts'] ?? null;
        $this->container['personalizationImpact'] = $data['personalizationImpact'] ?? 100;
        $this->container['userToken'] = $data['userToken'] ?? null;
        $this->container['getRankingInfo'] = $data['getRankingInfo'] ?? false;
        $this->container['clickAnalytics'] = $data['clickAnalytics'] ?? false;
        $this->container['analytics'] = $data['analytics'] ?? true;
        $this->container['analyticsTags'] = $data['analyticsTags'] ?? null;
        $this->container['percentileComputation'] = $data['percentileComputation'] ?? true;
        $this->container['enableABTest'] = $data['enableABTest'] ?? true;
        $this->container['enableReRanking'] = $data['enableReRanking'] ?? true;
        $this->container['query'] = $data['query'] ?? '';
        $this->container['searchableAttributes'] = $data['searchableAttributes'] ?? null;
        $this->container['attributesForFaceting'] = $data['attributesForFaceting'] ?? null;
        $this->container['unretrievableAttributes'] = $data['unretrievableAttributes'] ?? null;
        $this->container['attributesToRetrieve'] = $data['attributesToRetrieve'] ?? null;
        $this->container['restrictSearchableAttributes'] = $data['restrictSearchableAttributes'] ?? null;
        $this->container['ranking'] = $data['ranking'] ?? null;
        $this->container['customRanking'] = $data['customRanking'] ?? null;
        $this->container['relevancyStrictness'] = $data['relevancyStrictness'] ?? 100;
        $this->container['attributesToHighlight'] = $data['attributesToHighlight'] ?? null;
        $this->container['attributesToSnippet'] = $data['attributesToSnippet'] ?? null;
        $this->container['highlightPreTag'] = $data['highlightPreTag'] ?? '<em>';
        $this->container['highlightPostTag'] = $data['highlightPostTag'] ?? '</em>';
        $this->container['snippetEllipsisText'] = $data['snippetEllipsisText'] ?? '…';
        $this->container['restrictHighlightAndSnippetArrays'] = $data['restrictHighlightAndSnippetArrays'] ?? false;
        $this->container['hitsPerPage'] = $data['hitsPerPage'] ?? 20;
        $this->container['minWordSizefor1Typo'] = $data['minWordSizefor1Typo'] ?? 4;
        $this->container['minWordSizefor2Typos'] = $data['minWordSizefor2Typos'] ?? 8;
        $this->container['typoTolerance'] = $data['typoTolerance'] ?? 'true';
        $this->container['allowTyposOnNumericTokens'] = $data['allowTyposOnNumericTokens'] ?? true;
        $this->container['disableTypoToleranceOnAttributes'] = $data['disableTypoToleranceOnAttributes'] ?? null;
        $this->container['separatorsToIndex'] = $data['separatorsToIndex'] ?? '';
        $this->container['ignorePlurals'] = $data['ignorePlurals'] ?? 'false';
        $this->container['removeStopWords'] = $data['removeStopWords'] ?? 'false';
        $this->container['keepDiacriticsOnCharacters'] = $data['keepDiacriticsOnCharacters'] ?? '';
        $this->container['queryLanguages'] = $data['queryLanguages'] ?? null;
        $this->container['decompoundQuery'] = $data['decompoundQuery'] ?? true;
        $this->container['enableRules'] = $data['enableRules'] ?? true;
        $this->container['enablePersonalization'] = $data['enablePersonalization'] ?? false;
        $this->container['queryType'] = $data['queryType'] ?? 'prefixLast';
        $this->container['removeWordsIfNoResults'] = $data['removeWordsIfNoResults'] ?? 'none';
        $this->container['advancedSyntax'] = $data['advancedSyntax'] ?? false;
        $this->container['optionalWords'] = $data['optionalWords'] ?? null;
        $this->container['disableExactOnAttributes'] = $data['disableExactOnAttributes'] ?? null;
        $this->container['exactOnSingleWordQuery'] = $data['exactOnSingleWordQuery'] ?? 'attribute';
        $this->container['alternativesAsExact'] = $data['alternativesAsExact'] ?? null;
        $this->container['advancedSyntaxFeatures'] = $data['advancedSyntaxFeatures'] ?? null;
        $this->container['distinct'] = $data['distinct'] ?? 0;
        $this->container['synonyms'] = $data['synonyms'] ?? true;
        $this->container['replaceSynonymsInHighlight'] = $data['replaceSynonymsInHighlight'] ?? false;
        $this->container['minProximity'] = $data['minProximity'] ?? 1;
        $this->container['responseFields'] = $data['responseFields'] ?? null;
        $this->container['maxFacetHits'] = $data['maxFacetHits'] ?? 10;
        $this->container['attributeCriteriaComputedByMinProximity'] = $data['attributeCriteriaComputedByMinProximity'] ?? false;
        $this->container['renderingContent'] = $data['renderingContent'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if (!is_null($this->container['length']) && ($this->container['length'] > 1000)) {
            $invalidProperties[] = "invalid value for 'length', must be smaller than or equal to 1000.";
        }

        if (!is_null($this->container['length']) && ($this->container['length'] < 1)) {
            $invalidProperties[] = "invalid value for 'length', must be bigger than or equal to 1.";
        }

        if (!is_null($this->container['minimumAroundRadius']) && ($this->container['minimumAroundRadius'] < 1)) {
            $invalidProperties[] = "invalid value for 'minimumAroundRadius', must be bigger than or equal to 1.";
        }

        if ($this->container['query'] === null) {
            $invalidProperties[] = "'query' can't be null";
        }
        $allowedValues = $this->getTypoToleranceAllowableValues();
        if (!is_null($this->container['typoTolerance']) && !in_array($this->container['typoTolerance'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'typoTolerance', must be one of '%s'",
                $this->container['typoTolerance'],
                implode("', '", $allowedValues)
            );
        }

        $allowedValues = $this->getQueryTypeAllowableValues();
        if (!is_null($this->container['queryType']) && !in_array($this->container['queryType'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'queryType', must be one of '%s'",
                $this->container['queryType'],
                implode("', '", $allowedValues)
            );
        }

        $allowedValues = $this->getRemoveWordsIfNoResultsAllowableValues();
        if (!is_null($this->container['removeWordsIfNoResults']) && !in_array($this->container['removeWordsIfNoResults'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'removeWordsIfNoResults', must be one of '%s'",
                $this->container['removeWordsIfNoResults'],
                implode("', '", $allowedValues)
            );
        }

        $allowedValues = $this->getExactOnSingleWordQueryAllowableValues();
        if (!is_null($this->container['exactOnSingleWordQuery']) && !in_array($this->container['exactOnSingleWordQuery'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'exactOnSingleWordQuery', must be one of '%s'",
                $this->container['exactOnSingleWordQuery'],
                implode("', '", $allowedValues)
            );
        }

        if (!is_null($this->container['distinct']) && ($this->container['distinct'] > 4)) {
            $invalidProperties[] = "invalid value for 'distinct', must be smaller than or equal to 4.";
        }

        if (!is_null($this->container['distinct']) && ($this->container['distinct'] < 0)) {
            $invalidProperties[] = "invalid value for 'distinct', must be bigger than or equal to 0.";
        }

        if (!is_null($this->container['minProximity']) && ($this->container['minProximity'] > 7)) {
            $invalidProperties[] = "invalid value for 'minProximity', must be smaller than or equal to 7.";
        }

        if (!is_null($this->container['minProximity']) && ($this->container['minProximity'] < 1)) {
            $invalidProperties[] = "invalid value for 'minProximity', must be bigger than or equal to 1.";
        }

        if (!is_null($this->container['maxFacetHits']) && ($this->container['maxFacetHits'] > 100)) {
            $invalidProperties[] = "invalid value for 'maxFacetHits', must be smaller than or equal to 100.";
        }

        return $invalidProperties;
    }

    /**
     * Validate all the properties in the model
     * return true if all passed
     *
     * @return bool True if all properties are valid
     */
    public function valid()
    {
        return count($this->listInvalidProperties()) === 0;
    }

    /**
     * Gets similarQuery
     *
     * @return string|null
     */
    public function getSimilarQuery()
    {
        return $this->container['similarQuery'];
    }

    /**
     * Sets similarQuery
     *
     * @param string|null $similarQuery overrides the query parameter and performs a more generic search that can be used to find \"similar\" results
     *
     * @return self
     */
    public function setSimilarQuery($similarQuery)
    {
        $this->container['similarQuery'] = $similarQuery;

        return $this;
    }

    /**
     * Gets filters
     *
     * @return string|null
     */
    public function getFilters()
    {
        return $this->container['filters'];
    }

    /**
     * Sets filters
     *
     * @param string|null $filters filter the query with numeric, facet and/or tag filters
     *
     * @return self
     */
    public function setFilters($filters)
    {
        $this->container['filters'] = $filters;

        return $this;
    }

    /**
     * Gets facetFilters
     *
     * @return string[]|null
     */
    public function getFacetFilters()
    {
        return $this->container['facetFilters'];
    }

    /**
     * Sets facetFilters
     *
     * @param string[]|null $facetFilters filter hits by facet value
     *
     * @return self
     */
    public function setFacetFilters($facetFilters)
    {
        $this->container['facetFilters'] = $facetFilters;

        return $this;
    }

    /**
     * Gets optionalFilters
     *
     * @return string[]|null
     */
    public function getOptionalFilters()
    {
        return $this->container['optionalFilters'];
    }

    /**
     * Sets optionalFilters
     *
     * @param string[]|null $optionalFilters create filters for ranking purposes, where records that match the filter are ranked higher, or lower in the case of a negative optional filter
     *
     * @return self
     */
    public function setOptionalFilters($optionalFilters)
    {
        $this->container['optionalFilters'] = $optionalFilters;

        return $this;
    }

    /**
     * Gets numericFilters
     *
     * @return string[]|null
     */
    public function getNumericFilters()
    {
        return $this->container['numericFilters'];
    }

    /**
     * Sets numericFilters
     *
     * @param string[]|null $numericFilters filter on numeric attributes
     *
     * @return self
     */
    public function setNumericFilters($numericFilters)
    {
        $this->container['numericFilters'] = $numericFilters;

        return $this;
    }

    /**
     * Gets tagFilters
     *
     * @return string[]|null
     */
    public function getTagFilters()
    {
        return $this->container['tagFilters'];
    }

    /**
     * Sets tagFilters
     *
     * @param string[]|null $tagFilters filter hits by tags
     *
     * @return self
     */
    public function setTagFilters($tagFilters)
    {
        $this->container['tagFilters'] = $tagFilters;

        return $this;
    }

    /**
     * Gets sumOrFiltersScores
     *
     * @return bool|null
     */
    public function getSumOrFiltersScores()
    {
        return $this->container['sumOrFiltersScores'];
    }

    /**
     * Sets sumOrFiltersScores
     *
     * @param bool|null $sumOrFiltersScores determines how to calculate the total score for filtering
     *
     * @return self
     */
    public function setSumOrFiltersScores($sumOrFiltersScores)
    {
        $this->container['sumOrFiltersScores'] = $sumOrFiltersScores;

        return $this;
    }

    /**
     * Gets facets
     *
     * @return string[]|null
     */
    public function getFacets()
    {
        return $this->container['facets'];
    }

    /**
     * Sets facets
     *
     * @param string[]|null $facets retrieve facets and their facet values
     *
     * @return self
     */
    public function setFacets($facets)
    {
        $this->container['facets'] = $facets;

        return $this;
    }

    /**
     * Gets maxValuesPerFacet
     *
     * @return int|null
     */
    public function getMaxValuesPerFacet()
    {
        return $this->container['maxValuesPerFacet'];
    }

    /**
     * Sets maxValuesPerFacet
     *
     * @param int|null $maxValuesPerFacet maximum number of facet values to return for each facet during a regular search
     *
     * @return self
     */
    public function setMaxValuesPerFacet($maxValuesPerFacet)
    {
        $this->container['maxValuesPerFacet'] = $maxValuesPerFacet;

        return $this;
    }

    /**
     * Gets facetingAfterDistinct
     *
     * @return bool|null
     */
    public function getFacetingAfterDistinct()
    {
        return $this->container['facetingAfterDistinct'];
    }

    /**
     * Sets facetingAfterDistinct
     *
     * @param bool|null $facetingAfterDistinct force faceting to be applied after de-duplication (via the Distinct setting)
     *
     * @return self
     */
    public function setFacetingAfterDistinct($facetingAfterDistinct)
    {
        $this->container['facetingAfterDistinct'] = $facetingAfterDistinct;

        return $this;
    }

    /**
     * Gets sortFacetValuesBy
     *
     * @return string|null
     */
    public function getSortFacetValuesBy()
    {
        return $this->container['sortFacetValuesBy'];
    }

    /**
     * Sets sortFacetValuesBy
     *
     * @param string|null $sortFacetValuesBy controls how facet values are fetched
     *
     * @return self
     */
    public function setSortFacetValuesBy($sortFacetValuesBy)
    {
        $this->container['sortFacetValuesBy'] = $sortFacetValuesBy;

        return $this;
    }

    /**
     * Gets page
     *
     * @return int|null
     */
    public function getPage()
    {
        return $this->container['page'];
    }

    /**
     * Sets page
     *
     * @param int|null $page specify the page to retrieve
     *
     * @return self
     */
    public function setPage($page)
    {
        $this->container['page'] = $page;

        return $this;
    }

    /**
     * Gets offset
     *
     * @return int|null
     */
    public function getOffset()
    {
        return $this->container['offset'];
    }

    /**
     * Sets offset
     *
     * @param int|null $offset specify the offset of the first hit to return
     *
     * @return self
     */
    public function setOffset($offset)
    {
        $this->container['offset'] = $offset;

        return $this;
    }

    /**
     * Gets length
     *
     * @return int|null
     */
    public function getLength()
    {
        return $this->container['length'];
    }

    /**
     * Sets length
     *
     * @param int|null $length set the number of hits to retrieve (used only with offset)
     *
     * @return self
     */
    public function setLength($length)
    {
        if (!is_null($length) && ($length > 1000)) {
            throw new \InvalidArgumentException('invalid value for $length when calling SearchParamsObject., must be smaller than or equal to 1000.');
        }
        if (!is_null($length) && ($length < 1)) {
            throw new \InvalidArgumentException('invalid value for $length when calling SearchParamsObject., must be bigger than or equal to 1.');
        }

        $this->container['length'] = $length;

        return $this;
    }

    /**
     * Gets aroundLatLng
     *
     * @return string|null
     */
    public function getAroundLatLng()
    {
        return $this->container['aroundLatLng'];
    }

    /**
     * Sets aroundLatLng
     *
     * @param string|null $aroundLatLng search for entries around a central geolocation, enabling a geo search within a circular area
     *
     * @return self
     */
    public function setAroundLatLng($aroundLatLng)
    {
        $this->container['aroundLatLng'] = $aroundLatLng;

        return $this;
    }

    /**
     * Gets aroundLatLngViaIP
     *
     * @return bool|null
     */
    public function getAroundLatLngViaIP()
    {
        return $this->container['aroundLatLngViaIP'];
    }

    /**
     * Sets aroundLatLngViaIP
     *
     * @param bool|null $aroundLatLngViaIP search for entries around a given location automatically computed from the requester's IP address
     *
     * @return self
     */
    public function setAroundLatLngViaIP($aroundLatLngViaIP)
    {
        $this->container['aroundLatLngViaIP'] = $aroundLatLngViaIP;

        return $this;
    }

    /**
     * Gets aroundRadius
     *
     * @return OneOfIntegerString|null
     */
    public function getAroundRadius()
    {
        return $this->container['aroundRadius'];
    }

    /**
     * Sets aroundRadius
     *
     * @param OneOfIntegerString|null $aroundRadius define the maximum radius for a geo search (in meters)
     *
     * @return self
     */
    public function setAroundRadius($aroundRadius)
    {
        $this->container['aroundRadius'] = $aroundRadius;

        return $this;
    }

    /**
     * Gets aroundPrecision
     *
     * @return int|null
     */
    public function getAroundPrecision()
    {
        return $this->container['aroundPrecision'];
    }

    /**
     * Sets aroundPrecision
     *
     * @param int|null $aroundPrecision precision of geo search (in meters), to add grouping by geo location to the ranking formula
     *
     * @return self
     */
    public function setAroundPrecision($aroundPrecision)
    {
        $this->container['aroundPrecision'] = $aroundPrecision;

        return $this;
    }

    /**
     * Gets minimumAroundRadius
     *
     * @return int|null
     */
    public function getMinimumAroundRadius()
    {
        return $this->container['minimumAroundRadius'];
    }

    /**
     * Sets minimumAroundRadius
     *
     * @param int|null $minimumAroundRadius minimum radius (in meters) used for a geo search when aroundRadius is not set
     *
     * @return self
     */
    public function setMinimumAroundRadius($minimumAroundRadius)
    {
        if (!is_null($minimumAroundRadius) && ($minimumAroundRadius < 1)) {
            throw new \InvalidArgumentException('invalid value for $minimumAroundRadius when calling SearchParamsObject., must be bigger than or equal to 1.');
        }

        $this->container['minimumAroundRadius'] = $minimumAroundRadius;

        return $this;
    }

    /**
     * Gets insideBoundingBox
     *
     * @return float[]|null
     */
    public function getInsideBoundingBox()
    {
        return $this->container['insideBoundingBox'];
    }

    /**
     * Sets insideBoundingBox
     *
     * @param float[]|null $insideBoundingBox search inside a rectangular area (in geo coordinates)
     *
     * @return self
     */
    public function setInsideBoundingBox($insideBoundingBox)
    {
        $this->container['insideBoundingBox'] = $insideBoundingBox;

        return $this;
    }

    /**
     * Gets insidePolygon
     *
     * @return float[]|null
     */
    public function getInsidePolygon()
    {
        return $this->container['insidePolygon'];
    }

    /**
     * Sets insidePolygon
     *
     * @param float[]|null $insidePolygon search inside a polygon (in geo coordinates)
     *
     * @return self
     */
    public function setInsidePolygon($insidePolygon)
    {
        $this->container['insidePolygon'] = $insidePolygon;

        return $this;
    }

    /**
     * Gets naturalLanguages
     *
     * @return string[]|null
     */
    public function getNaturalLanguages()
    {
        return $this->container['naturalLanguages'];
    }

    /**
     * Sets naturalLanguages
     *
     * @param string[]|null $naturalLanguages This parameter changes the default values of certain parameters and settings that work best for a natural language query, such as ignorePlurals, removeStopWords, removeWordsIfNoResults, analyticsTags and ruleContexts. These parameters and settings work well together when the query is formatted in natural language instead of keywords, for example when your user performs a voice search.
     *
     * @return self
     */
    public function setNaturalLanguages($naturalLanguages)
    {
        $this->container['naturalLanguages'] = $naturalLanguages;

        return $this;
    }

    /**
     * Gets ruleContexts
     *
     * @return string[]|null
     */
    public function getRuleContexts()
    {
        return $this->container['ruleContexts'];
    }

    /**
     * Sets ruleContexts
     *
     * @param string[]|null $ruleContexts enables contextual rules
     *
     * @return self
     */
    public function setRuleContexts($ruleContexts)
    {
        $this->container['ruleContexts'] = $ruleContexts;

        return $this;
    }

    /**
     * Gets personalizationImpact
     *
     * @return int|null
     */
    public function getPersonalizationImpact()
    {
        return $this->container['personalizationImpact'];
    }

    /**
     * Sets personalizationImpact
     *
     * @param int|null $personalizationImpact define the impact of the Personalization feature
     *
     * @return self
     */
    public function setPersonalizationImpact($personalizationImpact)
    {
        $this->container['personalizationImpact'] = $personalizationImpact;

        return $this;
    }

    /**
     * Gets userToken
     *
     * @return string|null
     */
    public function getUserToken()
    {
        return $this->container['userToken'];
    }

    /**
     * Sets userToken
     *
     * @param string|null $userToken associates a certain user token with the current search
     *
     * @return self
     */
    public function setUserToken($userToken)
    {
        $this->container['userToken'] = $userToken;

        return $this;
    }

    /**
     * Gets getRankingInfo
     *
     * @return bool|null
     */
    public function getGetRankingInfo()
    {
        return $this->container['getRankingInfo'];
    }

    /**
     * Sets getRankingInfo
     *
     * @param bool|null $getRankingInfo retrieve detailed ranking information
     *
     * @return self
     */
    public function setGetRankingInfo($getRankingInfo)
    {
        $this->container['getRankingInfo'] = $getRankingInfo;

        return $this;
    }

    /**
     * Gets clickAnalytics
     *
     * @return bool|null
     */
    public function getClickAnalytics()
    {
        return $this->container['clickAnalytics'];
    }

    /**
     * Sets clickAnalytics
     *
     * @param bool|null $clickAnalytics enable the Click Analytics feature
     *
     * @return self
     */
    public function setClickAnalytics($clickAnalytics)
    {
        $this->container['clickAnalytics'] = $clickAnalytics;

        return $this;
    }

    /**
     * Gets analytics
     *
     * @return bool|null
     */
    public function getAnalytics()
    {
        return $this->container['analytics'];
    }

    /**
     * Sets analytics
     *
     * @param bool|null $analytics whether the current query will be taken into account in the Analytics
     *
     * @return self
     */
    public function setAnalytics($analytics)
    {
        $this->container['analytics'] = $analytics;

        return $this;
    }

    /**
     * Gets analyticsTags
     *
     * @return string[]|null
     */
    public function getAnalyticsTags()
    {
        return $this->container['analyticsTags'];
    }

    /**
     * Sets analyticsTags
     *
     * @param string[]|null $analyticsTags list of tags to apply to the query for analytics purposes
     *
     * @return self
     */
    public function setAnalyticsTags($analyticsTags)
    {
        $this->container['analyticsTags'] = $analyticsTags;

        return $this;
    }

    /**
     * Gets percentileComputation
     *
     * @return bool|null
     */
    public function getPercentileComputation()
    {
        return $this->container['percentileComputation'];
    }

    /**
     * Sets percentileComputation
     *
     * @param bool|null $percentileComputation whether to include or exclude a query from the processing-time percentile computation
     *
     * @return self
     */
    public function setPercentileComputation($percentileComputation)
    {
        $this->container['percentileComputation'] = $percentileComputation;

        return $this;
    }

    /**
     * Gets enableABTest
     *
     * @return bool|null
     */
    public function getEnableABTest()
    {
        return $this->container['enableABTest'];
    }

    /**
     * Sets enableABTest
     *
     * @param bool|null $enableABTest whether this search should participate in running AB tests
     *
     * @return self
     */
    public function setEnableABTest($enableABTest)
    {
        $this->container['enableABTest'] = $enableABTest;

        return $this;
    }

    /**
     * Gets enableReRanking
     *
     * @return bool|null
     */
    public function getEnableReRanking()
    {
        return $this->container['enableReRanking'];
    }

    /**
     * Sets enableReRanking
     *
     * @param bool|null $enableReRanking whether this search should use AI Re-Ranking
     *
     * @return self
     */
    public function setEnableReRanking($enableReRanking)
    {
        $this->container['enableReRanking'] = $enableReRanking;

        return $this;
    }

    /**
     * Gets query
     *
     * @return string
     */
    public function getQuery()
    {
        return $this->container['query'];
    }

    /**
     * Sets query
     *
     * @param string $query the text to search in the index
     *
     * @return self
     */
    public function setQuery($query)
    {
        $this->container['query'] = $query;

        return $this;
    }

    /**
     * Gets searchableAttributes
     *
     * @return string[]|null
     */
    public function getSearchableAttributes()
    {
        return $this->container['searchableAttributes'];
    }

    /**
     * Sets searchableAttributes
     *
     * @param string[]|null $searchableAttributes the complete list of attributes used for searching
     *
     * @return self
     */
    public function setSearchableAttributes($searchableAttributes)
    {
        $this->container['searchableAttributes'] = $searchableAttributes;

        return $this;
    }

    /**
     * Gets attributesForFaceting
     *
     * @return string[]|null
     */
    public function getAttributesForFaceting()
    {
        return $this->container['attributesForFaceting'];
    }

    /**
     * Sets attributesForFaceting
     *
     * @param string[]|null $attributesForFaceting the complete list of attributes that will be used for faceting
     *
     * @return self
     */
    public function setAttributesForFaceting($attributesForFaceting)
    {
        $this->container['attributesForFaceting'] = $attributesForFaceting;

        return $this;
    }

    /**
     * Gets unretrievableAttributes
     *
     * @return string[]|null
     */
    public function getUnretrievableAttributes()
    {
        return $this->container['unretrievableAttributes'];
    }

    /**
     * Sets unretrievableAttributes
     *
     * @param string[]|null $unretrievableAttributes list of attributes that can't be retrieved at query time
     *
     * @return self
     */
    public function setUnretrievableAttributes($unretrievableAttributes)
    {
        $this->container['unretrievableAttributes'] = $unretrievableAttributes;

        return $this;
    }

    /**
     * Gets attributesToRetrieve
     *
     * @return string[]|null
     */
    public function getAttributesToRetrieve()
    {
        return $this->container['attributesToRetrieve'];
    }

    /**
     * Sets attributesToRetrieve
     *
     * @param string[]|null $attributesToRetrieve this parameter controls which attributes to retrieve and which not to retrieve
     *
     * @return self
     */
    public function setAttributesToRetrieve($attributesToRetrieve)
    {
        $this->container['attributesToRetrieve'] = $attributesToRetrieve;

        return $this;
    }

    /**
     * Gets restrictSearchableAttributes
     *
     * @return string[]|null
     */
    public function getRestrictSearchableAttributes()
    {
        return $this->container['restrictSearchableAttributes'];
    }

    /**
     * Sets restrictSearchableAttributes
     *
     * @param string[]|null $restrictSearchableAttributes restricts a given query to look in only a subset of your searchable attributes
     *
     * @return self
     */
    public function setRestrictSearchableAttributes($restrictSearchableAttributes)
    {
        $this->container['restrictSearchableAttributes'] = $restrictSearchableAttributes;

        return $this;
    }

    /**
     * Gets ranking
     *
     * @return string[]|null
     */
    public function getRanking()
    {
        return $this->container['ranking'];
    }

    /**
     * Sets ranking
     *
     * @param string[]|null $ranking controls how Algolia should sort your results
     *
     * @return self
     */
    public function setRanking($ranking)
    {
        $this->container['ranking'] = $ranking;

        return $this;
    }

    /**
     * Gets customRanking
     *
     * @return string[]|null
     */
    public function getCustomRanking()
    {
        return $this->container['customRanking'];
    }

    /**
     * Sets customRanking
     *
     * @param string[]|null $customRanking specifies the custom ranking criterion
     *
     * @return self
     */
    public function setCustomRanking($customRanking)
    {
        $this->container['customRanking'] = $customRanking;

        return $this;
    }

    /**
     * Gets relevancyStrictness
     *
     * @return int|null
     */
    public function getRelevancyStrictness()
    {
        return $this->container['relevancyStrictness'];
    }

    /**
     * Sets relevancyStrictness
     *
     * @param int|null $relevancyStrictness controls the relevancy threshold below which less relevant results aren't included in the results
     *
     * @return self
     */
    public function setRelevancyStrictness($relevancyStrictness)
    {
        $this->container['relevancyStrictness'] = $relevancyStrictness;

        return $this;
    }

    /**
     * Gets attributesToHighlight
     *
     * @return string[]|null
     */
    public function getAttributesToHighlight()
    {
        return $this->container['attributesToHighlight'];
    }

    /**
     * Sets attributesToHighlight
     *
     * @param string[]|null $attributesToHighlight list of attributes to highlight
     *
     * @return self
     */
    public function setAttributesToHighlight($attributesToHighlight)
    {
        $this->container['attributesToHighlight'] = $attributesToHighlight;

        return $this;
    }

    /**
     * Gets attributesToSnippet
     *
     * @return string[]|null
     */
    public function getAttributesToSnippet()
    {
        return $this->container['attributesToSnippet'];
    }

    /**
     * Sets attributesToSnippet
     *
     * @param string[]|null $attributesToSnippet list of attributes to snippet, with an optional maximum number of words to snippet
     *
     * @return self
     */
    public function setAttributesToSnippet($attributesToSnippet)
    {
        $this->container['attributesToSnippet'] = $attributesToSnippet;

        return $this;
    }

    /**
     * Gets highlightPreTag
     *
     * @return string|null
     */
    public function getHighlightPreTag()
    {
        return $this->container['highlightPreTag'];
    }

    /**
     * Sets highlightPreTag
     *
     * @param string|null $highlightPreTag the HTML string to insert before the highlighted parts in all highlight and snippet results
     *
     * @return self
     */
    public function setHighlightPreTag($highlightPreTag)
    {
        $this->container['highlightPreTag'] = $highlightPreTag;

        return $this;
    }

    /**
     * Gets highlightPostTag
     *
     * @return string|null
     */
    public function getHighlightPostTag()
    {
        return $this->container['highlightPostTag'];
    }

    /**
     * Sets highlightPostTag
     *
     * @param string|null $highlightPostTag the HTML string to insert after the highlighted parts in all highlight and snippet results
     *
     * @return self
     */
    public function setHighlightPostTag($highlightPostTag)
    {
        $this->container['highlightPostTag'] = $highlightPostTag;

        return $this;
    }

    /**
     * Gets snippetEllipsisText
     *
     * @return string|null
     */
    public function getSnippetEllipsisText()
    {
        return $this->container['snippetEllipsisText'];
    }

    /**
     * Sets snippetEllipsisText
     *
     * @param string|null $snippetEllipsisText string used as an ellipsis indicator when a snippet is truncated
     *
     * @return self
     */
    public function setSnippetEllipsisText($snippetEllipsisText)
    {
        $this->container['snippetEllipsisText'] = $snippetEllipsisText;

        return $this;
    }

    /**
     * Gets restrictHighlightAndSnippetArrays
     *
     * @return bool|null
     */
    public function getRestrictHighlightAndSnippetArrays()
    {
        return $this->container['restrictHighlightAndSnippetArrays'];
    }

    /**
     * Sets restrictHighlightAndSnippetArrays
     *
     * @param bool|null $restrictHighlightAndSnippetArrays restrict highlighting and snippeting to items that matched the query
     *
     * @return self
     */
    public function setRestrictHighlightAndSnippetArrays($restrictHighlightAndSnippetArrays)
    {
        $this->container['restrictHighlightAndSnippetArrays'] = $restrictHighlightAndSnippetArrays;

        return $this;
    }

    /**
     * Gets hitsPerPage
     *
     * @return int|null
     */
    public function getHitsPerPage()
    {
        return $this->container['hitsPerPage'];
    }

    /**
     * Sets hitsPerPage
     *
     * @param int|null $hitsPerPage set the number of hits per page
     *
     * @return self
     */
    public function setHitsPerPage($hitsPerPage)
    {
        $this->container['hitsPerPage'] = $hitsPerPage;

        return $this;
    }

    /**
     * Gets minWordSizefor1Typo
     *
     * @return int|null
     */
    public function getMinWordSizefor1Typo()
    {
        return $this->container['minWordSizefor1Typo'];
    }

    /**
     * Sets minWordSizefor1Typo
     *
     * @param int|null $minWordSizefor1Typo minimum number of characters a word in the query string must contain to accept matches with 1 typo
     *
     * @return self
     */
    public function setMinWordSizefor1Typo($minWordSizefor1Typo)
    {
        $this->container['minWordSizefor1Typo'] = $minWordSizefor1Typo;

        return $this;
    }

    /**
     * Gets minWordSizefor2Typos
     *
     * @return int|null
     */
    public function getMinWordSizefor2Typos()
    {
        return $this->container['minWordSizefor2Typos'];
    }

    /**
     * Sets minWordSizefor2Typos
     *
     * @param int|null $minWordSizefor2Typos minimum number of characters a word in the query string must contain to accept matches with 2 typos
     *
     * @return self
     */
    public function setMinWordSizefor2Typos($minWordSizefor2Typos)
    {
        $this->container['minWordSizefor2Typos'] = $minWordSizefor2Typos;

        return $this;
    }

    /**
     * Gets typoTolerance
     *
     * @return string|null
     */
    public function getTypoTolerance()
    {
        return $this->container['typoTolerance'];
    }

    /**
     * Sets typoTolerance
     *
     * @param string|null $typoTolerance controls whether typo tolerance is enabled and how it is applied
     *
     * @return self
     */
    public function setTypoTolerance($typoTolerance)
    {
        $allowedValues = $this->getTypoToleranceAllowableValues();
        if (!is_null($typoTolerance) && !in_array($typoTolerance, $allowedValues, true)) {
            throw new \InvalidArgumentException(
                sprintf(
                    "Invalid value '%s' for 'typoTolerance', must be one of '%s'",
                    $typoTolerance,
                    implode("', '", $allowedValues)
                )
            );
        }
        $this->container['typoTolerance'] = $typoTolerance;

        return $this;
    }

    /**
     * Gets allowTyposOnNumericTokens
     *
     * @return bool|null
     */
    public function getAllowTyposOnNumericTokens()
    {
        return $this->container['allowTyposOnNumericTokens'];
    }

    /**
     * Sets allowTyposOnNumericTokens
     *
     * @param bool|null $allowTyposOnNumericTokens whether to allow typos on numbers (\"numeric tokens\") in the query string
     *
     * @return self
     */
    public function setAllowTyposOnNumericTokens($allowTyposOnNumericTokens)
    {
        $this->container['allowTyposOnNumericTokens'] = $allowTyposOnNumericTokens;

        return $this;
    }

    /**
     * Gets disableTypoToleranceOnAttributes
     *
     * @return string[]|null
     */
    public function getDisableTypoToleranceOnAttributes()
    {
        return $this->container['disableTypoToleranceOnAttributes'];
    }

    /**
     * Sets disableTypoToleranceOnAttributes
     *
     * @param string[]|null $disableTypoToleranceOnAttributes list of attributes on which you want to disable typo tolerance
     *
     * @return self
     */
    public function setDisableTypoToleranceOnAttributes($disableTypoToleranceOnAttributes)
    {
        $this->container['disableTypoToleranceOnAttributes'] = $disableTypoToleranceOnAttributes;

        return $this;
    }

    /**
     * Gets separatorsToIndex
     *
     * @return string|null
     */
    public function getSeparatorsToIndex()
    {
        return $this->container['separatorsToIndex'];
    }

    /**
     * Sets separatorsToIndex
     *
     * @param string|null $separatorsToIndex control which separators are indexed
     *
     * @return self
     */
    public function setSeparatorsToIndex($separatorsToIndex)
    {
        $this->container['separatorsToIndex'] = $separatorsToIndex;

        return $this;
    }

    /**
     * Gets ignorePlurals
     *
     * @return string|null
     */
    public function getIgnorePlurals()
    {
        return $this->container['ignorePlurals'];
    }

    /**
     * Sets ignorePlurals
     *
     * @param string|null $ignorePlurals treats singular, plurals, and other forms of declensions as matching terms
     *
     * @return self
     */
    public function setIgnorePlurals($ignorePlurals)
    {
        $this->container['ignorePlurals'] = $ignorePlurals;

        return $this;
    }

    /**
     * Gets removeStopWords
     *
     * @return string|null
     */
    public function getRemoveStopWords()
    {
        return $this->container['removeStopWords'];
    }

    /**
     * Sets removeStopWords
     *
     * @param string|null $removeStopWords removes stop (common) words from the query before executing it
     *
     * @return self
     */
    public function setRemoveStopWords($removeStopWords)
    {
        $this->container['removeStopWords'] = $removeStopWords;

        return $this;
    }

    /**
     * Gets keepDiacriticsOnCharacters
     *
     * @return string|null
     */
    public function getKeepDiacriticsOnCharacters()
    {
        return $this->container['keepDiacriticsOnCharacters'];
    }

    /**
     * Sets keepDiacriticsOnCharacters
     *
     * @param string|null $keepDiacriticsOnCharacters list of characters that the engine shouldn't automatically normalize
     *
     * @return self
     */
    public function setKeepDiacriticsOnCharacters($keepDiacriticsOnCharacters)
    {
        $this->container['keepDiacriticsOnCharacters'] = $keepDiacriticsOnCharacters;

        return $this;
    }

    /**
     * Gets queryLanguages
     *
     * @return string[]|null
     */
    public function getQueryLanguages()
    {
        return $this->container['queryLanguages'];
    }

    /**
     * Sets queryLanguages
     *
     * @param string[]|null $queryLanguages sets the languages to be used by language-specific settings and functionalities such as ignorePlurals, removeStopWords, and CJK word-detection
     *
     * @return self
     */
    public function setQueryLanguages($queryLanguages)
    {
        $this->container['queryLanguages'] = $queryLanguages;

        return $this;
    }

    /**
     * Gets decompoundQuery
     *
     * @return bool|null
     */
    public function getDecompoundQuery()
    {
        return $this->container['decompoundQuery'];
    }

    /**
     * Sets decompoundQuery
     *
     * @param bool|null $decompoundQuery splits compound words into their composing atoms in the query
     *
     * @return self
     */
    public function setDecompoundQuery($decompoundQuery)
    {
        $this->container['decompoundQuery'] = $decompoundQuery;

        return $this;
    }

    /**
     * Gets enableRules
     *
     * @return bool|null
     */
    public function getEnableRules()
    {
        return $this->container['enableRules'];
    }

    /**
     * Sets enableRules
     *
     * @param bool|null $enableRules whether Rules should be globally enabled
     *
     * @return self
     */
    public function setEnableRules($enableRules)
    {
        $this->container['enableRules'] = $enableRules;

        return $this;
    }

    /**
     * Gets enablePersonalization
     *
     * @return bool|null
     */
    public function getEnablePersonalization()
    {
        return $this->container['enablePersonalization'];
    }

    /**
     * Sets enablePersonalization
     *
     * @param bool|null $enablePersonalization enable the Personalization feature
     *
     * @return self
     */
    public function setEnablePersonalization($enablePersonalization)
    {
        $this->container['enablePersonalization'] = $enablePersonalization;

        return $this;
    }

    /**
     * Gets queryType
     *
     * @return string|null
     */
    public function getQueryType()
    {
        return $this->container['queryType'];
    }

    /**
     * Sets queryType
     *
     * @param string|null $queryType controls if and how query words are interpreted as prefixes
     *
     * @return self
     */
    public function setQueryType($queryType)
    {
        $allowedValues = $this->getQueryTypeAllowableValues();
        if (!is_null($queryType) && !in_array($queryType, $allowedValues, true)) {
            throw new \InvalidArgumentException(
                sprintf(
                    "Invalid value '%s' for 'queryType', must be one of '%s'",
                    $queryType,
                    implode("', '", $allowedValues)
                )
            );
        }
        $this->container['queryType'] = $queryType;

        return $this;
    }

    /**
     * Gets removeWordsIfNoResults
     *
     * @return string|null
     */
    public function getRemoveWordsIfNoResults()
    {
        return $this->container['removeWordsIfNoResults'];
    }

    /**
     * Sets removeWordsIfNoResults
     *
     * @param string|null $removeWordsIfNoResults selects a strategy to remove words from the query when it doesn't match any hits
     *
     * @return self
     */
    public function setRemoveWordsIfNoResults($removeWordsIfNoResults)
    {
        $allowedValues = $this->getRemoveWordsIfNoResultsAllowableValues();
        if (!is_null($removeWordsIfNoResults) && !in_array($removeWordsIfNoResults, $allowedValues, true)) {
            throw new \InvalidArgumentException(
                sprintf(
                    "Invalid value '%s' for 'removeWordsIfNoResults', must be one of '%s'",
                    $removeWordsIfNoResults,
                    implode("', '", $allowedValues)
                )
            );
        }
        $this->container['removeWordsIfNoResults'] = $removeWordsIfNoResults;

        return $this;
    }

    /**
     * Gets advancedSyntax
     *
     * @return bool|null
     */
    public function getAdvancedSyntax()
    {
        return $this->container['advancedSyntax'];
    }

    /**
     * Sets advancedSyntax
     *
     * @param bool|null $advancedSyntax enables the advanced query syntax
     *
     * @return self
     */
    public function setAdvancedSyntax($advancedSyntax)
    {
        $this->container['advancedSyntax'] = $advancedSyntax;

        return $this;
    }

    /**
     * Gets optionalWords
     *
     * @return string[]|null
     */
    public function getOptionalWords()
    {
        return $this->container['optionalWords'];
    }

    /**
     * Sets optionalWords
     *
     * @param string[]|null $optionalWords a list of words that should be considered as optional when found in the query
     *
     * @return self
     */
    public function setOptionalWords($optionalWords)
    {
        $this->container['optionalWords'] = $optionalWords;

        return $this;
    }

    /**
     * Gets disableExactOnAttributes
     *
     * @return string[]|null
     */
    public function getDisableExactOnAttributes()
    {
        return $this->container['disableExactOnAttributes'];
    }

    /**
     * Sets disableExactOnAttributes
     *
     * @param string[]|null $disableExactOnAttributes list of attributes on which you want to disable the exact ranking criterion
     *
     * @return self
     */
    public function setDisableExactOnAttributes($disableExactOnAttributes)
    {
        $this->container['disableExactOnAttributes'] = $disableExactOnAttributes;

        return $this;
    }

    /**
     * Gets exactOnSingleWordQuery
     *
     * @return string|null
     */
    public function getExactOnSingleWordQuery()
    {
        return $this->container['exactOnSingleWordQuery'];
    }

    /**
     * Sets exactOnSingleWordQuery
     *
     * @param string|null $exactOnSingleWordQuery controls how the exact ranking criterion is computed when the query contains only one word
     *
     * @return self
     */
    public function setExactOnSingleWordQuery($exactOnSingleWordQuery)
    {
        $allowedValues = $this->getExactOnSingleWordQueryAllowableValues();
        if (!is_null($exactOnSingleWordQuery) && !in_array($exactOnSingleWordQuery, $allowedValues, true)) {
            throw new \InvalidArgumentException(
                sprintf(
                    "Invalid value '%s' for 'exactOnSingleWordQuery', must be one of '%s'",
                    $exactOnSingleWordQuery,
                    implode("', '", $allowedValues)
                )
            );
        }
        $this->container['exactOnSingleWordQuery'] = $exactOnSingleWordQuery;

        return $this;
    }

    /**
     * Gets alternativesAsExact
     *
     * @return string[]|null
     */
    public function getAlternativesAsExact()
    {
        return $this->container['alternativesAsExact'];
    }

    /**
     * Sets alternativesAsExact
     *
     * @param string[]|null $alternativesAsExact list of alternatives that should be considered an exact match by the exact ranking criterion
     *
     * @return self
     */
    public function setAlternativesAsExact($alternativesAsExact)
    {
        $allowedValues = $this->getAlternativesAsExactAllowableValues();
        if (!is_null($alternativesAsExact) && array_diff($alternativesAsExact, $allowedValues)) {
            throw new \InvalidArgumentException(
                sprintf(
                    "Invalid value for 'alternativesAsExact', must be one of '%s'",
                    implode("', '", $allowedValues)
                )
            );
        }
        $this->container['alternativesAsExact'] = $alternativesAsExact;

        return $this;
    }

    /**
     * Gets advancedSyntaxFeatures
     *
     * @return string[]|null
     */
    public function getAdvancedSyntaxFeatures()
    {
        return $this->container['advancedSyntaxFeatures'];
    }

    /**
     * Sets advancedSyntaxFeatures
     *
     * @param string[]|null $advancedSyntaxFeatures allows you to specify which advanced syntax features are active when ‘advancedSyntax' is enabled
     *
     * @return self
     */
    public function setAdvancedSyntaxFeatures($advancedSyntaxFeatures)
    {
        $allowedValues = $this->getAdvancedSyntaxFeaturesAllowableValues();
        if (!is_null($advancedSyntaxFeatures) && array_diff($advancedSyntaxFeatures, $allowedValues)) {
            throw new \InvalidArgumentException(
                sprintf(
                    "Invalid value for 'advancedSyntaxFeatures', must be one of '%s'",
                    implode("', '", $allowedValues)
                )
            );
        }
        $this->container['advancedSyntaxFeatures'] = $advancedSyntaxFeatures;

        return $this;
    }

    /**
     * Gets distinct
     *
     * @return int|null
     */
    public function getDistinct()
    {
        return $this->container['distinct'];
    }

    /**
     * Sets distinct
     *
     * @param int|null $distinct enables de-duplication or grouping of results
     *
     * @return self
     */
    public function setDistinct($distinct)
    {
        if (!is_null($distinct) && ($distinct > 4)) {
            throw new \InvalidArgumentException('invalid value for $distinct when calling SearchParamsObject., must be smaller than or equal to 4.');
        }
        if (!is_null($distinct) && ($distinct < 0)) {
            throw new \InvalidArgumentException('invalid value for $distinct when calling SearchParamsObject., must be bigger than or equal to 0.');
        }

        $this->container['distinct'] = $distinct;

        return $this;
    }

    /**
     * Gets synonyms
     *
     * @return bool|null
     */
    public function getSynonyms()
    {
        return $this->container['synonyms'];
    }

    /**
     * Sets synonyms
     *
     * @param bool|null $synonyms whether to take into account an index's synonyms for a particular search
     *
     * @return self
     */
    public function setSynonyms($synonyms)
    {
        $this->container['synonyms'] = $synonyms;

        return $this;
    }

    /**
     * Gets replaceSynonymsInHighlight
     *
     * @return bool|null
     */
    public function getReplaceSynonymsInHighlight()
    {
        return $this->container['replaceSynonymsInHighlight'];
    }

    /**
     * Sets replaceSynonymsInHighlight
     *
     * @param bool|null $replaceSynonymsInHighlight whether to highlight and snippet the original word that matches the synonym or the synonym itself
     *
     * @return self
     */
    public function setReplaceSynonymsInHighlight($replaceSynonymsInHighlight)
    {
        $this->container['replaceSynonymsInHighlight'] = $replaceSynonymsInHighlight;

        return $this;
    }

    /**
     * Gets minProximity
     *
     * @return int|null
     */
    public function getMinProximity()
    {
        return $this->container['minProximity'];
    }

    /**
     * Sets minProximity
     *
     * @param int|null $minProximity precision of the proximity ranking criterion
     *
     * @return self
     */
    public function setMinProximity($minProximity)
    {
        if (!is_null($minProximity) && ($minProximity > 7)) {
            throw new \InvalidArgumentException('invalid value for $minProximity when calling SearchParamsObject., must be smaller than or equal to 7.');
        }
        if (!is_null($minProximity) && ($minProximity < 1)) {
            throw new \InvalidArgumentException('invalid value for $minProximity when calling SearchParamsObject., must be bigger than or equal to 1.');
        }

        $this->container['minProximity'] = $minProximity;

        return $this;
    }

    /**
     * Gets responseFields
     *
     * @return string[]|null
     */
    public function getResponseFields()
    {
        return $this->container['responseFields'];
    }

    /**
     * Sets responseFields
     *
     * @param string[]|null $responseFields Choose which fields to return in the API response. This parameters applies to search and browse queries.
     *
     * @return self
     */
    public function setResponseFields($responseFields)
    {
        $this->container['responseFields'] = $responseFields;

        return $this;
    }

    /**
     * Gets maxFacetHits
     *
     * @return int|null
     */
    public function getMaxFacetHits()
    {
        return $this->container['maxFacetHits'];
    }

    /**
     * Sets maxFacetHits
     *
     * @param int|null $maxFacetHits Maximum number of facet hits to return during a search for facet values. For performance reasons, the maximum allowed number of returned values is 100.
     *
     * @return self
     */
    public function setMaxFacetHits($maxFacetHits)
    {
        if (!is_null($maxFacetHits) && ($maxFacetHits > 100)) {
            throw new \InvalidArgumentException('invalid value for $maxFacetHits when calling SearchParamsObject., must be smaller than or equal to 100.');
        }

        $this->container['maxFacetHits'] = $maxFacetHits;

        return $this;
    }

    /**
     * Gets attributeCriteriaComputedByMinProximity
     *
     * @return bool|null
     */
    public function getAttributeCriteriaComputedByMinProximity()
    {
        return $this->container['attributeCriteriaComputedByMinProximity'];
    }

    /**
     * Sets attributeCriteriaComputedByMinProximity
     *
     * @param bool|null $attributeCriteriaComputedByMinProximity when attribute is ranked above proximity in your ranking formula, proximity is used to select which searchable attribute is matched in the attribute ranking stage
     *
     * @return self
     */
    public function setAttributeCriteriaComputedByMinProximity($attributeCriteriaComputedByMinProximity)
    {
        $this->container['attributeCriteriaComputedByMinProximity'] = $attributeCriteriaComputedByMinProximity;

        return $this;
    }

    /**
     * Gets renderingContent
     *
     * @return object|null
     */
    public function getRenderingContent()
    {
        return $this->container['renderingContent'];
    }

    /**
     * Sets renderingContent
     *
     * @param object|null $renderingContent Content defining how the search interface should be rendered. Can be set via the settings for a default value and can be overridden via rules.
     *
     * @return self
     */
    public function setRenderingContent($renderingContent)
    {
        $this->container['renderingContent'] = $renderingContent;

        return $this;
    }
    /**
     * Returns true if offset exists. False otherwise.
     *
     * @param int $offset Offset
     *
     * @return bool
     */
    public function offsetExists($offset)
    {
        return isset($this->container[$offset]);
    }

    /**
     * Gets offset.
     *
     * @param int $offset Offset
     *
     * @return mixed|null
     */
    public function offsetGet($offset)
    {
        return $this->container[$offset] ?? null;
    }

    /**
     * Sets value based on offset.
     *
     * @param int|null $offset Offset
     * @param mixed    $value  Value to be set
     *
     * @return void
     */
    public function offsetSet($offset, $value)
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    /**
     * Unsets offset.
     *
     * @param int $offset Offset
     *
     * @return void
     */
    public function offsetUnset($offset)
    {
        unset($this->container[$offset]);
    }

    /**
     * Serializes the object to a value that can be serialized natively by json_encode().
     *
     * @link https://www.php.net/manual/en/jsonserializable.jsonserialize.php
     *
     * @return mixed returns data which can be serialized by json_encode(), which is a value
     * of any type other than a resource
     */
    public function jsonSerialize()
    {
        return ObjectSerializer::sanitizeForSerialization($this);
    }

    /**
     * Gets the string presentation of the object
     *
     * @return string
     */
    public function __toString()
    {
        return json_encode(
            ObjectSerializer::sanitizeForSerialization($this),
            JSON_PRETTY_PRINT
        );
    }

    /**
     * Gets a header-safe presentation of the object
     *
     * @return string
     */
    public function toHeaderValue()
    {
        return json_encode(ObjectSerializer::sanitizeForSerialization($this));
    }
}

