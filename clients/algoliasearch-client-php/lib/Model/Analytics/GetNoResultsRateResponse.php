<?php

namespace Algolia\AlgoliaSearch\Model\Analytics;

/**
 * GetNoResultsRateResponse Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class GetNoResultsRateResponse extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'rate' => 'double',
        'count' => 'int',
        'noResultCount' => 'int',
        'dates' => '\Algolia\AlgoliaSearch\Model\Analytics\GetNoResultsRateResponseDates[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'rate' => 'double',
        'count' => null,
        'noResultCount' => null,
        'dates' => null,
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
        'rate' => 'setRate',
        'count' => 'setCount',
        'noResultCount' => 'setNoResultCount',
        'dates' => 'setDates',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'rate' => 'getRate',
        'count' => 'getCount',
        'noResultCount' => 'getNoResultCount',
        'dates' => 'getDates',
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
        if (isset($data['rate'])) {
            $this->container['rate'] = $data['rate'];
        }
        if (isset($data['count'])) {
            $this->container['count'] = $data['count'];
        }
        if (isset($data['noResultCount'])) {
            $this->container['noResultCount'] = $data['noResultCount'];
        }
        if (isset($data['dates'])) {
            $this->container['dates'] = $data['dates'];
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

        if (!isset($this->container['rate']) || $this->container['rate'] === null) {
            $invalidProperties[] = "'rate' can't be null";
        }
        if (!isset($this->container['count']) || $this->container['count'] === null) {
            $invalidProperties[] = "'count' can't be null";
        }
        if (!isset($this->container['noResultCount']) || $this->container['noResultCount'] === null) {
            $invalidProperties[] = "'noResultCount' can't be null";
        }
        if (!isset($this->container['dates']) || $this->container['dates'] === null) {
            $invalidProperties[] = "'dates' can't be null";
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
     * Gets rate
     *
     * @return float
     */
    public function getRate()
    {
        return $this->container['rate'] ?? null;
    }

    /**
     * Sets rate
     *
     * @param float $rate the click-through rate
     *
     * @return self
     */
    public function setRate($rate)
    {
        $this->container['rate'] = $rate;

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
     * Gets dates
     *
     * @return \Algolia\AlgoliaSearch\Model\Analytics\GetNoResultsRateResponseDates[]
     */
    public function getDates()
    {
        return $this->container['dates'] ?? null;
    }

    /**
     * Sets dates
     *
     * @param \Algolia\AlgoliaSearch\Model\Analytics\GetNoResultsRateResponseDates[] $dates a list of searches without results with their date, rate and counts
     *
     * @return self
     */
    public function setDates($dates)
    {
        $this->container['dates'] = $dates;

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

