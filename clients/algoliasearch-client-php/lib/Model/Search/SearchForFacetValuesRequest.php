<?php

namespace Algolia\AlgoliaSearch\Model\Search;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * SearchForFacetValuesRequest Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class SearchForFacetValuesRequest implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'searchForFacetValuesRequest';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'params' => 'string',
        'facetQuery' => 'string',
        'maxFacetHits' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'params' => null,
        'facetQuery' => null,
        'maxFacetHits' => null,
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
        'params' => 'params',
        'facetQuery' => 'facetQuery',
        'maxFacetHits' => 'maxFacetHits',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'params' => 'setParams',
        'facetQuery' => 'setFacetQuery',
        'maxFacetHits' => 'setMaxFacetHits',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'params' => 'getParams',
        'facetQuery' => 'getFacetQuery',
        'maxFacetHits' => 'getMaxFacetHits',
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
        $this->container['params'] = $data['params'] ?? '';
        $this->container['facetQuery'] = $data['facetQuery'] ?? '';
        $this->container['maxFacetHits'] = $data['maxFacetHits'] ?? 10;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

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
     * Gets params
     *
     * @return string|null
     */
    public function getParams()
    {
        return $this->container['params'];
    }

    /**
     * Sets params
     *
     * @param string|null $params search parameters as URL-encoded query string
     *
     * @return self
     */
    public function setParams($params)
    {
        $this->container['params'] = $params;

        return $this;
    }

    /**
     * Gets facetQuery
     *
     * @return string|null
     */
    public function getFacetQuery()
    {
        return $this->container['facetQuery'];
    }

    /**
     * Sets facetQuery
     *
     * @param string|null $facetQuery text to search inside the facet's values
     *
     * @return self
     */
    public function setFacetQuery($facetQuery)
    {
        $this->container['facetQuery'] = $facetQuery;

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
            throw new \InvalidArgumentException('invalid value for $maxFacetHits when calling SearchForFacetValuesRequest., must be smaller than or equal to 100.');
        }

        $this->container['maxFacetHits'] = $maxFacetHits;

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

