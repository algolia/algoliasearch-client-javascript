<?php

namespace Algolia\AlgoliaSearch\Model\Recommend;

/**
 * HighlightResult Class Doc Comment
 *
 * @category Class
 * @description Highlighted attributes.
 *
 * @package Algolia\AlgoliaSearch
 */
class HighlightResult extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'value' => 'string',
        'matchLevel' => '\Algolia\AlgoliaSearch\Model\Recommend\MatchLevel',
        'matchedWords' => 'string[]',
        'fullyHighlighted' => 'bool',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'value' => null,
        'matchLevel' => null,
        'matchedWords' => null,
        'fullyHighlighted' => null,
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
        'value' => 'setValue',
        'matchLevel' => 'setMatchLevel',
        'matchedWords' => 'setMatchedWords',
        'fullyHighlighted' => 'setFullyHighlighted',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'value' => 'getValue',
        'matchLevel' => 'getMatchLevel',
        'matchedWords' => 'getMatchedWords',
        'fullyHighlighted' => 'getFullyHighlighted',
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
        if (isset($data['value'])) {
            $this->container['value'] = $data['value'];
        }
        if (isset($data['matchLevel'])) {
            $this->container['matchLevel'] = $data['matchLevel'];
        }
        if (isset($data['matchedWords'])) {
            $this->container['matchedWords'] = $data['matchedWords'];
        }
        if (isset($data['fullyHighlighted'])) {
            $this->container['fullyHighlighted'] = $data['fullyHighlighted'];
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
     * Gets value
     *
     * @return string|null
     */
    public function getValue()
    {
        return $this->container['value'] ?? null;
    }

    /**
     * Sets value
     *
     * @param string|null $value markup text with occurrences highlighted
     *
     * @return self
     */
    public function setValue($value)
    {
        $this->container['value'] = $value;

        return $this;
    }

    /**
     * Gets matchLevel
     *
     * @return \Algolia\AlgoliaSearch\Model\Recommend\MatchLevel|null
     */
    public function getMatchLevel()
    {
        return $this->container['matchLevel'] ?? null;
    }

    /**
     * Sets matchLevel
     *
     * @param \Algolia\AlgoliaSearch\Model\Recommend\MatchLevel|null $matchLevel matchLevel
     *
     * @return self
     */
    public function setMatchLevel($matchLevel)
    {
        $this->container['matchLevel'] = $matchLevel;

        return $this;
    }

    /**
     * Gets matchedWords
     *
     * @return string[]|null
     */
    public function getMatchedWords()
    {
        return $this->container['matchedWords'] ?? null;
    }

    /**
     * Sets matchedWords
     *
     * @param string[]|null $matchedWords list of words from the query that matched the object
     *
     * @return self
     */
    public function setMatchedWords($matchedWords)
    {
        $this->container['matchedWords'] = $matchedWords;

        return $this;
    }

    /**
     * Gets fullyHighlighted
     *
     * @return bool|null
     */
    public function getFullyHighlighted()
    {
        return $this->container['fullyHighlighted'] ?? null;
    }

    /**
     * Sets fullyHighlighted
     *
     * @param bool|null $fullyHighlighted whether the entire attribute value is highlighted
     *
     * @return self
     */
    public function setFullyHighlighted($fullyHighlighted)
    {
        $this->container['fullyHighlighted'] = $fullyHighlighted;

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

