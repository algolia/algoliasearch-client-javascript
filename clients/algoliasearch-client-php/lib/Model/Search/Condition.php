<?php

namespace Algolia\AlgoliaSearch\Model\Search;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * Condition Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class Condition implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'condition';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'pattern' => 'string',
        'anchoring' => '\Algolia\AlgoliaSearch\Model\Search\Anchoring',
        'alternatives' => 'bool',
        'context' => 'string',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'pattern' => null,
        'anchoring' => null,
        'alternatives' => null,
        'context' => null,
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
        'pattern' => 'pattern',
        'anchoring' => 'anchoring',
        'alternatives' => 'alternatives',
        'context' => 'context',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'pattern' => 'setPattern',
        'anchoring' => 'setAnchoring',
        'alternatives' => 'setAlternatives',
        'context' => 'setContext',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'pattern' => 'getPattern',
        'anchoring' => 'getAnchoring',
        'alternatives' => 'getAlternatives',
        'context' => 'getContext',
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
        $this->container['pattern'] = $data['pattern'] ?? null;
        $this->container['anchoring'] = $data['anchoring'] ?? null;
        $this->container['alternatives'] = $data['alternatives'] ?? false;
        $this->container['context'] = $data['context'] ?? null;
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
     * Gets pattern
     *
     * @return string|null
     */
    public function getPattern()
    {
        return $this->container['pattern'];
    }

    /**
     * Sets pattern
     *
     * @param string|null $pattern Query pattern syntax
     *
     * @return self
     */
    public function setPattern($pattern)
    {
        $this->container['pattern'] = $pattern;

        return $this;
    }

    /**
     * Gets anchoring
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\Anchoring|null
     */
    public function getAnchoring()
    {
        return $this->container['anchoring'];
    }

    /**
     * Sets anchoring
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\Anchoring|null $anchoring anchoring
     *
     * @return self
     */
    public function setAnchoring($anchoring)
    {
        $this->container['anchoring'] = $anchoring;

        return $this;
    }

    /**
     * Gets alternatives
     *
     * @return bool|null
     */
    public function getAlternatives()
    {
        return $this->container['alternatives'];
    }

    /**
     * Sets alternatives
     *
     * @param bool|null $alternatives whether the pattern matches on plurals, synonyms, and typos
     *
     * @return self
     */
    public function setAlternatives($alternatives)
    {
        $this->container['alternatives'] = $alternatives;

        return $this;
    }

    /**
     * Gets context
     *
     * @return string|null
     */
    public function getContext()
    {
        return $this->container['context'];
    }

    /**
     * Sets context
     *
     * @param string|null $context rule context format: [A-Za-z0-9_-]+)
     *
     * @return self
     */
    public function setContext($context)
    {
        $this->container['context'] = $context;

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

