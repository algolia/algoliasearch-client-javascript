<?php

namespace Algolia\AlgoliaSearch\Model\QuerySuggestions;

/**
 * Status Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class Status extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'indexName' => 'string',
        'isRunning' => 'bool',
        'lastBuiltAt' => 'string',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'indexName' => null,
        'isRunning' => null,
        'lastBuiltAt' => 'data-time',
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
        'indexName' => 'setIndexName',
        'isRunning' => 'setIsRunning',
        'lastBuiltAt' => 'setLastBuiltAt',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'indexName' => 'getIndexName',
        'isRunning' => 'getIsRunning',
        'lastBuiltAt' => 'getLastBuiltAt',
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
        if (isset($data['indexName'])) {
            $this->container['indexName'] = $data['indexName'];
        }
        if (isset($data['isRunning'])) {
            $this->container['isRunning'] = $data['isRunning'];
        }
        if (isset($data['lastBuiltAt'])) {
            $this->container['lastBuiltAt'] = $data['lastBuiltAt'];
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

        if (!isset($this->container['indexName']) || $this->container['indexName'] === null) {
            $invalidProperties[] = "'indexName' can't be null";
        }
        if (!isset($this->container['isRunning']) || $this->container['isRunning'] === null) {
            $invalidProperties[] = "'isRunning' can't be null";
        }
        if (!isset($this->container['lastBuiltAt']) || $this->container['lastBuiltAt'] === null) {
            $invalidProperties[] = "'lastBuiltAt' can't be null";
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
     * Gets indexName
     *
     * @return string
     */
    public function getIndexName()
    {
        return $this->container['indexName'] ?? null;
    }

    /**
     * Sets indexName
     *
     * @param string $indexName the targeted index name
     *
     * @return self
     */
    public function setIndexName($indexName)
    {
        $this->container['indexName'] = $indexName;

        return $this;
    }

    /**
     * Gets isRunning
     *
     * @return bool
     */
    public function getIsRunning()
    {
        return $this->container['isRunning'] ?? null;
    }

    /**
     * Sets isRunning
     *
     * @param bool $isRunning true if the Query Suggestions index is running
     *
     * @return self
     */
    public function setIsRunning($isRunning)
    {
        $this->container['isRunning'] = $isRunning;

        return $this;
    }

    /**
     * Gets lastBuiltAt
     *
     * @return string
     */
    public function getLastBuiltAt()
    {
        return $this->container['lastBuiltAt'] ?? null;
    }

    /**
     * Sets lastBuiltAt
     *
     * @param string $lastBuiltAt date and time of the last build
     *
     * @return self
     */
    public function setLastBuiltAt($lastBuiltAt)
    {
        $this->container['lastBuiltAt'] = $lastBuiltAt;

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

