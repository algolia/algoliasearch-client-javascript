<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * Condition Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class Condition extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'pattern' => 'string',
        'anchoring' => '\Algolia\AlgoliaSearch\Model\Search\Anchoring',
        'alternatives' => 'bool',
        'context' => 'string',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'pattern' => null,
        'anchoring' => null,
        'alternatives' => null,
        'context' => null,
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
        'pattern' => 'setPattern',
        'anchoring' => 'setAnchoring',
        'alternatives' => 'setAlternatives',
        'context' => 'setContext',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'pattern' => 'getPattern',
        'anchoring' => 'getAnchoring',
        'alternatives' => 'getAlternatives',
        'context' => 'getContext',
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
        if (isset($data['pattern'])) {
            $this->container['pattern'] = $data['pattern'];
        }
        if (isset($data['anchoring'])) {
            $this->container['anchoring'] = $data['anchoring'];
        }
        if (isset($data['alternatives'])) {
            $this->container['alternatives'] = $data['alternatives'];
        }
        if (isset($data['context'])) {
            $this->container['context'] = $data['context'];
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
     * Gets pattern
     *
     * @return string|null
     */
    public function getPattern()
    {
        return $this->container['pattern'] ?? null;
    }

    /**
     * Sets pattern
     *
     * @param string|null $pattern query pattern syntax
     *
     * @return self
     */
    public function setPattern($pattern)
    {
        $this->container['pattern'] = $pattern;

        return $this;
    }

    /**
     * Gets anchoring
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\Anchoring|null
     */
    public function getAnchoring()
    {
        return $this->container['anchoring'] ?? null;
    }

    /**
     * Sets anchoring
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\Anchoring|null $anchoring anchoring
     *
     * @return self
     */
    public function setAnchoring($anchoring)
    {
        $this->container['anchoring'] = $anchoring;

        return $this;
    }

    /**
     * Gets alternatives
     *
     * @return bool|null
     */
    public function getAlternatives()
    {
        return $this->container['alternatives'] ?? null;
    }

    /**
     * Sets alternatives
     *
     * @param bool|null $alternatives whether the pattern matches on plurals, synonyms, and typos
     *
     * @return self
     */
    public function setAlternatives($alternatives)
    {
        $this->container['alternatives'] = $alternatives;

        return $this;
    }

    /**
     * Gets context
     *
     * @return string|null
     */
    public function getContext()
    {
        return $this->container['context'] ?? null;
    }

    /**
     * Sets context
     *
     * @param string|null $context rule context format: [A-Za-z0-9_-]+)
     *
     * @return self
     */
    public function setContext($context)
    {
        $this->container['context'] = $context;

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

