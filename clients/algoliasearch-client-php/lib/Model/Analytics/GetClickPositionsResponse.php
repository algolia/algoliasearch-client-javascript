<?php

namespace Algolia\AlgoliaSearch\Model\Analytics;

/**
 * GetClickPositionsResponse Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class GetClickPositionsResponse extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'positions' => '\Algolia\AlgoliaSearch\Model\Analytics\GetClickPositionsResponsePositions[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'positions' => null,
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
        'positions' => 'setPositions',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'positions' => 'getPositions',
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
        if (isset($data['positions'])) {
            $this->container['positions'] = $data['positions'];
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

        if (!isset($this->container['positions']) || $this->container['positions'] === null) {
            $invalidProperties[] = "'positions' can't be null";
        }
        if ((count($this->container['positions']) > 2)) {
            $invalidProperties[] = "invalid value for 'positions', number of items must be less than or equal to 2.";
        }

        if ((count($this->container['positions']) < 2)) {
            $invalidProperties[] = "invalid value for 'positions', number of items must be greater than or equal to 2.";
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
     * Gets positions
     *
     * @return \Algolia\AlgoliaSearch\Model\Analytics\GetClickPositionsResponsePositions[]
     */
    public function getPositions()
    {
        return $this->container['positions'] ?? null;
    }

    /**
     * Sets positions
     *
     * @param \Algolia\AlgoliaSearch\Model\Analytics\GetClickPositionsResponsePositions[] $positions a list of the click positions with their click count
     *
     * @return self
     */
    public function setPositions($positions)
    {
        if ((count($positions) > 2)) {
            throw new \InvalidArgumentException('invalid value for $positions when calling GetClickPositionsResponse., number of items must be less than or equal to 2.');
        }
        if ((count($positions) < 2)) {
            throw new \InvalidArgumentException('invalid length for $positions when calling GetClickPositionsResponse., number of items must be greater than or equal to 2.');
        }
        $this->container['positions'] = $positions;

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

