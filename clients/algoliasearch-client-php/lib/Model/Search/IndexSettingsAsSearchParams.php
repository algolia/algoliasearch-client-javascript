<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * IndexSettingsAsSearchParams Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class IndexSettingsAsSearchParams extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
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
      */
    protected static $modelFormats = [
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
    public static function modelTypes()
    {
        return self::$modelTypes;
    }

    /**
     * Array of property to format mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function modelFormats()
    {
        return self::$modelFormats;
    }

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
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
     */
    public function __construct(array $data = null)
    {
        if (isset($data['searchableAttributes'])) {
            $this->container['searchableAttributes'] = $data['searchableAttributes'];
        }
        if (isset($data['attributesForFaceting'])) {
            $this->container['attributesForFaceting'] = $data['attributesForFaceting'];
        }
        if (isset($data['unretrievableAttributes'])) {
            $this->container['unretrievableAttributes'] = $data['unretrievableAttributes'];
        }
        if (isset($data['attributesToRetrieve'])) {
            $this->container['attributesToRetrieve'] = $data['attributesToRetrieve'];
        }
        if (isset($data['restrictSearchableAttributes'])) {
            $this->container['restrictSearchableAttributes'] = $data['restrictSearchableAttributes'];
        }
        if (isset($data['ranking'])) {
            $this->container['ranking'] = $data['ranking'];
        }
        if (isset($data['customRanking'])) {
            $this->container['customRanking'] = $data['customRanking'];
        }
        if (isset($data['relevancyStrictness'])) {
            $this->container['relevancyStrictness'] = $data['relevancyStrictness'];
        }
        if (isset($data['attributesToHighlight'])) {
            $this->container['attributesToHighlight'] = $data['attributesToHighlight'];
        }
        if (isset($data['attributesToSnippet'])) {
            $this->container['attributesToSnippet'] = $data['attributesToSnippet'];
        }
        if (isset($data['highlightPreTag'])) {
            $this->container['highlightPreTag'] = $data['highlightPreTag'];
        }
        if (isset($data['highlightPostTag'])) {
            $this->container['highlightPostTag'] = $data['highlightPostTag'];
        }
        if (isset($data['snippetEllipsisText'])) {
            $this->container['snippetEllipsisText'] = $data['snippetEllipsisText'];
        }
        if (isset($data['restrictHighlightAndSnippetArrays'])) {
            $this->container['restrictHighlightAndSnippetArrays'] = $data['restrictHighlightAndSnippetArrays'];
        }
        if (isset($data['hitsPerPage'])) {
            $this->container['hitsPerPage'] = $data['hitsPerPage'];
        }
        if (isset($data['minWordSizefor1Typo'])) {
            $this->container['minWordSizefor1Typo'] = $data['minWordSizefor1Typo'];
        }
        if (isset($data['minWordSizefor2Typos'])) {
            $this->container['minWordSizefor2Typos'] = $data['minWordSizefor2Typos'];
        }
        if (isset($data['typoTolerance'])) {
            $this->container['typoTolerance'] = $data['typoTolerance'];
        }
        if (isset($data['allowTyposOnNumericTokens'])) {
            $this->container['allowTyposOnNumericTokens'] = $data['allowTyposOnNumericTokens'];
        }
        if (isset($data['disableTypoToleranceOnAttributes'])) {
            $this->container['disableTypoToleranceOnAttributes'] = $data['disableTypoToleranceOnAttributes'];
        }
        if (isset($data['separatorsToIndex'])) {
            $this->container['separatorsToIndex'] = $data['separatorsToIndex'];
        }
        if (isset($data['ignorePlurals'])) {
            $this->container['ignorePlurals'] = $data['ignorePlurals'];
        }
        if (isset($data['removeStopWords'])) {
            $this->container['removeStopWords'] = $data['removeStopWords'];
        }
        if (isset($data['keepDiacriticsOnCharacters'])) {
            $this->container['keepDiacriticsOnCharacters'] = $data['keepDiacriticsOnCharacters'];
        }
        if (isset($data['queryLanguages'])) {
            $this->container['queryLanguages'] = $data['queryLanguages'];
        }
        if (isset($data['decompoundQuery'])) {
            $this->container['decompoundQuery'] = $data['decompoundQuery'];
        }
        if (isset($data['enableRules'])) {
            $this->container['enableRules'] = $data['enableRules'];
        }
        if (isset($data['enablePersonalization'])) {
            $this->container['enablePersonalization'] = $data['enablePersonalization'];
        }
        if (isset($data['queryType'])) {
            $this->container['queryType'] = $data['queryType'];
        }
        if (isset($data['removeWordsIfNoResults'])) {
            $this->container['removeWordsIfNoResults'] = $data['removeWordsIfNoResults'];
        }
        if (isset($data['advancedSyntax'])) {
            $this->container['advancedSyntax'] = $data['advancedSyntax'];
        }
        if (isset($data['optionalWords'])) {
            $this->container['optionalWords'] = $data['optionalWords'];
        }
        if (isset($data['disableExactOnAttributes'])) {
            $this->container['disableExactOnAttributes'] = $data['disableExactOnAttributes'];
        }
        if (isset($data['exactOnSingleWordQuery'])) {
            $this->container['exactOnSingleWordQuery'] = $data['exactOnSingleWordQuery'];
        }
        if (isset($data['alternativesAsExact'])) {
            $this->container['alternativesAsExact'] = $data['alternativesAsExact'];
        }
        if (isset($data['advancedSyntaxFeatures'])) {
            $this->container['advancedSyntaxFeatures'] = $data['advancedSyntaxFeatures'];
        }
        if (isset($data['distinct'])) {
            $this->container['distinct'] = $data['distinct'];
        }
        if (isset($data['synonyms'])) {
            $this->container['synonyms'] = $data['synonyms'];
        }
        if (isset($data['replaceSynonymsInHighlight'])) {
            $this->container['replaceSynonymsInHighlight'] = $data['replaceSynonymsInHighlight'];
        }
        if (isset($data['minProximity'])) {
            $this->container['minProximity'] = $data['minProximity'];
        }
        if (isset($data['responseFields'])) {
            $this->container['responseFields'] = $data['responseFields'];
        }
        if (isset($data['maxFacetHits'])) {
            $this->container['maxFacetHits'] = $data['maxFacetHits'];
        }
        if (isset($data['attributeCriteriaComputedByMinProximity'])) {
            $this->container['attributeCriteriaComputedByMinProximity'] = $data['attributeCriteriaComputedByMinProximity'];
        }
        if (isset($data['renderingContent'])) {
            $this->container['renderingContent'] = $data['renderingContent'];
        }
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        $allowedValues = $this->getTypoToleranceAllowableValues();
        if (isset($this->container['typoTolerance']) && !in_array($this->container['typoTolerance'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'typoTolerance', must be one of '%s'",
                $this->container['typoTolerance'],
                implode("', '", $allowedValues)
            );
        }

        $allowedValues = $this->getQueryTypeAllowableValues();
        if (isset($this->container['queryType']) && !in_array($this->container['queryType'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'queryType', must be one of '%s'",
                $this->container['queryType'],
                implode("', '", $allowedValues)
            );
        }

        $allowedValues = $this->getRemoveWordsIfNoResultsAllowableValues();
        if (isset($this->container['removeWordsIfNoResults']) && !in_array($this->container['removeWordsIfNoResults'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'removeWordsIfNoResults', must be one of '%s'",
                $this->container['removeWordsIfNoResults'],
                implode("', '", $allowedValues)
            );
        }

        $allowedValues = $this->getExactOnSingleWordQueryAllowableValues();
        if (isset($this->container['exactOnSingleWordQuery']) && !in_array($this->container['exactOnSingleWordQuery'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'exactOnSingleWordQuery', must be one of '%s'",
                $this->container['exactOnSingleWordQuery'],
                implode("', '", $allowedValues)
            );
        }

        if (isset($this->container['distinct']) && ($this->container['distinct'] > 4)) {
            $invalidProperties[] = "invalid value for 'distinct', must be smaller than or equal to 4.";
        }

        if (isset($this->container['distinct']) && ($this->container['distinct'] < 0)) {
            $invalidProperties[] = "invalid value for 'distinct', must be bigger than or equal to 0.";
        }

        if (isset($this->container['minProximity']) && ($this->container['minProximity'] > 7)) {
            $invalidProperties[] = "invalid value for 'minProximity', must be smaller than or equal to 7.";
        }

        if (isset($this->container['minProximity']) && ($this->container['minProximity'] < 1)) {
            $invalidProperties[] = "invalid value for 'minProximity', must be bigger than or equal to 1.";
        }

        if (isset($this->container['maxFacetHits']) && ($this->container['maxFacetHits'] > 100)) {
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
     * Gets searchableAttributes
     *
     * @return string[]|null
     */
    public function getSearchableAttributes()
    {
        return $this->container['searchableAttributes'] ?? null;
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
        return $this->container['attributesForFaceting'] ?? null;
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
        return $this->container['unretrievableAttributes'] ?? null;
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
        return $this->container['attributesToRetrieve'] ?? null;
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
        return $this->container['restrictSearchableAttributes'] ?? null;
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
        return $this->container['ranking'] ?? null;
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
        return $this->container['customRanking'] ?? null;
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
        return $this->container['relevancyStrictness'] ?? null;
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
        return $this->container['attributesToHighlight'] ?? null;
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
        return $this->container['attributesToSnippet'] ?? null;
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
        return $this->container['highlightPreTag'] ?? null;
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
        return $this->container['highlightPostTag'] ?? null;
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
        return $this->container['snippetEllipsisText'] ?? null;
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
        return $this->container['restrictHighlightAndSnippetArrays'] ?? null;
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
        return $this->container['hitsPerPage'] ?? null;
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
        return $this->container['minWordSizefor1Typo'] ?? null;
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
        return $this->container['minWordSizefor2Typos'] ?? null;
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
        return $this->container['typoTolerance'] ?? null;
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
        return $this->container['allowTyposOnNumericTokens'] ?? null;
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
        return $this->container['disableTypoToleranceOnAttributes'] ?? null;
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
        return $this->container['separatorsToIndex'] ?? null;
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
        return $this->container['ignorePlurals'] ?? null;
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
        return $this->container['removeStopWords'] ?? null;
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
        return $this->container['keepDiacriticsOnCharacters'] ?? null;
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
        return $this->container['queryLanguages'] ?? null;
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
        return $this->container['decompoundQuery'] ?? null;
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
        return $this->container['enableRules'] ?? null;
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
        return $this->container['enablePersonalization'] ?? null;
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
        return $this->container['queryType'] ?? null;
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
        return $this->container['removeWordsIfNoResults'] ?? null;
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
        return $this->container['advancedSyntax'] ?? null;
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
        return $this->container['optionalWords'] ?? null;
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
        return $this->container['disableExactOnAttributes'] ?? null;
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
        return $this->container['exactOnSingleWordQuery'] ?? null;
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
        return $this->container['alternativesAsExact'] ?? null;
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
        return $this->container['advancedSyntaxFeatures'] ?? null;
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
        return $this->container['distinct'] ?? null;
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
            throw new \InvalidArgumentException('invalid value for $distinct when calling IndexSettingsAsSearchParams., must be smaller than or equal to 4.');
        }
        if (!is_null($distinct) && ($distinct < 0)) {
            throw new \InvalidArgumentException('invalid value for $distinct when calling IndexSettingsAsSearchParams., must be bigger than or equal to 0.');
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
        return $this->container['synonyms'] ?? null;
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
        return $this->container['replaceSynonymsInHighlight'] ?? null;
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
        return $this->container['minProximity'] ?? null;
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
            throw new \InvalidArgumentException('invalid value for $minProximity when calling IndexSettingsAsSearchParams., must be smaller than or equal to 7.');
        }
        if (!is_null($minProximity) && ($minProximity < 1)) {
            throw new \InvalidArgumentException('invalid value for $minProximity when calling IndexSettingsAsSearchParams., must be bigger than or equal to 1.');
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
        return $this->container['responseFields'] ?? null;
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
        return $this->container['maxFacetHits'] ?? null;
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
            throw new \InvalidArgumentException('invalid value for $maxFacetHits when calling IndexSettingsAsSearchParams., must be smaller than or equal to 100.');
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
        return $this->container['attributeCriteriaComputedByMinProximity'] ?? null;
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
        return $this->container['renderingContent'] ?? null;
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
}

