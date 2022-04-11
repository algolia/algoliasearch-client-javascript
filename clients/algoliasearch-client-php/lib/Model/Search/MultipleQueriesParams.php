<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * MultipleQueriesParams Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class MultipleQueriesParams extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'requests' => '\Algolia\AlgoliaSearch\Model\Search\MultipleQueries[]',
        'strategy' => '\Algolia\AlgoliaSearch\Model\Search\MultipleQueriesStrategy',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'requests' => null,
        'strategy' => null,
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
        'requests' => 'setRequests',
        'strategy' => 'setStrategy',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'requests' => 'getRequests',
        'strategy' => 'getStrategy',
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
        if (isset($data['requests'])) {
            $this->container['requests'] = $data['requests'];
        }
        if (isset($data['strategy'])) {
            $this->container['strategy'] = $data['strategy'];
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

        if (!isset($this->container['requests']) || $this->container['requests'] === null) {
            $invalidProperties[] = "'requests' can't be null";
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
     * Gets requests
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\MultipleQueries[]
     */
    public function getRequests()
    {
        return $this->container['requests'] ?? null;
    }

    /**
     * Sets requests
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\MultipleQueries[] $requests requests
     *
     * @return self
     */
    public function setRequests($requests)
    {
        $this->container['requests'] = $requests;

        return $this;
    }

    /**
     * Gets strategy
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\MultipleQueriesStrategy|null
     */
    public function getStrategy()
    {
        return $this->container['strategy'] ?? null;
    }

    /**
     * Sets strategy
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\MultipleQueriesStrategy|null $strategy strategy
     *
     * @return self
     */
    public function setStrategy($strategy)
    {
        $this->container['strategy'] = $strategy;

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

