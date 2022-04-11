<?php

namespace Algolia\AlgoliaSearch\Model\Abtesting;

/**
 * Variant Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class Variant extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'averageClickPosition' => 'int',
        'clickCount' => 'int',
        'clickThroughRate' => 'double',
        'conversionCount' => 'int',
        'conversionRate' => 'double',
        'description' => 'string',
        'index' => 'string',
        'noResultCount' => 'int',
        'searchCount' => 'int',
        'trackedSearchCount' => 'int',
        'trafficPercentage' => 'int',
        'userCount' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'averageClickPosition' => null,
        'clickCount' => null,
        'clickThroughRate' => 'double',
        'conversionCount' => null,
        'conversionRate' => 'double',
        'description' => null,
        'index' => null,
        'noResultCount' => null,
        'searchCount' => null,
        'trackedSearchCount' => null,
        'trafficPercentage' => null,
        'userCount' => null,
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
        'averageClickPosition' => 'setAverageClickPosition',
        'clickCount' => 'setClickCount',
        'clickThroughRate' => 'setClickThroughRate',
        'conversionCount' => 'setConversionCount',
        'conversionRate' => 'setConversionRate',
        'description' => 'setDescription',
        'index' => 'setIndex',
        'noResultCount' => 'setNoResultCount',
        'searchCount' => 'setSearchCount',
        'trackedSearchCount' => 'setTrackedSearchCount',
        'trafficPercentage' => 'setTrafficPercentage',
        'userCount' => 'setUserCount',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'averageClickPosition' => 'getAverageClickPosition',
        'clickCount' => 'getClickCount',
        'clickThroughRate' => 'getClickThroughRate',
        'conversionCount' => 'getConversionCount',
        'conversionRate' => 'getConversionRate',
        'description' => 'getDescription',
        'index' => 'getIndex',
        'noResultCount' => 'getNoResultCount',
        'searchCount' => 'getSearchCount',
        'trackedSearchCount' => 'getTrackedSearchCount',
        'trafficPercentage' => 'getTrafficPercentage',
        'userCount' => 'getUserCount',
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
        if (isset($data['averageClickPosition'])) {
            $this->container['averageClickPosition'] = $data['averageClickPosition'];
        }
        if (isset($data['clickCount'])) {
            $this->container['clickCount'] = $data['clickCount'];
        }
        if (isset($data['clickThroughRate'])) {
            $this->container['clickThroughRate'] = $data['clickThroughRate'];
        }
        if (isset($data['conversionCount'])) {
            $this->container['conversionCount'] = $data['conversionCount'];
        }
        if (isset($data['conversionRate'])) {
            $this->container['conversionRate'] = $data['conversionRate'];
        }
        if (isset($data['description'])) {
            $this->container['description'] = $data['description'];
        }
        if (isset($data['index'])) {
            $this->container['index'] = $data['index'];
        }
        if (isset($data['noResultCount'])) {
            $this->container['noResultCount'] = $data['noResultCount'];
        }
        if (isset($data['searchCount'])) {
            $this->container['searchCount'] = $data['searchCount'];
        }
        if (isset($data['trackedSearchCount'])) {
            $this->container['trackedSearchCount'] = $data['trackedSearchCount'];
        }
        if (isset($data['trafficPercentage'])) {
            $this->container['trafficPercentage'] = $data['trafficPercentage'];
        }
        if (isset($data['userCount'])) {
            $this->container['userCount'] = $data['userCount'];
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

        if (!isset($this->container['averageClickPosition']) || $this->container['averageClickPosition'] === null) {
            $invalidProperties[] = "'averageClickPosition' can't be null";
        }
        if (!isset($this->container['clickCount']) || $this->container['clickCount'] === null) {
            $invalidProperties[] = "'clickCount' can't be null";
        }
        if (!isset($this->container['clickThroughRate']) || $this->container['clickThroughRate'] === null) {
            $invalidProperties[] = "'clickThroughRate' can't be null";
        }
        if (!isset($this->container['conversionCount']) || $this->container['conversionCount'] === null) {
            $invalidProperties[] = "'conversionCount' can't be null";
        }
        if (!isset($this->container['conversionRate']) || $this->container['conversionRate'] === null) {
            $invalidProperties[] = "'conversionRate' can't be null";
        }
        if (!isset($this->container['description']) || $this->container['description'] === null) {
            $invalidProperties[] = "'description' can't be null";
        }
        if (!isset($this->container['index']) || $this->container['index'] === null) {
            $invalidProperties[] = "'index' can't be null";
        }
        if (!isset($this->container['noResultCount']) || $this->container['noResultCount'] === null) {
            $invalidProperties[] = "'noResultCount' can't be null";
        }
        if (!isset($this->container['searchCount']) || $this->container['searchCount'] === null) {
            $invalidProperties[] = "'searchCount' can't be null";
        }
        if (!isset($this->container['trackedSearchCount']) || $this->container['trackedSearchCount'] === null) {
            $invalidProperties[] = "'trackedSearchCount' can't be null";
        }
        if (!isset($this->container['trafficPercentage']) || $this->container['trafficPercentage'] === null) {
            $invalidProperties[] = "'trafficPercentage' can't be null";
        }
        if (!isset($this->container['userCount']) || $this->container['userCount'] === null) {
            $invalidProperties[] = "'userCount' can't be null";
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
     * @param int $averageClickPosition average click position for the variant
     *
     * @return self
     */
    public function setAverageClickPosition($averageClickPosition)
    {
        $this->container['averageClickPosition'] = $averageClickPosition;

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
     * @param int $clickCount distinct click count for the variant
     *
     * @return self
     */
    public function setClickCount($clickCount)
    {
        $this->container['clickCount'] = $clickCount;

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
     * @param float $clickThroughRate click through rate for the variant
     *
     * @return self
     */
    public function setClickThroughRate($clickThroughRate)
    {
        $this->container['clickThroughRate'] = $clickThroughRate;

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
     * @param int $conversionCount distinct conversion count for the variant
     *
     * @return self
     */
    public function setConversionCount($conversionCount)
    {
        $this->container['conversionCount'] = $conversionCount;

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
     * @param float $conversionRate conversion rate for the variant
     *
     * @return self
     */
    public function setConversionRate($conversionRate)
    {
        $this->container['conversionRate'] = $conversionRate;

        return $this;
    }

    /**
     * Gets description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->container['description'] ?? null;
    }

    /**
     * Sets description
     *
     * @param string $description the A/B test description
     *
     * @return self
     */
    public function setDescription($description)
    {
        $this->container['description'] = $description;

        return $this;
    }

    /**
     * Gets index
     *
     * @return string
     */
    public function getIndex()
    {
        return $this->container['index'] ?? null;
    }

    /**
     * Sets index
     *
     * @param string $index the index performing the A/B test
     *
     * @return self
     */
    public function setIndex($index)
    {
        $this->container['index'] = $index;

        return $this;
    }

    /**
     * Gets noResultCount
     *
     * @return int
     */
    public function getNoResultCount()
    {
        return $this->container['noResultCount'] ?? null;
    }

    /**
     * Sets noResultCount
     *
     * @param int $noResultCount the number of occurrences
     *
     * @return self
     */
    public function setNoResultCount($noResultCount)
    {
        $this->container['noResultCount'] = $noResultCount;

        return $this;
    }

    /**
     * Gets searchCount
     *
     * @return int
     */
    public function getSearchCount()
    {
        return $this->container['searchCount'] ?? null;
    }

    /**
     * Sets searchCount
     *
     * @param int $searchCount the number of search during the A/B test
     *
     * @return self
     */
    public function setSearchCount($searchCount)
    {
        $this->container['searchCount'] = $searchCount;

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
     * Gets trafficPercentage
     *
     * @return int
     */
    public function getTrafficPercentage()
    {
        return $this->container['trafficPercentage'] ?? null;
    }

    /**
     * Sets trafficPercentage
     *
     * @param int $trafficPercentage the traffic perfecentage for the A/B test
     *
     * @return self
     */
    public function setTrafficPercentage($trafficPercentage)
    {
        $this->container['trafficPercentage'] = $trafficPercentage;

        return $this;
    }

    /**
     * Gets userCount
     *
     * @return int
     */
    public function getUserCount()
    {
        return $this->container['userCount'] ?? null;
    }

    /**
     * Sets userCount
     *
     * @param int $userCount the number of user during the A/B test
     *
     * @return self
     */
    public function setUserCount($userCount)
    {
        $this->container['userCount'] = $userCount;

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

