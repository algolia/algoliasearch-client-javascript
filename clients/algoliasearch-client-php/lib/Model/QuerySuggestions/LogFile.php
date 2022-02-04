<?php

namespace Algolia\AlgoliaSearch\Model\QuerySuggestions;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * LogFile Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class LogFile implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'LogFile';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'timestamp' => 'string',
        'level' => 'string',
        'message' => 'string',
        'contextLevel' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'timestamp' => null,
        'level' => null,
        'message' => null,
        'contextLevel' => null,
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
        'timestamp' => 'timestamp',
        'level' => 'level',
        'message' => 'message',
        'contextLevel' => 'contextLevel',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'timestamp' => 'setTimestamp',
        'level' => 'setLevel',
        'message' => 'setMessage',
        'contextLevel' => 'setContextLevel',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'timestamp' => 'getTimestamp',
        'level' => 'getLevel',
        'message' => 'getMessage',
        'contextLevel' => 'getContextLevel',
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

    const LEVEL_INFO = 'INFO';
    const LEVEL_SKIP = 'SKIP';
    const LEVEL_ERROR = 'ERROR';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public function getLevelAllowableValues()
    {
        return [
            self::LEVEL_INFO,
            self::LEVEL_SKIP,
            self::LEVEL_ERROR,
        ];
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
        $this->container['timestamp'] = $data['timestamp'] ?? null;
        $this->container['level'] = $data['level'] ?? null;
        $this->container['message'] = $data['message'] ?? null;
        $this->container['contextLevel'] = $data['contextLevel'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['timestamp'] === null) {
            $invalidProperties[] = "'timestamp' can't be null";
        }
        if ($this->container['level'] === null) {
            $invalidProperties[] = "'level' can't be null";
        }
        $allowedValues = $this->getLevelAllowableValues();
        if (!is_null($this->container['level']) && !in_array($this->container['level'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'level', must be one of '%s'",
                $this->container['level'],
                implode("', '", $allowedValues)
            );
        }

        if ($this->container['message'] === null) {
            $invalidProperties[] = "'message' can't be null";
        }
        if ($this->container['contextLevel'] === null) {
            $invalidProperties[] = "'contextLevel' can't be null";
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
     * Gets timestamp
     *
     * @return string
     */
    public function getTimestamp()
    {
        return $this->container['timestamp'];
    }

    /**
     * Sets timestamp
     *
     * @param string $timestamp date and time of creation of the record
     *
     * @return self
     */
    public function setTimestamp($timestamp)
    {
        $this->container['timestamp'] = $timestamp;

        return $this;
    }

    /**
     * Gets level
     *
     * @return string
     */
    public function getLevel()
    {
        return $this->container['level'];
    }

    /**
     * Sets level
     *
     * @param string $level type of the record, can be one of three values (INFO, SKIP or ERROR)
     *
     * @return self
     */
    public function setLevel($level)
    {
        $allowedValues = $this->getLevelAllowableValues();
        if (!in_array($level, $allowedValues, true)) {
            throw new \InvalidArgumentException(
                sprintf(
                    "Invalid value '%s' for 'level', must be one of '%s'",
                    $level,
                    implode("', '", $allowedValues)
                )
            );
        }
        $this->container['level'] = $level;

        return $this;
    }

    /**
     * Gets message
     *
     * @return string
     */
    public function getMessage()
    {
        return $this->container['message'];
    }

    /**
     * Sets message
     *
     * @param string $message detailed description of what happened
     *
     * @return self
     */
    public function setMessage($message)
    {
        $this->container['message'] = $message;

        return $this;
    }

    /**
     * Gets contextLevel
     *
     * @return int
     */
    public function getContextLevel()
    {
        return $this->container['contextLevel'];
    }

    /**
     * Sets contextLevel
     *
     * @param int $contextLevel indicates the hierarchy of the records. For example, a record with contextLevel=1 belongs to a preceding record with contextLevel=0.
     *
     * @return self
     */
    public function setContextLevel($contextLevel)
    {
        $this->container['contextLevel'] = $contextLevel;

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

