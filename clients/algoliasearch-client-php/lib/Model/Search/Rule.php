<?php

namespace Algolia\AlgoliaSearch\Model\Search;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * Rule Class Doc Comment
 *
 * @category Class
 * @description Rule object.
 *
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class Rule implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'rule';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'objectID' => 'string',
        'conditions' => '\Algolia\AlgoliaSearch\Model\Search\Condition[]',
        'consequence' => '\Algolia\AlgoliaSearch\Model\Search\Consequence',
        'description' => 'string',
        'enabled' => 'bool',
        'validity' => '\Algolia\AlgoliaSearch\Model\Search\TimeRange[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'objectID' => null,
        'conditions' => null,
        'consequence' => null,
        'description' => null,
        'enabled' => null,
        'validity' => null,
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
        'objectID' => 'objectID',
        'conditions' => 'conditions',
        'consequence' => 'consequence',
        'description' => 'description',
        'enabled' => 'enabled',
        'validity' => 'validity',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'objectID' => 'setObjectID',
        'conditions' => 'setConditions',
        'consequence' => 'setConsequence',
        'description' => 'setDescription',
        'enabled' => 'setEnabled',
        'validity' => 'setValidity',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'objectID' => 'getObjectID',
        'conditions' => 'getConditions',
        'consequence' => 'getConsequence',
        'description' => 'getDescription',
        'enabled' => 'getEnabled',
        'validity' => 'getValidity',
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
        $this->container['objectID'] = $data['objectID'] ?? null;
        $this->container['conditions'] = $data['conditions'] ?? null;
        $this->container['consequence'] = $data['consequence'] ?? null;
        $this->container['description'] = $data['description'] ?? null;
        $this->container['enabled'] = $data['enabled'] ?? true;
        $this->container['validity'] = $data['validity'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['objectID'] === null) {
            $invalidProperties[] = "'objectID' can't be null";
        }
        if ($this->container['consequence'] === null) {
            $invalidProperties[] = "'consequence' can't be null";
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
     * Gets objectID
     *
     * @return string
     */
    public function getObjectID()
    {
        return $this->container['objectID'];
    }

    /**
     * Sets objectID
     *
     * @param string $objectID unique identifier of the object
     *
     * @return self
     */
    public function setObjectID($objectID)
    {
        $this->container['objectID'] = $objectID;

        return $this;
    }

    /**
     * Gets conditions
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\Condition[]|null
     */
    public function getConditions()
    {
        return $this->container['conditions'];
    }

    /**
     * Sets conditions
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\Condition[]|null $conditions A list of conditions that should apply to activate a Rule. You can use up to 25 conditions per Rule.
     *
     * @return self
     */
    public function setConditions($conditions)
    {
        $this->container['conditions'] = $conditions;

        return $this;
    }

    /**
     * Gets consequence
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\Consequence
     */
    public function getConsequence()
    {
        return $this->container['consequence'];
    }

    /**
     * Sets consequence
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\Consequence $consequence consequence
     *
     * @return self
     */
    public function setConsequence($consequence)
    {
        $this->container['consequence'] = $consequence;

        return $this;
    }

    /**
     * Gets description
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->container['description'];
    }

    /**
     * Sets description
     *
     * @param string|null $description This field is intended for Rule management purposes, in particular to ease searching for Rules and presenting them to human readers. It's not interpreted by the API.
     *
     * @return self
     */
    public function setDescription($description)
    {
        $this->container['description'] = $description;

        return $this;
    }

    /**
     * Gets enabled
     *
     * @return bool|null
     */
    public function getEnabled()
    {
        return $this->container['enabled'];
    }

    /**
     * Sets enabled
     *
     * @param bool|null $enabled Whether the Rule is enabled. Disabled Rules remain in the index, but aren't applied at query time.
     *
     * @return self
     */
    public function setEnabled($enabled)
    {
        $this->container['enabled'] = $enabled;

        return $this;
    }

    /**
     * Gets validity
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\TimeRange[]|null
     */
    public function getValidity()
    {
        return $this->container['validity'];
    }

    /**
     * Sets validity
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\TimeRange[]|null $validity By default, Rules are permanently valid. When validity periods are specified, the Rule applies only during those periods; it's ignored the rest of the time. The list must not be empty.
     *
     * @return self
     */
    public function setValidity($validity)
    {
        $this->container['validity'] = $validity;

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

