<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * SearchRulesParams Class Doc Comment
 *
 * @category Class
 * @description Parameters for the search.
 *
 * @package Algolia\AlgoliaSearch
 */
class SearchRulesParams extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'query' => 'string',
        'anchoring' => '\Algolia\AlgoliaSearch\Model\Search\Anchoring',
        'context' => 'string',
        'page' => 'int',
        'hitsPerPage' => 'int',
        'enabled' => 'bool',
        'requestOptions' => 'object[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'query' => null,
        'anchoring' => null,
        'context' => null,
        'page' => null,
        'hitsPerPage' => null,
        'enabled' => null,
        'requestOptions' => null,
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
        'anchoring' => 'setAnchoring',
        'context' => 'setContext',
        'page' => 'setPage',
        'hitsPerPage' => 'setHitsPerPage',
        'enabled' => 'setEnabled',
        'requestOptions' => 'setRequestOptions',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'query' => 'getQuery',
        'anchoring' => 'getAnchoring',
        'context' => 'getContext',
        'page' => 'getPage',
        'hitsPerPage' => 'getHitsPerPage',
        'enabled' => 'getEnabled',
        'requestOptions' => 'getRequestOptions',
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
        if (isset($data['anchoring'])) {
            $this->container['anchoring'] = $data['anchoring'];
        }
        if (isset($data['context'])) {
            $this->container['context'] = $data['context'];
        }
        if (isset($data['page'])) {
            $this->container['page'] = $data['page'];
        }
        if (isset($data['hitsPerPage'])) {
            $this->container['hitsPerPage'] = $data['hitsPerPage'];
        }
        if (isset($data['enabled'])) {
            $this->container['enabled'] = $data['enabled'];
        }
        if (isset($data['requestOptions'])) {
            $this->container['requestOptions'] = $data['requestOptions'];
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
     * @param string|null $query full text query
     *
     * @return self
     */
    public function setQuery($query)
    {
        $this->container['query'] = $query;

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
     * @param string|null $context restricts matches to contextual rules with a specific context (exact match)
     *
     * @return self
     */
    public function setContext($context)
    {
        $this->container['context'] = $context;

        return $this;
    }

    /**
     * Gets page
     *
     * @return int|null
     */
    public function getPage()
    {
        return $this->container['page'] ?? null;
    }

    /**
     * Sets page
     *
     * @param int|null $page requested page (zero-based)
     *
     * @return self
     */
    public function setPage($page)
    {
        $this->container['page'] = $page;

        return $this;
    }

    /**
     * Gets hitsPerPage
     *
     * @return int|null
     */
    public function getHitsPerPage()
    {
        return $this->container['hitsPerPage'] ?? null;
    }

    /**
     * Sets hitsPerPage
     *
     * @param int|null $hitsPerPage Maximum number of hits in a page. Minimum is 1, maximum is 1000.
     *
     * @return self
     */
    public function setHitsPerPage($hitsPerPage)
    {
        $this->container['hitsPerPage'] = $hitsPerPage;

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
     * @param bool|null $enabled When specified, restricts matches to rules with a specific enabled status. When absent (default), all rules are retrieved, regardless of their enabled status.
     *
     * @return self
     */
    public function setEnabled($enabled)
    {
        $this->container['enabled'] = $enabled;

        return $this;
    }

    /**
     * Gets requestOptions
     *
     * @return object[]|null
     */
    public function getRequestOptions()
    {
        return $this->container['requestOptions'] ?? null;
    }

    /**
     * Sets requestOptions
     *
     * @param object[]|null $requestOptions a mapping of requestOptions to send along with the request
     *
     * @return self
     */
    public function setRequestOptions($requestOptions)
    {
        $this->container['requestOptions'] = $requestOptions;

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

