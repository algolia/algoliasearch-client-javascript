<?php

namespace Algolia\AlgoliaSearch\Model\Analytics;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * GetTopSearchesResponseWithAnalyticsSearches Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class GetTopSearchesResponseWithAnalyticsSearches implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'getTopSearchesResponseWithAnalytics_searches';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
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
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
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
        'search' => 'search',
        'count' => 'count',
        'clickThroughRate' => 'clickThroughRate',
        'averageClickPosition' => 'averageClickPosition',
        'conversionRate' => 'conversionRate',
        'trackedSearchCount' => 'trackedSearchCount',
        'clickCount' => 'clickCount',
        'conversionCount' => 'conversionCount',
        'nbHits' => 'nbHits',
    ];

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
        $this->container['search'] = $data['search'] ?? null;
        $this->container['count'] = $data['count'] ?? null;
        $this->container['clickThroughRate'] = $data['clickThroughRate'] ?? null;
        $this->container['averageClickPosition'] = $data['averageClickPosition'] ?? null;
        $this->container['conversionRate'] = $data['conversionRate'] ?? null;
        $this->container['trackedSearchCount'] = $data['trackedSearchCount'] ?? null;
        $this->container['clickCount'] = $data['clickCount'] ?? null;
        $this->container['conversionCount'] = $data['conversionCount'] ?? null;
        $this->container['nbHits'] = $data['nbHits'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['search'] === null) {
            $invalidProperties[] = "'search' can't be null";
        }
        if ($this->container['count'] === null) {
            $invalidProperties[] = "'count' can't be null";
        }
        if ($this->container['clickThroughRate'] === null) {
            $invalidProperties[] = "'clickThroughRate' can't be null";
        }
        if ($this->container['averageClickPosition'] === null) {
            $invalidProperties[] = "'averageClickPosition' can't be null";
        }
        if ($this->container['conversionRate'] === null) {
            $invalidProperties[] = "'conversionRate' can't be null";
        }
        if ($this->container['trackedSearchCount'] === null) {
            $invalidProperties[] = "'trackedSearchCount' can't be null";
        }
        if ($this->container['clickCount'] === null) {
            $invalidProperties[] = "'clickCount' can't be null";
        }
        if ($this->container['conversionCount'] === null) {
            $invalidProperties[] = "'conversionCount' can't be null";
        }
        if ($this->container['nbHits'] === null) {
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
        return $this->container['search'];
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
        return $this->container['count'];
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
        return $this->container['clickThroughRate'];
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
        return $this->container['averageClickPosition'];
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
        return $this->container['conversionRate'];
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
        return $this->container['trackedSearchCount'];
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
        return $this->container['clickCount'];
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
        return $this->container['conversionCount'];
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
        return $this->container['nbHits'];
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

