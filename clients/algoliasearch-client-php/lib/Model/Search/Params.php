<?php

namespace Algolia\AlgoliaSearch\Model\Search;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * Params Class Doc Comment
 *
 * @category Class
 * @description Additional search parameters. Any valid search parameter is allowed.
 *
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class Params implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'params';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'query' => 'string',
        'automaticFacetFilters' => '\Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]',
        'automaticOptionalFacetFilters' => '\Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'query' => null,
        'automaticFacetFilters' => null,
        'automaticOptionalFacetFilters' => null,
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
        'query' => 'query',
        'automaticFacetFilters' => 'automaticFacetFilters',
        'automaticOptionalFacetFilters' => 'automaticOptionalFacetFilters',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'query' => 'setQuery',
        'automaticFacetFilters' => 'setAutomaticFacetFilters',
        'automaticOptionalFacetFilters' => 'setAutomaticOptionalFacetFilters',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'query' => 'getQuery',
        'automaticFacetFilters' => 'getAutomaticFacetFilters',
        'automaticOptionalFacetFilters' => 'getAutomaticOptionalFacetFilters',
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
        $this->container['query'] = $data['query'] ?? null;
        $this->container['automaticFacetFilters'] = $data['automaticFacetFilters'] ?? null;
        $this->container['automaticOptionalFacetFilters'] = $data['automaticOptionalFacetFilters'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

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
     * Gets query
     *
     * @return string|null
     */
    public function getQuery()
    {
        return $this->container['query'];
    }

    /**
     * Sets query
     *
     * @param string|null $query query string
     *
     * @return self
     */
    public function setQuery($query)
    {
        $this->container['query'] = $query;

        return $this;
    }

    /**
     * Gets automaticFacetFilters
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]|null
     */
    public function getAutomaticFacetFilters()
    {
        return $this->container['automaticFacetFilters'];
    }

    /**
     * Sets automaticFacetFilters
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]|null $automaticFacetFilters names of facets to which automatic filtering must be applied; they must match the facet name of a facet value placeholder in the query pattern
     *
     * @return self
     */
    public function setAutomaticFacetFilters($automaticFacetFilters)
    {
        $this->container['automaticFacetFilters'] = $automaticFacetFilters;

        return $this;
    }

    /**
     * Gets automaticOptionalFacetFilters
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]|null
     */
    public function getAutomaticOptionalFacetFilters()
    {
        return $this->container['automaticOptionalFacetFilters'];
    }

    /**
     * Sets automaticOptionalFacetFilters
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]|null $automaticOptionalFacetFilters same syntax as automaticFacetFilters, but the engine treats the filters as optional
     *
     * @return self
     */
    public function setAutomaticOptionalFacetFilters($automaticOptionalFacetFilters)
    {
        $this->container['automaticOptionalFacetFilters'] = $automaticOptionalFacetFilters;

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

