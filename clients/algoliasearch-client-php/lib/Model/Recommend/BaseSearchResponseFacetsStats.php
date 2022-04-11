<?php

namespace Algolia\AlgoliaSearch\Model\Recommend;

/**
 * BaseSearchResponseFacetsStats Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class BaseSearchResponseFacetsStats extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'min' => 'int',
        'max' => 'int',
        'avg' => 'int',
        'sum' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'min' => null,
        'max' => null,
        'avg' => null,
        'sum' => null,
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
        'min' => 'setMin',
        'max' => 'setMax',
        'avg' => 'setAvg',
        'sum' => 'setSum',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'min' => 'getMin',
        'max' => 'getMax',
        'avg' => 'getAvg',
        'sum' => 'getSum',
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
        if (isset($data['min'])) {
            $this->container['min'] = $data['min'];
        }
        if (isset($data['max'])) {
            $this->container['max'] = $data['max'];
        }
        if (isset($data['avg'])) {
            $this->container['avg'] = $data['avg'];
        }
        if (isset($data['sum'])) {
            $this->container['sum'] = $data['sum'];
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
     * Gets min
     *
     * @return int|null
     */
    public function getMin()
    {
        return $this->container['min'] ?? null;
    }

    /**
     * Sets min
     *
     * @param int|null $min the minimum value in the result set
     *
     * @return self
     */
    public function setMin($min)
    {
        $this->container['min'] = $min;

        return $this;
    }

    /**
     * Gets max
     *
     * @return int|null
     */
    public function getMax()
    {
        return $this->container['max'] ?? null;
    }

    /**
     * Sets max
     *
     * @param int|null $max the maximum value in the result set
     *
     * @return self
     */
    public function setMax($max)
    {
        $this->container['max'] = $max;

        return $this;
    }

    /**
     * Gets avg
     *
     * @return int|null
     */
    public function getAvg()
    {
        return $this->container['avg'] ?? null;
    }

    /**
     * Sets avg
     *
     * @param int|null $avg the average facet value in the result set
     *
     * @return self
     */
    public function setAvg($avg)
    {
        $this->container['avg'] = $avg;

        return $this;
    }

    /**
     * Gets sum
     *
     * @return int|null
     */
    public function getSum()
    {
        return $this->container['sum'] ?? null;
    }

    /**
     * Sets sum
     *
     * @param int|null $sum the sum of all values in the result set
     *
     * @return self
     */
    public function setSum($sum)
    {
        $this->container['sum'] = $sum;

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

