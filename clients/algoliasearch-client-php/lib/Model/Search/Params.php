<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * Params Class Doc Comment
 *
 * @category Class
 * @description Additional search parameters. Any valid search parameter is allowed.
 *
 * @package Algolia\AlgoliaSearch
 */
class Params extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'query' => 'string',
        'automaticFacetFilters' => '\Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]',
        'automaticOptionalFacetFilters' => '\Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'query' => null,
        'automaticFacetFilters' => null,
        'automaticOptionalFacetFilters' => null,
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
        'query' => 'setQuery',
        'automaticFacetFilters' => 'setAutomaticFacetFilters',
        'automaticOptionalFacetFilters' => 'setAutomaticOptionalFacetFilters',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'query' => 'getQuery',
        'automaticFacetFilters' => 'getAutomaticFacetFilters',
        'automaticOptionalFacetFilters' => 'getAutomaticOptionalFacetFilters',
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
        if (isset($data['query'])) {
            $this->container['query'] = $data['query'];
        }
        if (isset($data['automaticFacetFilters'])) {
            $this->container['automaticFacetFilters'] = $data['automaticFacetFilters'];
        }
        if (isset($data['automaticOptionalFacetFilters'])) {
            $this->container['automaticOptionalFacetFilters'] = $data['automaticOptionalFacetFilters'];
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
     * @param string|null $query query string
     *
     * @return self
     */
    public function setQuery($query)
    {
        $this->container['query'] = $query;

        return $this;
    }

    /**
     * Gets automaticFacetFilters
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]|null
     */
    public function getAutomaticFacetFilters()
    {
        return $this->container['automaticFacetFilters'] ?? null;
    }

    /**
     * Sets automaticFacetFilters
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]|null $automaticFacetFilters names of facets to which automatic filtering must be applied; they must match the facet name of a facet value placeholder in the query pattern
     *
     * @return self
     */
    public function setAutomaticFacetFilters($automaticFacetFilters)
    {
        $this->container['automaticFacetFilters'] = $automaticFacetFilters;

        return $this;
    }

    /**
     * Gets automaticOptionalFacetFilters
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]|null
     */
    public function getAutomaticOptionalFacetFilters()
    {
        return $this->container['automaticOptionalFacetFilters'] ?? null;
    }

    /**
     * Sets automaticOptionalFacetFilters
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\AutomaticFacetFilter[]|null $automaticOptionalFacetFilters same syntax as automaticFacetFilters, but the engine treats the filters as optional
     *
     * @return self
     */
    public function setAutomaticOptionalFacetFilters($automaticOptionalFacetFilters)
    {
        $this->container['automaticOptionalFacetFilters'] = $automaticOptionalFacetFilters;

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

