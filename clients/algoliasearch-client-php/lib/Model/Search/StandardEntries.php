<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * StandardEntries Class Doc Comment
 *
 * @category Class
 * @description Map of language ISO code supported by the dictionary (e.g., \&quot;en\&quot; for English) to a boolean value.
 *
 * @package Algolia\AlgoliaSearch
 */
class StandardEntries extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'plurals' => 'array<string,bool>',
        'stopwords' => 'array<string,bool>',
        'compounds' => 'array<string,bool>',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'plurals' => null,
        'stopwords' => null,
        'compounds' => null,
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
        'plurals' => 'setPlurals',
        'stopwords' => 'setStopwords',
        'compounds' => 'setCompounds',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'plurals' => 'getPlurals',
        'stopwords' => 'getStopwords',
        'compounds' => 'getCompounds',
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
        if (isset($data['plurals'])) {
            $this->container['plurals'] = $data['plurals'];
        }
        if (isset($data['stopwords'])) {
            $this->container['stopwords'] = $data['stopwords'];
        }
        if (isset($data['compounds'])) {
            $this->container['compounds'] = $data['compounds'];
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
     * Gets plurals
     *
     * @return array<string,bool>|null
     */
    public function getPlurals()
    {
        return $this->container['plurals'] ?? null;
    }

    /**
     * Sets plurals
     *
     * @param array<string,bool>|null $plurals language ISO code
     *
     * @return self
     */
    public function setPlurals($plurals)
    {
        $this->container['plurals'] = $plurals;

        return $this;
    }

    /**
     * Gets stopwords
     *
     * @return array<string,bool>|null
     */
    public function getStopwords()
    {
        return $this->container['stopwords'] ?? null;
    }

    /**
     * Sets stopwords
     *
     * @param array<string,bool>|null $stopwords language ISO code
     *
     * @return self
     */
    public function setStopwords($stopwords)
    {
        $this->container['stopwords'] = $stopwords;

        return $this;
    }

    /**
     * Gets compounds
     *
     * @return array<string,bool>|null
     */
    public function getCompounds()
    {
        return $this->container['compounds'] ?? null;
    }

    /**
     * Sets compounds
     *
     * @param array<string,bool>|null $compounds language ISO code
     *
     * @return self
     */
    public function setCompounds($compounds)
    {
        $this->container['compounds'] = $compounds;

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

