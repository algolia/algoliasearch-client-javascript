<?php

namespace Algolia\AlgoliaSearch\Model\QuerySuggestions;

/**
 * LogFile Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class LogFile extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'timestamp' => 'string',
        'level' => 'string',
        'message' => 'string',
        'contextLevel' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
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
     */
    public function __construct(array $data = null)
    {
        if (isset($data['timestamp'])) {
            $this->container['timestamp'] = $data['timestamp'];
        }
        if (isset($data['level'])) {
            $this->container['level'] = $data['level'];
        }
        if (isset($data['message'])) {
            $this->container['message'] = $data['message'];
        }
        if (isset($data['contextLevel'])) {
            $this->container['contextLevel'] = $data['contextLevel'];
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

        if (!isset($this->container['timestamp']) || $this->container['timestamp'] === null) {
            $invalidProperties[] = "'timestamp' can't be null";
        }
        if (!isset($this->container['level']) || $this->container['level'] === null) {
            $invalidProperties[] = "'level' can't be null";
        }
        $allowedValues = $this->getLevelAllowableValues();
        if (isset($this->container['level']) && !in_array($this->container['level'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'level', must be one of '%s'",
                $this->container['level'],
                implode("', '", $allowedValues)
            );
        }

        if (!isset($this->container['message']) || $this->container['message'] === null) {
            $invalidProperties[] = "'message' can't be null";
        }
        if (!isset($this->container['contextLevel']) || $this->container['contextLevel'] === null) {
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
        return $this->container['timestamp'] ?? null;
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
        return $this->container['level'] ?? null;
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
        return $this->container['message'] ?? null;
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
        return $this->container['contextLevel'] ?? null;
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
}

