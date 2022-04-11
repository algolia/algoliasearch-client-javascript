<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * DictionaryEntry Class Doc Comment
 *
 * @category Class
 * @description A dictionary entry.
 *
 * @package Algolia\AlgoliaSearch
 */
class DictionaryEntry extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'objectID' => 'string',
        'language' => 'string',
        'word' => 'string',
        'words' => 'string[]',
        'decomposition' => 'string[]',
        'state' => '\Algolia\AlgoliaSearch\Model\Search\DictionaryEntryState',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'objectID' => null,
        'language' => null,
        'word' => null,
        'words' => null,
        'decomposition' => null,
        'state' => null,
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
        'language' => 'setLanguage',
        'word' => 'setWord',
        'words' => 'setWords',
        'decomposition' => 'setDecomposition',
        'state' => 'setState',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'objectID' => 'getObjectID',
        'language' => 'getLanguage',
        'word' => 'getWord',
        'words' => 'getWords',
        'decomposition' => 'getDecomposition',
        'state' => 'getState',
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
        if (isset($data['language'])) {
            $this->container['language'] = $data['language'];
        }
        if (isset($data['word'])) {
            $this->container['word'] = $data['word'];
        }
        if (isset($data['words'])) {
            $this->container['words'] = $data['words'];
        }
        if (isset($data['decomposition'])) {
            $this->container['decomposition'] = $data['decomposition'];
        }
        if (isset($data['state'])) {
            $this->container['state'] = $data['state'];
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
        if (!isset($this->container['language']) || $this->container['language'] === null) {
            $invalidProperties[] = "'language' can't be null";
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
     * Gets language
     *
     * @return string
     */
    public function getLanguage()
    {
        return $this->container['language'] ?? null;
    }

    /**
     * Sets language
     *
     * @param string $language Language ISO code supported by the dictionary (e.g., \"en\" for English).
     *
     * @return self
     */
    public function setLanguage($language)
    {
        $this->container['language'] = $language;

        return $this;
    }

    /**
     * Gets word
     *
     * @return string|null
     */
    public function getWord()
    {
        return $this->container['word'] ?? null;
    }

    /**
     * Sets word
     *
     * @param string|null $word the word of the dictionary entry
     *
     * @return self
     */
    public function setWord($word)
    {
        $this->container['word'] = $word;

        return $this;
    }

    /**
     * Gets words
     *
     * @return string[]|null
     */
    public function getWords()
    {
        return $this->container['words'] ?? null;
    }

    /**
     * Sets words
     *
     * @param string[]|null $words the words of the dictionary entry
     *
     * @return self
     */
    public function setWords($words)
    {
        $this->container['words'] = $words;

        return $this;
    }

    /**
     * Gets decomposition
     *
     * @return string[]|null
     */
    public function getDecomposition()
    {
        return $this->container['decomposition'] ?? null;
    }

    /**
     * Sets decomposition
     *
     * @param string[]|null $decomposition a decomposition of the word of the dictionary entry
     *
     * @return self
     */
    public function setDecomposition($decomposition)
    {
        $this->container['decomposition'] = $decomposition;

        return $this;
    }

    /**
     * Gets state
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\DictionaryEntryState|null
     */
    public function getState()
    {
        return $this->container['state'] ?? null;
    }

    /**
     * Sets state
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\DictionaryEntryState|null $state state
     *
     * @return self
     */
    public function setState($state)
    {
        $this->container['state'] = $state;

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

