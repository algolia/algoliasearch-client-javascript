<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * MultipleQueries Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class MultipleQueries extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'indexName' => 'string',
        'query' => 'string',
        'type' => '\Algolia\AlgoliaSearch\Model\Search\MultipleQueriesType',
        'facet' => 'string',
        'params' => 'string',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'indexName' => null,
        'query' => null,
        'type' => null,
        'facet' => null,
        'params' => null,
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
        'indexName' => 'setIndexName',
        'query' => 'setQuery',
        'type' => 'setType',
        'facet' => 'setFacet',
        'params' => 'setParams',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'indexName' => 'getIndexName',
        'query' => 'getQuery',
        'type' => 'getType',
        'facet' => 'getFacet',
        'params' => 'getParams',
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
        if (isset($data['indexName'])) {
            $this->container['indexName'] = $data['indexName'];
        }
        if (isset($data['query'])) {
            $this->container['query'] = $data['query'];
        }
        if (isset($data['type'])) {
            $this->container['type'] = $data['type'];
        }
        if (isset($data['facet'])) {
            $this->container['facet'] = $data['facet'];
        }
        if (isset($data['params'])) {
            $this->container['params'] = $data['params'];
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
     * @param string $indexName the Algolia index name
     *
     * @return self
     */
    public function setIndexName($indexName)
    {
        $this->container['indexName'] = $indexName;

        return $this;
    }

    /**
     * Gets query
     *
     * @return string|null
     */
    public function getQuery()
    {
        return $this->container['query'] ?? null;
    }

    /**
     * Sets query
     *
     * @param string|null $query the text to search in the index
     *
     * @return self
     */
    public function setQuery($query)
    {
        $this->container['query'] = $query;

        return $this;
    }

    /**
     * Gets type
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\MultipleQueriesType|null
     */
    public function getType()
    {
        return $this->container['type'] ?? null;
    }

    /**
     * Sets type
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\MultipleQueriesType|null $type type
     *
     * @return self
     */
    public function setType($type)
    {
        $this->container['type'] = $type;

        return $this;
    }

    /**
     * Gets facet
     *
     * @return string|null
     */
    public function getFacet()
    {
        return $this->container['facet'] ?? null;
    }

    /**
     * Sets facet
     *
     * @param string|null $facet the `facet` name
     *
     * @return self
     */
    public function setFacet($facet)
    {
        $this->container['facet'] = $facet;

        return $this;
    }

    /**
     * Gets params
     *
     * @return string|null
     */
    public function getParams()
    {
        return $this->container['params'] ?? null;
    }

    /**
     * Sets params
     *
     * @param string|null $params a query string of search parameters
     *
     * @return self
     */
    public function setParams($params)
    {
        $this->container['params'] = $params;

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

