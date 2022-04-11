<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * AutomaticFacetFilter Class Doc Comment
 *
 * @category Class
 * @description Automatic facet Filter.
 *
 * @package Algolia\AlgoliaSearch
 */
class AutomaticFacetFilter extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'facet' => 'string',
        'score' => 'int',
        'disjunctive' => 'bool',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'facet' => null,
        'score' => null,
        'disjunctive' => null,
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
        'facet' => 'setFacet',
        'score' => 'setScore',
        'disjunctive' => 'setDisjunctive',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'facet' => 'getFacet',
        'score' => 'getScore',
        'disjunctive' => 'getDisjunctive',
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
        if (isset($data['facet'])) {
            $this->container['facet'] = $data['facet'];
        }
        if (isset($data['score'])) {
            $this->container['score'] = $data['score'];
        }
        if (isset($data['disjunctive'])) {
            $this->container['disjunctive'] = $data['disjunctive'];
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

        if (!isset($this->container['facet']) || $this->container['facet'] === null) {
            $invalidProperties[] = "'facet' can't be null";
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
     * Gets facet
     *
     * @return string
     */
    public function getFacet()
    {
        return $this->container['facet'] ?? null;
    }

    /**
     * Sets facet
     *
     * @param string $facet Attribute to filter on. This must match a facet placeholder in the Rule's pattern.
     *
     * @return self
     */
    public function setFacet($facet)
    {
        $this->container['facet'] = $facet;

        return $this;
    }

    /**
     * Gets score
     *
     * @return int|null
     */
    public function getScore()
    {
        return $this->container['score'] ?? null;
    }

    /**
     * Sets score
     *
     * @param int|null $score Score for the filter. Typically used for optional or disjunctive filters.
     *
     * @return self
     */
    public function setScore($score)
    {
        $this->container['score'] = $score;

        return $this;
    }

    /**
     * Gets disjunctive
     *
     * @return bool|null
     */
    public function getDisjunctive()
    {
        return $this->container['disjunctive'] ?? null;
    }

    /**
     * Sets disjunctive
     *
     * @param bool|null $disjunctive whether the filter is disjunctive (true) or conjunctive (false)
     *
     * @return self
     */
    public function setDisjunctive($disjunctive)
    {
        $this->container['disjunctive'] = $disjunctive;

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

