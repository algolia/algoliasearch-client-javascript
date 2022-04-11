<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * Rule Class Doc Comment
 *
 * @category Class
 * @description Rule object.
 *
 * @package Algolia\AlgoliaSearch
 */
class Rule extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
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
      */
    protected static $modelFormats = [
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
        if (isset($data['objectID'])) {
            $this->container['objectID'] = $data['objectID'];
        }
        if (isset($data['conditions'])) {
            $this->container['conditions'] = $data['conditions'];
        }
        if (isset($data['consequence'])) {
            $this->container['consequence'] = $data['consequence'];
        }
        if (isset($data['description'])) {
            $this->container['description'] = $data['description'];
        }
        if (isset($data['enabled'])) {
            $this->container['enabled'] = $data['enabled'];
        }
        if (isset($data['validity'])) {
            $this->container['validity'] = $data['validity'];
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

        if (!isset($this->container['objectID']) || $this->container['objectID'] === null) {
            $invalidProperties[] = "'objectID' can't be null";
        }
        if (!isset($this->container['consequence']) || $this->container['consequence'] === null) {
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
        return $this->container['objectID'] ?? null;
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
        return $this->container['conditions'] ?? null;
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
        return $this->container['consequence'] ?? null;
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
        return $this->container['description'] ?? null;
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
        return $this->container['enabled'] ?? null;
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
        return $this->container['validity'] ?? null;
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
}

