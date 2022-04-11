<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * SearchResponse Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class SearchResponse extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'abTestID' => 'int',
        'abTestVariantID' => 'int',
        'aroundLatLng' => 'string',
        'automaticRadius' => 'string',
        'exhaustiveFacetsCount' => 'bool',
        'exhaustiveNbHits' => 'bool',
        'exhaustiveTypo' => 'bool',
        'facets' => 'array<string,array<string,string>>',
        'facetsStats' => 'array<string,\Algolia\AlgoliaSearch\Model\Search\BaseSearchResponseFacetsStats>',
        'hitsPerPage' => 'int',
        'index' => 'string',
        'indexUsed' => 'string',
        'message' => 'string',
        'nbHits' => 'int',
        'nbPages' => 'int',
        'nbSortedHits' => 'int',
        'page' => 'int',
        'params' => 'string',
        'parsedQuery' => 'string',
        'processingTimeMS' => 'int',
        'query' => 'string',
        'queryAfterRemoval' => 'string',
        'serverUsed' => 'string',
        'userData' => 'object',
        'hits' => '\Algolia\AlgoliaSearch\Model\Search\Hit[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'abTestID' => null,
        'abTestVariantID' => null,
        'aroundLatLng' => null,
        'automaticRadius' => null,
        'exhaustiveFacetsCount' => null,
        'exhaustiveNbHits' => null,
        'exhaustiveTypo' => null,
        'facets' => null,
        'facetsStats' => null,
        'hitsPerPage' => null,
        'index' => null,
        'indexUsed' => null,
        'message' => null,
        'nbHits' => null,
        'nbPages' => null,
        'nbSortedHits' => null,
        'page' => null,
        'params' => null,
        'parsedQuery' => null,
        'processingTimeMS' => null,
        'query' => null,
        'queryAfterRemoval' => null,
        'serverUsed' => null,
        'userData' => null,
        'hits' => null,
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
        'abTestID' => 'setAbTestID',
        'abTestVariantID' => 'setAbTestVariantID',
        'aroundLatLng' => 'setAroundLatLng',
        'automaticRadius' => 'setAutomaticRadius',
        'exhaustiveFacetsCount' => 'setExhaustiveFacetsCount',
        'exhaustiveNbHits' => 'setExhaustiveNbHits',
        'exhaustiveTypo' => 'setExhaustiveTypo',
        'facets' => 'setFacets',
        'facetsStats' => 'setFacetsStats',
        'hitsPerPage' => 'setHitsPerPage',
        'index' => 'setIndex',
        'indexUsed' => 'setIndexUsed',
        'message' => 'setMessage',
        'nbHits' => 'setNbHits',
        'nbPages' => 'setNbPages',
        'nbSortedHits' => 'setNbSortedHits',
        'page' => 'setPage',
        'params' => 'setParams',
        'parsedQuery' => 'setParsedQuery',
        'processingTimeMS' => 'setProcessingTimeMS',
        'query' => 'setQuery',
        'queryAfterRemoval' => 'setQueryAfterRemoval',
        'serverUsed' => 'setServerUsed',
        'userData' => 'setUserData',
        'hits' => 'setHits',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'abTestID' => 'getAbTestID',
        'abTestVariantID' => 'getAbTestVariantID',
        'aroundLatLng' => 'getAroundLatLng',
        'automaticRadius' => 'getAutomaticRadius',
        'exhaustiveFacetsCount' => 'getExhaustiveFacetsCount',
        'exhaustiveNbHits' => 'getExhaustiveNbHits',
        'exhaustiveTypo' => 'getExhaustiveTypo',
        'facets' => 'getFacets',
        'facetsStats' => 'getFacetsStats',
        'hitsPerPage' => 'getHitsPerPage',
        'index' => 'getIndex',
        'indexUsed' => 'getIndexUsed',
        'message' => 'getMessage',
        'nbHits' => 'getNbHits',
        'nbPages' => 'getNbPages',
        'nbSortedHits' => 'getNbSortedHits',
        'page' => 'getPage',
        'params' => 'getParams',
        'parsedQuery' => 'getParsedQuery',
        'processingTimeMS' => 'getProcessingTimeMS',
        'query' => 'getQuery',
        'queryAfterRemoval' => 'getQueryAfterRemoval',
        'serverUsed' => 'getServerUsed',
        'userData' => 'getUserData',
        'hits' => 'getHits',
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
        if (isset($data['abTestID'])) {
            $this->container['abTestID'] = $data['abTestID'];
        }
        if (isset($data['abTestVariantID'])) {
            $this->container['abTestVariantID'] = $data['abTestVariantID'];
        }
        if (isset($data['aroundLatLng'])) {
            $this->container['aroundLatLng'] = $data['aroundLatLng'];
        }
        if (isset($data['automaticRadius'])) {
            $this->container['automaticRadius'] = $data['automaticRadius'];
        }
        if (isset($data['exhaustiveFacetsCount'])) {
            $this->container['exhaustiveFacetsCount'] = $data['exhaustiveFacetsCount'];
        }
        if (isset($data['exhaustiveNbHits'])) {
            $this->container['exhaustiveNbHits'] = $data['exhaustiveNbHits'];
        }
        if (isset($data['exhaustiveTypo'])) {
            $this->container['exhaustiveTypo'] = $data['exhaustiveTypo'];
        }
        if (isset($data['facets'])) {
            $this->container['facets'] = $data['facets'];
        }
        if (isset($data['facetsStats'])) {
            $this->container['facetsStats'] = $data['facetsStats'];
        }
        if (isset($data['hitsPerPage'])) {
            $this->container['hitsPerPage'] = $data['hitsPerPage'];
        }
        if (isset($data['index'])) {
            $this->container['index'] = $data['index'];
        }
        if (isset($data['indexUsed'])) {
            $this->container['indexUsed'] = $data['indexUsed'];
        }
        if (isset($data['message'])) {
            $this->container['message'] = $data['message'];
        }
        if (isset($data['nbHits'])) {
            $this->container['nbHits'] = $data['nbHits'];
        }
        if (isset($data['nbPages'])) {
            $this->container['nbPages'] = $data['nbPages'];
        }
        if (isset($data['nbSortedHits'])) {
            $this->container['nbSortedHits'] = $data['nbSortedHits'];
        }
        if (isset($data['page'])) {
            $this->container['page'] = $data['page'];
        }
        if (isset($data['params'])) {
            $this->container['params'] = $data['params'];
        }
        if (isset($data['parsedQuery'])) {
            $this->container['parsedQuery'] = $data['parsedQuery'];
        }
        if (isset($data['processingTimeMS'])) {
            $this->container['processingTimeMS'] = $data['processingTimeMS'];
        }
        if (isset($data['query'])) {
            $this->container['query'] = $data['query'];
        }
        if (isset($data['queryAfterRemoval'])) {
            $this->container['queryAfterRemoval'] = $data['queryAfterRemoval'];
        }
        if (isset($data['serverUsed'])) {
            $this->container['serverUsed'] = $data['serverUsed'];
        }
        if (isset($data['userData'])) {
            $this->container['userData'] = $data['userData'];
        }
        if (isset($data['hits'])) {
            $this->container['hits'] = $data['hits'];
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

        if (isset($this->container['aroundLatLng']) && !preg_match('/^(-?\\d+(\\.\\d+)?),\\s*(-?\\d+(\\.\\d+)?)$/', $this->container['aroundLatLng'])) {
            $invalidProperties[] = "invalid value for 'aroundLatLng', must be conform to the pattern /^(-?\\d+(\\.\\d+)?),\\s*(-?\\d+(\\.\\d+)?)$/.";
        }

        if (!isset($this->container['exhaustiveNbHits']) || $this->container['exhaustiveNbHits'] === null) {
            $invalidProperties[] = "'exhaustiveNbHits' can't be null";
        }
        if (!isset($this->container['exhaustiveTypo']) || $this->container['exhaustiveTypo'] === null) {
            $invalidProperties[] = "'exhaustiveTypo' can't be null";
        }
        if (!isset($this->container['hitsPerPage']) || $this->container['hitsPerPage'] === null) {
            $invalidProperties[] = "'hitsPerPage' can't be null";
        }
        if (!isset($this->container['nbHits']) || $this->container['nbHits'] === null) {
            $invalidProperties[] = "'nbHits' can't be null";
        }
        if (!isset($this->container['nbPages']) || $this->container['nbPages'] === null) {
            $invalidProperties[] = "'nbPages' can't be null";
        }
        if (!isset($this->container['page']) || $this->container['page'] === null) {
            $invalidProperties[] = "'page' can't be null";
        }
        if (!isset($this->container['params']) || $this->container['params'] === null) {
            $invalidProperties[] = "'params' can't be null";
        }
        if (!isset($this->container['processingTimeMS']) || $this->container['processingTimeMS'] === null) {
            $invalidProperties[] = "'processingTimeMS' can't be null";
        }
        if (!isset($this->container['query']) || $this->container['query'] === null) {
            $invalidProperties[] = "'query' can't be null";
        }
        if (!isset($this->container['hits']) || $this->container['hits'] === null) {
            $invalidProperties[] = "'hits' can't be null";
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
     * Gets abTestID
     *
     * @return int|null
     */
    public function getAbTestID()
    {
        return $this->container['abTestID'] ?? null;
    }

    /**
     * Sets abTestID
     *
     * @param int|null $abTestID if a search encounters an index that is being A/B tested, abTestID reports the ongoing A/B test ID
     *
     * @return self
     */
    public function setAbTestID($abTestID)
    {
        $this->container['abTestID'] = $abTestID;

        return $this;
    }

    /**
     * Gets abTestVariantID
     *
     * @return int|null
     */
    public function getAbTestVariantID()
    {
        return $this->container['abTestVariantID'] ?? null;
    }

    /**
     * Sets abTestVariantID
     *
     * @param int|null $abTestVariantID if a search encounters an index that is being A/B tested, abTestVariantID reports the variant ID of the index used
     *
     * @return self
     */
    public function setAbTestVariantID($abTestVariantID)
    {
        $this->container['abTestVariantID'] = $abTestVariantID;

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
     * @param string|null $aroundLatLng the computed geo location
     *
     * @return self
     */
    public function setAroundLatLng($aroundLatLng)
    {
        if (!is_null($aroundLatLng) && (!preg_match('/^(-?\\d+(\\.\\d+)?),\\s*(-?\\d+(\\.\\d+)?)$/', $aroundLatLng))) {
            throw new \InvalidArgumentException("invalid value for $aroundLatLng when calling SearchResponse., must conform to the pattern /^(-?\\d+(\\.\\d+)?),\\s*(-?\\d+(\\.\\d+)?)$/.");
        }

        $this->container['aroundLatLng'] = $aroundLatLng;

        return $this;
    }

    /**
     * Gets automaticRadius
     *
     * @return string|null
     */
    public function getAutomaticRadius()
    {
        return $this->container['automaticRadius'] ?? null;
    }

    /**
     * Sets automaticRadius
     *
     * @param string|null $automaticRadius The automatically computed radius. For legacy reasons, this parameter is a string and not an integer.
     *
     * @return self
     */
    public function setAutomaticRadius($automaticRadius)
    {
        $this->container['automaticRadius'] = $automaticRadius;

        return $this;
    }

    /**
     * Gets exhaustiveFacetsCount
     *
     * @return bool|null
     */
    public function getExhaustiveFacetsCount()
    {
        return $this->container['exhaustiveFacetsCount'] ?? null;
    }

    /**
     * Sets exhaustiveFacetsCount
     *
     * @param bool|null $exhaustiveFacetsCount whether the facet count is exhaustive or approximate
     *
     * @return self
     */
    public function setExhaustiveFacetsCount($exhaustiveFacetsCount)
    {
        $this->container['exhaustiveFacetsCount'] = $exhaustiveFacetsCount;

        return $this;
    }

    /**
     * Gets exhaustiveNbHits
     *
     * @return bool
     */
    public function getExhaustiveNbHits()
    {
        return $this->container['exhaustiveNbHits'] ?? null;
    }

    /**
     * Sets exhaustiveNbHits
     *
     * @param bool $exhaustiveNbHits indicate if the nbHits count was exhaustive or approximate
     *
     * @return self
     */
    public function setExhaustiveNbHits($exhaustiveNbHits)
    {
        $this->container['exhaustiveNbHits'] = $exhaustiveNbHits;

        return $this;
    }

    /**
     * Gets exhaustiveTypo
     *
     * @return bool
     */
    public function getExhaustiveTypo()
    {
        return $this->container['exhaustiveTypo'] ?? null;
    }

    /**
     * Sets exhaustiveTypo
     *
     * @param bool $exhaustiveTypo indicate if the typo-tolerence search was exhaustive or approximate (only included when typo-tolerance is enabled)
     *
     * @return self
     */
    public function setExhaustiveTypo($exhaustiveTypo)
    {
        $this->container['exhaustiveTypo'] = $exhaustiveTypo;

        return $this;
    }

    /**
     * Gets facets
     *
     * @return array<string,array<string,string>>|null
     */
    public function getFacets()
    {
        return $this->container['facets'] ?? null;
    }

    /**
     * Sets facets
     *
     * @param array<string,array<string,string>>|null $facets a mapping of each facet name to the corresponding facet counts
     *
     * @return self
     */
    public function setFacets($facets)
    {
        $this->container['facets'] = $facets;

        return $this;
    }

    /**
     * Gets facetsStats
     *
     * @return array<string,\Algolia\AlgoliaSearch\Model\Search\BaseSearchResponseFacetsStats>|null
     */
    public function getFacetsStats()
    {
        return $this->container['facetsStats'] ?? null;
    }

    /**
     * Sets facetsStats
     *
     * @param array<string,\Algolia\AlgoliaSearch\Model\Search\BaseSearchResponseFacetsStats>|null $facetsStats statistics for numerical facets
     *
     * @return self
     */
    public function setFacetsStats($facetsStats)
    {
        $this->container['facetsStats'] = $facetsStats;

        return $this;
    }

    /**
     * Gets hitsPerPage
     *
     * @return int
     */
    public function getHitsPerPage()
    {
        return $this->container['hitsPerPage'] ?? null;
    }

    /**
     * Sets hitsPerPage
     *
     * @param int $hitsPerPage set the number of hits per page
     *
     * @return self
     */
    public function setHitsPerPage($hitsPerPage)
    {
        $this->container['hitsPerPage'] = $hitsPerPage;

        return $this;
    }

    /**
     * Gets index
     *
     * @return string|null
     */
    public function getIndex()
    {
        return $this->container['index'] ?? null;
    }

    /**
     * Sets index
     *
     * @param string|null $index index name used for the query
     *
     * @return self
     */
    public function setIndex($index)
    {
        $this->container['index'] = $index;

        return $this;
    }

    /**
     * Gets indexUsed
     *
     * @return string|null
     */
    public function getIndexUsed()
    {
        return $this->container['indexUsed'] ?? null;
    }

    /**
     * Sets indexUsed
     *
     * @param string|null $indexUsed Index name used for the query. In the case of an A/B test, the targeted index isn't always the index used by the query.
     *
     * @return self
     */
    public function setIndexUsed($indexUsed)
    {
        $this->container['indexUsed'] = $indexUsed;

        return $this;
    }

    /**
     * Gets message
     *
     * @return string|null
     */
    public function getMessage()
    {
        return $this->container['message'] ?? null;
    }

    /**
     * Sets message
     *
     * @param string|null $message used to return warnings about the query
     *
     * @return self
     */
    public function setMessage($message)
    {
        $this->container['message'] = $message;

        return $this;
    }

    /**
     * Gets nbHits
     *
     * @return int
     */
    public function getNbHits()
    {
        return $this->container['nbHits'] ?? null;
    }

    /**
     * Sets nbHits
     *
     * @param int $nbHits number of hits that the search query matched
     *
     * @return self
     */
    public function setNbHits($nbHits)
    {
        $this->container['nbHits'] = $nbHits;

        return $this;
    }

    /**
     * Gets nbPages
     *
     * @return int
     */
    public function getNbPages()
    {
        return $this->container['nbPages'] ?? null;
    }

    /**
     * Sets nbPages
     *
     * @param int $nbPages number of pages available for the current query
     *
     * @return self
     */
    public function setNbPages($nbPages)
    {
        $this->container['nbPages'] = $nbPages;

        return $this;
    }

    /**
     * Gets nbSortedHits
     *
     * @return int|null
     */
    public function getNbSortedHits()
    {
        return $this->container['nbSortedHits'] ?? null;
    }

    /**
     * Sets nbSortedHits
     *
     * @param int|null $nbSortedHits the number of hits selected and sorted by the relevant sort algorithm
     *
     * @return self
     */
    public function setNbSortedHits($nbSortedHits)
    {
        $this->container['nbSortedHits'] = $nbSortedHits;

        return $this;
    }

    /**
     * Gets page
     *
     * @return int
     */
    public function getPage()
    {
        return $this->container['page'] ?? null;
    }

    /**
     * Sets page
     *
     * @param int $page specify the page to retrieve
     *
     * @return self
     */
    public function setPage($page)
    {
        $this->container['page'] = $page;

        return $this;
    }

    /**
     * Gets params
     *
     * @return string
     */
    public function getParams()
    {
        return $this->container['params'] ?? null;
    }

    /**
     * Sets params
     *
     * @param string $params a url-encoded string of all search parameters
     *
     * @return self
     */
    public function setParams($params)
    {
        $this->container['params'] = $params;

        return $this;
    }

    /**
     * Gets parsedQuery
     *
     * @return string|null
     */
    public function getParsedQuery()
    {
        return $this->container['parsedQuery'] ?? null;
    }

    /**
     * Sets parsedQuery
     *
     * @param string|null $parsedQuery the query string that will be searched, after normalization
     *
     * @return self
     */
    public function setParsedQuery($parsedQuery)
    {
        $this->container['parsedQuery'] = $parsedQuery;

        return $this;
    }

    /**
     * Gets processingTimeMS
     *
     * @return int
     */
    public function getProcessingTimeMS()
    {
        return $this->container['processingTimeMS'] ?? null;
    }

    /**
     * Sets processingTimeMS
     *
     * @param int $processingTimeMS time the server took to process the request, in milliseconds
     *
     * @return self
     */
    public function setProcessingTimeMS($processingTimeMS)
    {
        $this->container['processingTimeMS'] = $processingTimeMS;

        return $this;
    }

    /**
     * Gets query
     *
     * @return string
     */
    public function getQuery()
    {
        return $this->container['query'] ?? null;
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
     * Gets queryAfterRemoval
     *
     * @return string|null
     */
    public function getQueryAfterRemoval()
    {
        return $this->container['queryAfterRemoval'] ?? null;
    }

    /**
     * Sets queryAfterRemoval
     *
     * @param string|null $queryAfterRemoval a markup text indicating which parts of the original query have been removed in order to retrieve a non-empty result set
     *
     * @return self
     */
    public function setQueryAfterRemoval($queryAfterRemoval)
    {
        $this->container['queryAfterRemoval'] = $queryAfterRemoval;

        return $this;
    }

    /**
     * Gets serverUsed
     *
     * @return string|null
     */
    public function getServerUsed()
    {
        return $this->container['serverUsed'] ?? null;
    }

    /**
     * Sets serverUsed
     *
     * @param string|null $serverUsed actual host name of the server that processed the request
     *
     * @return self
     */
    public function setServerUsed($serverUsed)
    {
        $this->container['serverUsed'] = $serverUsed;

        return $this;
    }

    /**
     * Gets userData
     *
     * @return object|null
     */
    public function getUserData()
    {
        return $this->container['userData'] ?? null;
    }

    /**
     * Sets userData
     *
     * @param object|null $userData lets you store custom data in your indices
     *
     * @return self
     */
    public function setUserData($userData)
    {
        $this->container['userData'] = $userData;

        return $this;
    }

    /**
     * Gets hits
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\Hit[]
     */
    public function getHits()
    {
        return $this->container['hits'] ?? null;
    }

    /**
     * Sets hits
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\Hit[] $hits hits
     *
     * @return self
     */
    public function setHits($hits)
    {
        $this->container['hits'] = $hits;

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

