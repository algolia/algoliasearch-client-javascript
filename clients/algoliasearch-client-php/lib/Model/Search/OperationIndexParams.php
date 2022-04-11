<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * OperationIndexParams Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class OperationIndexParams extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'operation' => '\Algolia\AlgoliaSearch\Model\Search\OperationType',
        'destination' => 'string',
        'scope' => '\Algolia\AlgoliaSearch\Model\Search\ScopeType[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'operation' => null,
        'destination' => null,
        'scope' => null,
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
        'operation' => 'setOperation',
        'destination' => 'setDestination',
        'scope' => 'setScope',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'operation' => 'getOperation',
        'destination' => 'getDestination',
        'scope' => 'getScope',
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
        if (isset($data['operation'])) {
            $this->container['operation'] = $data['operation'];
        }
        if (isset($data['destination'])) {
            $this->container['destination'] = $data['destination'];
        }
        if (isset($data['scope'])) {
            $this->container['scope'] = $data['scope'];
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

        if (!isset($this->container['operation']) || $this->container['operation'] === null) {
            $invalidProperties[] = "'operation' can't be null";
        }
        if (!isset($this->container['destination']) || $this->container['destination'] === null) {
            $invalidProperties[] = "'destination' can't be null";
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
     * Gets operation
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\OperationType
     */
    public function getOperation()
    {
        return $this->container['operation'] ?? null;
    }

    /**
     * Sets operation
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\OperationType $operation operation
     *
     * @return self
     */
    public function setOperation($operation)
    {
        $this->container['operation'] = $operation;

        return $this;
    }

    /**
     * Gets destination
     *
     * @return string
     */
    public function getDestination()
    {
        return $this->container['destination'] ?? null;
    }

    /**
     * Sets destination
     *
     * @param string $destination the Algolia index name
     *
     * @return self
     */
    public function setDestination($destination)
    {
        $this->container['destination'] = $destination;

        return $this;
    }

    /**
     * Gets scope
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\ScopeType[]|null
     */
    public function getScope()
    {
        return $this->container['scope'] ?? null;
    }

    /**
     * Sets scope
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\ScopeType[]|null $scope Scope of the data to copy. When absent, a full copy is performed. When present, only the selected scopes are copied.
     *
     * @return self
     */
    public function setScope($scope)
    {
        $this->container['scope'] = $scope;

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

