<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * SynonymHit Class Doc Comment
 *
 * @category Class
 * @description Synonym object.
 *
 * @package Algolia\AlgoliaSearch
 */
class SynonymHit extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'objectID' => 'string',
        'type' => '\Algolia\AlgoliaSearch\Model\Search\SynonymType',
        'synonyms' => 'string[]',
        'input' => 'string',
        'word' => 'string',
        'corrections' => 'string[]',
        'placeholder' => 'string',
        'replacements' => 'string[]',
        'highlightResult' => '\Algolia\AlgoliaSearch\Model\Search\SynonymHitHighlightResult',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'objectID' => null,
        'type' => null,
        'synonyms' => null,
        'input' => null,
        'word' => null,
        'corrections' => null,
        'placeholder' => null,
        'replacements' => null,
        'highlightResult' => null,
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
        'type' => 'setType',
        'synonyms' => 'setSynonyms',
        'input' => 'setInput',
        'word' => 'setWord',
        'corrections' => 'setCorrections',
        'placeholder' => 'setPlaceholder',
        'replacements' => 'setReplacements',
        'highlightResult' => 'setHighlightResult',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'objectID' => 'getObjectID',
        'type' => 'getType',
        'synonyms' => 'getSynonyms',
        'input' => 'getInput',
        'word' => 'getWord',
        'corrections' => 'getCorrections',
        'placeholder' => 'getPlaceholder',
        'replacements' => 'getReplacements',
        'highlightResult' => 'getHighlightResult',
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
        if (isset($data['type'])) {
            $this->container['type'] = $data['type'];
        }
        if (isset($data['synonyms'])) {
            $this->container['synonyms'] = $data['synonyms'];
        }
        if (isset($data['input'])) {
            $this->container['input'] = $data['input'];
        }
        if (isset($data['word'])) {
            $this->container['word'] = $data['word'];
        }
        if (isset($data['corrections'])) {
            $this->container['corrections'] = $data['corrections'];
        }
        if (isset($data['placeholder'])) {
            $this->container['placeholder'] = $data['placeholder'];
        }
        if (isset($data['replacements'])) {
            $this->container['replacements'] = $data['replacements'];
        }
        if (isset($data['highlightResult'])) {
            $this->container['highlightResult'] = $data['highlightResult'];
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
        if (!isset($this->container['type']) || $this->container['type'] === null) {
            $invalidProperties[] = "'type' can't be null";
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
     * @param string $objectID unique identifier of the synonym object to be created or updated
     *
     * @return self
     */
    public function setObjectID($objectID)
    {
        $this->container['objectID'] = $objectID;

        return $this;
    }

    /**
     * Gets type
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\SynonymType
     */
    public function getType()
    {
        return $this->container['type'] ?? null;
    }

    /**
     * Sets type
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\SynonymType $type type
     *
     * @return self
     */
    public function setType($type)
    {
        $this->container['type'] = $type;

        return $this;
    }

    /**
     * Gets synonyms
     *
     * @return string[]|null
     */
    public function getSynonyms()
    {
        return $this->container['synonyms'] ?? null;
    }

    /**
     * Sets synonyms
     *
     * @param string[]|null $synonyms words or phrases to be considered equivalent
     *
     * @return self
     */
    public function setSynonyms($synonyms)
    {
        $this->container['synonyms'] = $synonyms;

        return $this;
    }

    /**
     * Gets input
     *
     * @return string|null
     */
    public function getInput()
    {
        return $this->container['input'] ?? null;
    }

    /**
     * Sets input
     *
     * @param string|null $input word or phrase to appear in query strings (for onewaysynonym)
     *
     * @return self
     */
    public function setInput($input)
    {
        $this->container['input'] = $input;

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
     * @param string|null $word word or phrase to appear in query strings (for altcorrection1 and altcorrection2)
     *
     * @return self
     */
    public function setWord($word)
    {
        $this->container['word'] = $word;

        return $this;
    }

    /**
     * Gets corrections
     *
     * @return string[]|null
     */
    public function getCorrections()
    {
        return $this->container['corrections'] ?? null;
    }

    /**
     * Sets corrections
     *
     * @param string[]|null $corrections words to be matched in records
     *
     * @return self
     */
    public function setCorrections($corrections)
    {
        $this->container['corrections'] = $corrections;

        return $this;
    }

    /**
     * Gets placeholder
     *
     * @return string|null
     */
    public function getPlaceholder()
    {
        return $this->container['placeholder'] ?? null;
    }

    /**
     * Sets placeholder
     *
     * @param string|null $placeholder token to be put inside records
     *
     * @return self
     */
    public function setPlaceholder($placeholder)
    {
        $this->container['placeholder'] = $placeholder;

        return $this;
    }

    /**
     * Gets replacements
     *
     * @return string[]|null
     */
    public function getReplacements()
    {
        return $this->container['replacements'] ?? null;
    }

    /**
     * Sets replacements
     *
     * @param string[]|null $replacements list of query words that will match the token
     *
     * @return self
     */
    public function setReplacements($replacements)
    {
        $this->container['replacements'] = $replacements;

        return $this;
    }

    /**
     * Gets highlightResult
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\SynonymHitHighlightResult|null
     */
    public function getHighlightResult()
    {
        return $this->container['highlightResult'] ?? null;
    }

    /**
     * Sets highlightResult
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\SynonymHitHighlightResult|null $highlightResult highlightResult
     *
     * @return self
     */
    public function setHighlightResult($highlightResult)
    {
        $this->container['highlightResult'] = $highlightResult;

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

