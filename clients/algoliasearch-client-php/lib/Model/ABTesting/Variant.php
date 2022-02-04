<?php

namespace Algolia\AlgoliaSearch\Model\ABTesting;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * Variant Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class Variant implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'variant';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
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
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
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
        'averageClickPosition' => 'averageClickPosition',
        'clickCount' => 'clickCount',
        'clickThroughRate' => 'clickThroughRate',
        'conversionCount' => 'conversionCount',
        'conversionRate' => 'conversionRate',
        'description' => 'description',
        'index' => 'index',
        'noResultCount' => 'noResultCount',
        'searchCount' => 'searchCount',
        'trackedSearchCount' => 'trackedSearchCount',
        'trafficPercentage' => 'trafficPercentage',
        'userCount' => 'userCount',
    ];

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
        $this->container['averageClickPosition'] = $data['averageClickPosition'] ?? null;
        $this->container['clickCount'] = $data['clickCount'] ?? null;
        $this->container['clickThroughRate'] = $data['clickThroughRate'] ?? null;
        $this->container['conversionCount'] = $data['conversionCount'] ?? null;
        $this->container['conversionRate'] = $data['conversionRate'] ?? null;
        $this->container['description'] = $data['description'] ?? null;
        $this->container['index'] = $data['index'] ?? null;
        $this->container['noResultCount'] = $data['noResultCount'] ?? null;
        $this->container['searchCount'] = $data['searchCount'] ?? null;
        $this->container['trackedSearchCount'] = $data['trackedSearchCount'] ?? null;
        $this->container['trafficPercentage'] = $data['trafficPercentage'] ?? null;
        $this->container['userCount'] = $data['userCount'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['averageClickPosition'] === null) {
            $invalidProperties[] = "'averageClickPosition' can't be null";
        }
        if ($this->container['clickCount'] === null) {
            $invalidProperties[] = "'clickCount' can't be null";
        }
        if ($this->container['clickThroughRate'] === null) {
            $invalidProperties[] = "'clickThroughRate' can't be null";
        }
        if ($this->container['conversionCount'] === null) {
            $invalidProperties[] = "'conversionCount' can't be null";
        }
        if ($this->container['conversionRate'] === null) {
            $invalidProperties[] = "'conversionRate' can't be null";
        }
        if ($this->container['description'] === null) {
            $invalidProperties[] = "'description' can't be null";
        }
        if ($this->container['index'] === null) {
            $invalidProperties[] = "'index' can't be null";
        }
        if ($this->container['noResultCount'] === null) {
            $invalidProperties[] = "'noResultCount' can't be null";
        }
        if ($this->container['searchCount'] === null) {
            $invalidProperties[] = "'searchCount' can't be null";
        }
        if ($this->container['trackedSearchCount'] === null) {
            $invalidProperties[] = "'trackedSearchCount' can't be null";
        }
        if ($this->container['trafficPercentage'] === null) {
            $invalidProperties[] = "'trafficPercentage' can't be null";
        }
        if ($this->container['userCount'] === null) {
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
        return $this->container['averageClickPosition'];
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
        return $this->container['clickCount'];
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
        return $this->container['clickThroughRate'];
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
        return $this->container['conversionCount'];
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
        return $this->container['conversionRate'];
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
        return $this->container['description'];
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
        return $this->container['index'];
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
        return $this->container['noResultCount'];
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
        return $this->container['searchCount'];
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
     * Gets trafficPercentage
     *
     * @return int
     */
    public function getTrafficPercentage()
    {
        return $this->container['trafficPercentage'];
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
        return $this->container['userCount'];
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

