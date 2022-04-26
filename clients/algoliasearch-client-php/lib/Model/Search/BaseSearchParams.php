<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * BaseSearchParams Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class BaseSearchParams extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'similarQuery' => 'string',
        'filters' => 'string',
        'facetFilters' => '\Algolia\AlgoliaSearch\Model\Search\FacetFilters',
        'optionalFilters' => '\Algolia\AlgoliaSearch\Model\Search\OptionalFilters',
        'numericFilters' => '\Algolia\AlgoliaSearch\Model\Search\NumericFilters',
        'tagFilters' => '\Algolia\AlgoliaSearch\Model\Search\TagFilters',
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
        'aroundRadius' => '\Algolia\AlgoliaSearch\Model\Search\AroundRadius',
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
        'reRankingApplyFilter' => '\Algolia\AlgoliaSearch\Model\Search\ReRankingApplyFilter',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
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
        'reRankingApplyFilter' => null,
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
        'reRankingApplyFilter' => 'setReRankingApplyFilter',
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
        'reRankingApplyFilter' => 'getReRankingApplyFilter',
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
        if (isset($data['similarQuery'])) {
            $this->container['similarQuery'] = $data['similarQuery'];
        }
        if (isset($data['filters'])) {
            $this->container['filters'] = $data['filters'];
        }
        if (isset($data['facetFilters'])) {
            $this->container['facetFilters'] = $data['facetFilters'];
        }
        if (isset($data['optionalFilters'])) {
            $this->container['optionalFilters'] = $data['optionalFilters'];
        }
        if (isset($data['numericFilters'])) {
            $this->container['numericFilters'] = $data['numericFilters'];
        }
        if (isset($data['tagFilters'])) {
            $this->container['tagFilters'] = $data['tagFilters'];
        }
        if (isset($data['sumOrFiltersScores'])) {
            $this->container['sumOrFiltersScores'] = $data['sumOrFiltersScores'];
        }
        if (isset($data['facets'])) {
            $this->container['facets'] = $data['facets'];
        }
        if (isset($data['maxValuesPerFacet'])) {
            $this->container['maxValuesPerFacet'] = $data['maxValuesPerFacet'];
        }
        if (isset($data['facetingAfterDistinct'])) {
            $this->container['facetingAfterDistinct'] = $data['facetingAfterDistinct'];
        }
        if (isset($data['sortFacetValuesBy'])) {
            $this->container['sortFacetValuesBy'] = $data['sortFacetValuesBy'];
        }
        if (isset($data['page'])) {
            $this->container['page'] = $data['page'];
        }
        if (isset($data['offset'])) {
            $this->container['offset'] = $data['offset'];
        }
        if (isset($data['length'])) {
            $this->container['length'] = $data['length'];
        }
        if (isset($data['aroundLatLng'])) {
            $this->container['aroundLatLng'] = $data['aroundLatLng'];
        }
        if (isset($data['aroundLatLngViaIP'])) {
            $this->container['aroundLatLngViaIP'] = $data['aroundLatLngViaIP'];
        }
        if (isset($data['aroundRadius'])) {
            $this->container['aroundRadius'] = $data['aroundRadius'];
        }
        if (isset($data['aroundPrecision'])) {
            $this->container['aroundPrecision'] = $data['aroundPrecision'];
        }
        if (isset($data['minimumAroundRadius'])) {
            $this->container['minimumAroundRadius'] = $data['minimumAroundRadius'];
        }
        if (isset($data['insideBoundingBox'])) {
            $this->container['insideBoundingBox'] = $data['insideBoundingBox'];
        }
        if (isset($data['insidePolygon'])) {
            $this->container['insidePolygon'] = $data['insidePolygon'];
        }
        if (isset($data['naturalLanguages'])) {
            $this->container['naturalLanguages'] = $data['naturalLanguages'];
        }
        if (isset($data['ruleContexts'])) {
            $this->container['ruleContexts'] = $data['ruleContexts'];
        }
        if (isset($data['personalizationImpact'])) {
            $this->container['personalizationImpact'] = $data['personalizationImpact'];
        }
        if (isset($data['userToken'])) {
            $this->container['userToken'] = $data['userToken'];
        }
        if (isset($data['getRankingInfo'])) {
            $this->container['getRankingInfo'] = $data['getRankingInfo'];
        }
        if (isset($data['clickAnalytics'])) {
            $this->container['clickAnalytics'] = $data['clickAnalytics'];
        }
        if (isset($data['analytics'])) {
            $this->container['analytics'] = $data['analytics'];
        }
        if (isset($data['analyticsTags'])) {
            $this->container['analyticsTags'] = $data['analyticsTags'];
        }
        if (isset($data['percentileComputation'])) {
            $this->container['percentileComputation'] = $data['percentileComputation'];
        }
        if (isset($data['enableABTest'])) {
            $this->container['enableABTest'] = $data['enableABTest'];
        }
        if (isset($data['enableReRanking'])) {
            $this->container['enableReRanking'] = $data['enableReRanking'];
        }
        if (isset($data['reRankingApplyFilter'])) {
            $this->container['reRankingApplyFilter'] = $data['reRankingApplyFilter'];
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

        if (isset($this->container['length']) && ($this->container['length'] > 1000)) {
            $invalidProperties[] = "invalid value for 'length', must be smaller than or equal to 1000.";
        }

        if (isset($this->container['length']) && ($this->container['length'] < 1)) {
            $invalidProperties[] = "invalid value for 'length', must be bigger than or equal to 1.";
        }

        if (isset($this->container['minimumAroundRadius']) && ($this->container['minimumAroundRadius'] < 1)) {
            $invalidProperties[] = "invalid value for 'minimumAroundRadius', must be bigger than or equal to 1.";
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
        return $this->container['similarQuery'] ?? null;
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
        return $this->container['filters'] ?? null;
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
     * @return \Algolia\AlgoliaSearch\Model\Search\FacetFilters|null
     */
    public function getFacetFilters()
    {
        return $this->container['facetFilters'] ?? null;
    }

    /**
     * Sets facetFilters
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\FacetFilters|null $facetFilters facetFilters
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
     * @return \Algolia\AlgoliaSearch\Model\Search\OptionalFilters|null
     */
    public function getOptionalFilters()
    {
        return $this->container['optionalFilters'] ?? null;
    }

    /**
     * Sets optionalFilters
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\OptionalFilters|null $optionalFilters optionalFilters
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
     * @return \Algolia\AlgoliaSearch\Model\Search\NumericFilters|null
     */
    public function getNumericFilters()
    {
        return $this->container['numericFilters'] ?? null;
    }

    /**
     * Sets numericFilters
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\NumericFilters|null $numericFilters numericFilters
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
     * @return \Algolia\AlgoliaSearch\Model\Search\TagFilters|null
     */
    public function getTagFilters()
    {
        return $this->container['tagFilters'] ?? null;
    }

    /**
     * Sets tagFilters
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\TagFilters|null $tagFilters tagFilters
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
        return $this->container['sumOrFiltersScores'] ?? null;
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
        return $this->container['facets'] ?? null;
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
        return $this->container['maxValuesPerFacet'] ?? null;
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
        return $this->container['facetingAfterDistinct'] ?? null;
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
        return $this->container['sortFacetValuesBy'] ?? null;
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
        return $this->container['page'] ?? null;
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
        return $this->container['offset'] ?? null;
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
        return $this->container['length'] ?? null;
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
            throw new \InvalidArgumentException('invalid value for $length when calling BaseSearchParams., must be smaller than or equal to 1000.');
        }
        if (!is_null($length) && ($length < 1)) {
            throw new \InvalidArgumentException('invalid value for $length when calling BaseSearchParams., must be bigger than or equal to 1.');
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
        return $this->container['aroundLatLng'] ?? null;
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
        return $this->container['aroundLatLngViaIP'] ?? null;
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
     * @return \Algolia\AlgoliaSearch\Model\Search\AroundRadius|null
     */
    public function getAroundRadius()
    {
        return $this->container['aroundRadius'] ?? null;
    }

    /**
     * Sets aroundRadius
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\AroundRadius|null $aroundRadius aroundRadius
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
        return $this->container['aroundPrecision'] ?? null;
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
        return $this->container['minimumAroundRadius'] ?? null;
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
            throw new \InvalidArgumentException('invalid value for $minimumAroundRadius when calling BaseSearchParams., must be bigger than or equal to 1.');
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
        return $this->container['insideBoundingBox'] ?? null;
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
        return $this->container['insidePolygon'] ?? null;
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
        return $this->container['naturalLanguages'] ?? null;
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
        return $this->container['ruleContexts'] ?? null;
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
        return $this->container['personalizationImpact'] ?? null;
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
        return $this->container['userToken'] ?? null;
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
        return $this->container['getRankingInfo'] ?? null;
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
        return $this->container['clickAnalytics'] ?? null;
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
        return $this->container['analytics'] ?? null;
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
        return $this->container['analyticsTags'] ?? null;
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
        return $this->container['percentileComputation'] ?? null;
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
        return $this->container['enableABTest'] ?? null;
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
        return $this->container['enableReRanking'] ?? null;
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
     * Gets reRankingApplyFilter
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\ReRankingApplyFilter|null
     */
    public function getReRankingApplyFilter()
    {
        return $this->container['reRankingApplyFilter'] ?? null;
    }

    /**
     * Sets reRankingApplyFilter
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\ReRankingApplyFilter|null $reRankingApplyFilter reRankingApplyFilter
     *
     * @return self
     */
    public function setReRankingApplyFilter($reRankingApplyFilter)
    {
        $this->container['reRankingApplyFilter'] = $reRankingApplyFilter;

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

