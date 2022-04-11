<?php

namespace Algolia\AlgoliaSearch\Model\Analytics;

/**
 * TopSearchesResponseWithAnalyticsSearches Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class TopSearchesResponseWithAnalyticsSearches extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'search' => 'string',
        'count' => 'int',
        'clickThroughRate' => 'double',
        'averageClickPosition' => 'int',
        'conversionRate' => 'double',
        'trackedSearchCount' => 'int',
        'clickCount' => 'int',
        'conversionCount' => 'int',
        'nbHits' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'search' => null,
        'count' => null,
        'clickThroughRate' => 'double',
        'averageClickPosition' => null,
        'conversionRate' => 'double',
        'trackedSearchCount' => null,
        'clickCount' => null,
        'conversionCount' => null,
        'nbHits' => null,
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
        'search' => 'setSearch',
        'count' => 'setCount',
        'clickThroughRate' => 'setClickThroughRate',
        'averageClickPosition' => 'setAverageClickPosition',
        'conversionRate' => 'setConversionRate',
        'trackedSearchCount' => 'setTrackedSearchCount',
        'clickCount' => 'setClickCount',
        'conversionCount' => 'setConversionCount',
        'nbHits' => 'setNbHits',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'search' => 'getSearch',
        'count' => 'getCount',
        'clickThroughRate' => 'getClickThroughRate',
        'averageClickPosition' => 'getAverageClickPosition',
        'conversionRate' => 'getConversionRate',
        'trackedSearchCount' => 'getTrackedSearchCount',
        'clickCount' => 'getClickCount',
        'conversionCount' => 'getConversionCount',
        'nbHits' => 'getNbHits',
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
        if (isset($data['search'])) {
            $this->container['search'] = $data['search'];
        }
        if (isset($data['count'])) {
            $this->container['count'] = $data['count'];
        }
        if (isset($data['clickThroughRate'])) {
            $this->container['clickThroughRate'] = $data['clickThroughRate'];
        }
        if (isset($data['averageClickPosition'])) {
            $this->container['averageClickPosition'] = $data['averageClickPosition'];
        }
        if (isset($data['conversionRate'])) {
            $this->container['conversionRate'] = $data['conversionRate'];
        }
        if (isset($data['trackedSearchCount'])) {
            $this->container['trackedSearchCount'] = $data['trackedSearchCount'];
        }
        if (isset($data['clickCount'])) {
            $this->container['clickCount'] = $data['clickCount'];
        }
        if (isset($data['conversionCount'])) {
            $this->container['conversionCount'] = $data['conversionCount'];
        }
        if (isset($data['nbHits'])) {
            $this->container['nbHits'] = $data['nbHits'];
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

        if (!isset($this->container['search']) || $this->container['search'] === null) {
            $invalidProperties[] = "'search' can't be null";
        }
        if (!isset($this->container['count']) || $this->container['count'] === null) {
            $invalidProperties[] = "'count' can't be null";
        }
        if (!isset($this->container['clickThroughRate']) || $this->container['clickThroughRate'] === null) {
            $invalidProperties[] = "'clickThroughRate' can't be null";
        }
        if (!isset($this->container['averageClickPosition']) || $this->container['averageClickPosition'] === null) {
            $invalidProperties[] = "'averageClickPosition' can't be null";
        }
        if (!isset($this->container['conversionRate']) || $this->container['conversionRate'] === null) {
            $invalidProperties[] = "'conversionRate' can't be null";
        }
        if (!isset($this->container['trackedSearchCount']) || $this->container['trackedSearchCount'] === null) {
            $invalidProperties[] = "'trackedSearchCount' can't be null";
        }
        if (!isset($this->container['clickCount']) || $this->container['clickCount'] === null) {
            $invalidProperties[] = "'clickCount' can't be null";
        }
        if (!isset($this->container['conversionCount']) || $this->container['conversionCount'] === null) {
            $invalidProperties[] = "'conversionCount' can't be null";
        }
        if (!isset($this->container['nbHits']) || $this->container['nbHits'] === null) {
            $invalidProperties[] = "'nbHits' can't be null";
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
     * Gets search
     *
     * @return string
     */
    public function getSearch()
    {
        return $this->container['search'] ?? null;
    }

    /**
     * Sets search
     *
     * @param string $search the search query
     *
     * @return self
     */
    public function setSearch($search)
    {
        $this->container['search'] = $search;

        return $this;
    }

    /**
     * Gets count
     *
     * @return int
     */
    public function getCount()
    {
        return $this->container['count'] ?? null;
    }

    /**
     * Sets count
     *
     * @param int $count the number of occurrences
     *
     * @return self
     */
    public function setCount($count)
    {
        $this->container['count'] = $count;

        return $this;
    }

    /**
     * Gets clickThroughRate
     *
     * @return float
     */
    public function getClickThroughRate()
    {
        return $this->container['clickThroughRate'] ?? null;
    }

    /**
     * Sets clickThroughRate
     *
     * @param float $clickThroughRate the click-through rate
     *
     * @return self
     */
    public function setClickThroughRate($clickThroughRate)
    {
        $this->container['clickThroughRate'] = $clickThroughRate;

        return $this;
    }

    /**
     * Gets averageClickPosition
     *
     * @return int
     */
    public function getAverageClickPosition()
    {
        return $this->container['averageClickPosition'] ?? null;
    }

    /**
     * Sets averageClickPosition
     *
     * @param int $averageClickPosition the average position of all the click count event
     *
     * @return self
     */
    public function setAverageClickPosition($averageClickPosition)
    {
        $this->container['averageClickPosition'] = $averageClickPosition;

        return $this;
    }

    /**
     * Gets conversionRate
     *
     * @return float
     */
    public function getConversionRate()
    {
        return $this->container['conversionRate'] ?? null;
    }

    /**
     * Sets conversionRate
     *
     * @param float $conversionRate the conversion rate
     *
     * @return self
     */
    public function setConversionRate($conversionRate)
    {
        $this->container['conversionRate'] = $conversionRate;

        return $this;
    }

    /**
     * Gets trackedSearchCount
     *
     * @return int
     */
    public function getTrackedSearchCount()
    {
        return $this->container['trackedSearchCount'] ?? null;
    }

    /**
     * Sets trackedSearchCount
     *
     * @param int $trackedSearchCount the number of tracked search click
     *
     * @return self
     */
    public function setTrackedSearchCount($trackedSearchCount)
    {
        $this->container['trackedSearchCount'] = $trackedSearchCount;

        return $this;
    }

    /**
     * Gets clickCount
     *
     * @return int
     */
    public function getClickCount()
    {
        return $this->container['clickCount'] ?? null;
    }

    /**
     * Sets clickCount
     *
     * @param int $clickCount the number of click event
     *
     * @return self
     */
    public function setClickCount($clickCount)
    {
        $this->container['clickCount'] = $clickCount;

        return $this;
    }

    /**
     * Gets conversionCount
     *
     * @return int
     */
    public function getConversionCount()
    {
        return $this->container['conversionCount'] ?? null;
    }

    /**
     * Sets conversionCount
     *
     * @param int $conversionCount the number of converted clicks
     *
     * @return self
     */
    public function setConversionCount($conversionCount)
    {
        $this->container['conversionCount'] = $conversionCount;

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

