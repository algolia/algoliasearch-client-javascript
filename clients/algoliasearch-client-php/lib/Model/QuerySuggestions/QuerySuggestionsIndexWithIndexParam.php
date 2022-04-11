<?php

namespace Algolia\AlgoliaSearch\Model\QuerySuggestions;

/**
 * QuerySuggestionsIndexWithIndexParam Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class QuerySuggestionsIndexWithIndexParam extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'sourceIndices' => '\Algolia\AlgoliaSearch\Model\QuerySuggestions\SourceIndex[]',
        'languages' => 'string[]',
        'exclude' => 'string[]',
        'indexName' => 'string',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'sourceIndices' => null,
        'languages' => null,
        'exclude' => null,
        'indexName' => null,
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
        'sourceIndices' => 'setSourceIndices',
        'languages' => 'setLanguages',
        'exclude' => 'setExclude',
        'indexName' => 'setIndexName',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'sourceIndices' => 'getSourceIndices',
        'languages' => 'getLanguages',
        'exclude' => 'getExclude',
        'indexName' => 'getIndexName',
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
        if (isset($data['sourceIndices'])) {
            $this->container['sourceIndices'] = $data['sourceIndices'];
        }
        if (isset($data['languages'])) {
            $this->container['languages'] = $data['languages'];
        }
        if (isset($data['exclude'])) {
            $this->container['exclude'] = $data['exclude'];
        }
        if (isset($data['indexName'])) {
            $this->container['indexName'] = $data['indexName'];
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

        if (!isset($this->container['sourceIndices']) || $this->container['sourceIndices'] === null) {
            $invalidProperties[] = "'sourceIndices' can't be null";
        }
        if (!isset($this->container['indexName']) || $this->container['indexName'] === null) {
            $invalidProperties[] = "'indexName' can't be null";
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
     * Gets sourceIndices
     *
     * @return \Algolia\AlgoliaSearch\Model\QuerySuggestions\SourceIndex[]
     */
    public function getSourceIndices()
    {
        return $this->container['sourceIndices'] ?? null;
    }

    /**
     * Sets sourceIndices
     *
     * @param \Algolia\AlgoliaSearch\Model\QuerySuggestions\SourceIndex[] $sourceIndices list of source indices used to generate a Query Suggestions index
     *
     * @return self
     */
    public function setSourceIndices($sourceIndices)
    {
        $this->container['sourceIndices'] = $sourceIndices;

        return $this;
    }

    /**
     * Gets languages
     *
     * @return string[]|null
     */
    public function getLanguages()
    {
        return $this->container['languages'] ?? null;
    }

    /**
     * Sets languages
     *
     * @param string[]|null $languages De-duplicate singular and plural suggestions. For example, let's say your index contains English content, and that two suggestions “shoe” and “shoes” end up in your Query Suggestions index. If the English language is configured, only the most popular of those two suggestions would remain.
     *
     * @return self
     */
    public function setLanguages($languages)
    {
        $this->container['languages'] = $languages;

        return $this;
    }

    /**
     * Gets exclude
     *
     * @return string[]|null
     */
    public function getExclude()
    {
        return $this->container['exclude'] ?? null;
    }

    /**
     * Sets exclude
     *
     * @param string[]|null $exclude list of words and patterns to exclude from the Query Suggestions index
     *
     * @return self
     */
    public function setExclude($exclude)
    {
        $this->container['exclude'] = $exclude;

        return $this;
    }

    /**
     * Gets indexName
     *
     * @return string
     */
    public function getIndexName()
    {
        return $this->container['indexName'] ?? null;
    }

    /**
     * Sets indexName
     *
     * @param string $indexName index name to target
     *
     * @return self
     */
    public function setIndexName($indexName)
    {
        $this->container['indexName'] = $indexName;

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

