<?php

namespace Algolia\AlgoliaSearch\Model\QuerySuggestions;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * QuerySuggestionsIndexParam Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class QuerySuggestionsIndexParam implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'QuerySuggestionsIndexParam';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'sourceIndices' => '\Algolia\AlgoliaSearch\Model\QuerySuggestions\SourceIndex[]',
        'languages' => 'string[]',
        'exclude' => 'string[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'sourceIndices' => null,
        'languages' => null,
        'exclude' => null,
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
        'sourceIndices' => 'sourceIndices',
        'languages' => 'languages',
        'exclude' => 'exclude',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'sourceIndices' => 'setSourceIndices',
        'languages' => 'setLanguages',
        'exclude' => 'setExclude',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'sourceIndices' => 'getSourceIndices',
        'languages' => 'getLanguages',
        'exclude' => 'getExclude',
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
        $this->container['sourceIndices'] = $data['sourceIndices'] ?? null;
        $this->container['languages'] = $data['languages'] ?? null;
        $this->container['exclude'] = $data['exclude'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['sourceIndices'] === null) {
            $invalidProperties[] = "'sourceIndices' can't be null";
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
     * Gets sourceIndices
     *
     * @return \Algolia\AlgoliaSearch\Model\QuerySuggestions\SourceIndex[]
     */
    public function getSourceIndices()
    {
        return $this->container['sourceIndices'];
    }

    /**
     * Sets sourceIndices
     *
     * @param \Algolia\AlgoliaSearch\Model\QuerySuggestions\SourceIndex[] $sourceIndices list of source indices used to generate a Query Suggestions index
     *
     * @return self
     */
    public function setSourceIndices($sourceIndices)
    {
        $this->container['sourceIndices'] = $sourceIndices;

        return $this;
    }

    /**
     * Gets languages
     *
     * @return string[]|null
     */
    public function getLanguages()
    {
        return $this->container['languages'];
    }

    /**
     * Sets languages
     *
     * @param string[]|null $languages De-duplicate singular and plural suggestions. For example, let's say your index contains English content, and that two suggestions “shoe” and “shoes” end up in your Query Suggestions index. If the English language is configured, only the most popular of those two suggestions would remain.
     *
     * @return self
     */
    public function setLanguages($languages)
    {
        $this->container['languages'] = $languages;

        return $this;
    }

    /**
     * Gets exclude
     *
     * @return string[]|null
     */
    public function getExclude()
    {
        return $this->container['exclude'];
    }

    /**
     * Sets exclude
     *
     * @param string[]|null $exclude list of words and patterns to exclude from the Query Suggestions index
     *
     * @return self
     */
    public function setExclude($exclude)
    {
        $this->container['exclude'] = $exclude;

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

