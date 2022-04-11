<?php

namespace Algolia\AlgoliaSearch\Model\Analytics;

/**
 * GetTopFilterForAttribute Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class GetTopFilterForAttribute extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'attribute' => 'string',
        'operator' => 'string',
        'value' => 'string',
        'count' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'attribute' => null,
        'operator' => null,
        'value' => null,
        'count' => null,
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
        'attribute' => 'setAttribute',
        'operator' => 'setOperator',
        'value' => 'setValue',
        'count' => 'setCount',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'attribute' => 'getAttribute',
        'operator' => 'getOperator',
        'value' => 'getValue',
        'count' => 'getCount',
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
        if (isset($data['attribute'])) {
            $this->container['attribute'] = $data['attribute'];
        }
        if (isset($data['operator'])) {
            $this->container['operator'] = $data['operator'];
        }
        if (isset($data['value'])) {
            $this->container['value'] = $data['value'];
        }
        if (isset($data['count'])) {
            $this->container['count'] = $data['count'];
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

        if (!isset($this->container['attribute']) || $this->container['attribute'] === null) {
            $invalidProperties[] = "'attribute' can't be null";
        }
        if (!isset($this->container['operator']) || $this->container['operator'] === null) {
            $invalidProperties[] = "'operator' can't be null";
        }
        if (!isset($this->container['value']) || $this->container['value'] === null) {
            $invalidProperties[] = "'value' can't be null";
        }
        if (!isset($this->container['count']) || $this->container['count'] === null) {
            $invalidProperties[] = "'count' can't be null";
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
     * Gets attribute
     *
     * @return string
     */
    public function getAttribute()
    {
        return $this->container['attribute'] ?? null;
    }

    /**
     * Sets attribute
     *
     * @param string $attribute the attribute
     *
     * @return self
     */
    public function setAttribute($attribute)
    {
        $this->container['attribute'] = $attribute;

        return $this;
    }

    /**
     * Gets operator
     *
     * @return string
     */
    public function getOperator()
    {
        return $this->container['operator'] ?? null;
    }

    /**
     * Sets operator
     *
     * @param string $operator the operator
     *
     * @return self
     */
    public function setOperator($operator)
    {
        $this->container['operator'] = $operator;

        return $this;
    }

    /**
     * Gets value
     *
     * @return string
     */
    public function getValue()
    {
        return $this->container['value'] ?? null;
    }

    /**
     * Sets value
     *
     * @param string $value the value of the attribute
     *
     * @return self
     */
    public function setValue($value)
    {
        $this->container['value'] = $value;

        return $this;
    }

    /**
     * Gets count
     *
     * @return int
     */
    public function getCount()
    {
        return $this->container['count'] ?? null;
    }

    /**
     * Sets count
     *
     * @param int $count the number of occurrences
     *
     * @return self
     */
    public function setCount($count)
    {
        $this->container['count'] = $count;

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

