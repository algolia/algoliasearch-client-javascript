<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * ApiKey Class Doc Comment
 *
 * @category Class
 * @description Api Key object.
 *
 * @package Algolia\AlgoliaSearch
 */
class ApiKey extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'acl' => '\Algolia\AlgoliaSearch\Model\Search\Acl[]',
        'description' => 'string',
        'indexes' => 'string[]',
        'maxHitsPerQuery' => 'int',
        'maxQueriesPerIPPerHour' => 'int',
        'queryParameters' => 'string',
        'referers' => 'string[]',
        'validity' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'acl' => null,
        'description' => null,
        'indexes' => null,
        'maxHitsPerQuery' => null,
        'maxQueriesPerIPPerHour' => null,
        'queryParameters' => null,
        'referers' => null,
        'validity' => null,
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
        'acl' => 'setAcl',
        'description' => 'setDescription',
        'indexes' => 'setIndexes',
        'maxHitsPerQuery' => 'setMaxHitsPerQuery',
        'maxQueriesPerIPPerHour' => 'setMaxQueriesPerIPPerHour',
        'queryParameters' => 'setQueryParameters',
        'referers' => 'setReferers',
        'validity' => 'setValidity',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'acl' => 'getAcl',
        'description' => 'getDescription',
        'indexes' => 'getIndexes',
        'maxHitsPerQuery' => 'getMaxHitsPerQuery',
        'maxQueriesPerIPPerHour' => 'getMaxQueriesPerIPPerHour',
        'queryParameters' => 'getQueryParameters',
        'referers' => 'getReferers',
        'validity' => 'getValidity',
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
        if (isset($data['acl'])) {
            $this->container['acl'] = $data['acl'];
        }
        if (isset($data['description'])) {
            $this->container['description'] = $data['description'];
        }
        if (isset($data['indexes'])) {
            $this->container['indexes'] = $data['indexes'];
        }
        if (isset($data['maxHitsPerQuery'])) {
            $this->container['maxHitsPerQuery'] = $data['maxHitsPerQuery'];
        }
        if (isset($data['maxQueriesPerIPPerHour'])) {
            $this->container['maxQueriesPerIPPerHour'] = $data['maxQueriesPerIPPerHour'];
        }
        if (isset($data['queryParameters'])) {
            $this->container['queryParameters'] = $data['queryParameters'];
        }
        if (isset($data['referers'])) {
            $this->container['referers'] = $data['referers'];
        }
        if (isset($data['validity'])) {
            $this->container['validity'] = $data['validity'];
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

        if (!isset($this->container['acl']) || $this->container['acl'] === null) {
            $invalidProperties[] = "'acl' can't be null";
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
     * Gets acl
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\Acl[]
     */
    public function getAcl()
    {
        return $this->container['acl'] ?? null;
    }

    /**
     * Sets acl
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\Acl[] $acl set of permissions associated with the key
     *
     * @return self
     */
    public function setAcl($acl)
    {
        $this->container['acl'] = $acl;

        return $this;
    }

    /**
     * Gets description
     *
     * @return string|null
     */
    public function getDescription()
    {
        return $this->container['description'] ?? null;
    }

    /**
     * Sets description
     *
     * @param string|null $description A comment used to identify a key more easily in the dashboard. It is not interpreted by the API.
     *
     * @return self
     */
    public function setDescription($description)
    {
        $this->container['description'] = $description;

        return $this;
    }

    /**
     * Gets indexes
     *
     * @return string[]|null
     */
    public function getIndexes()
    {
        return $this->container['indexes'] ?? null;
    }

    /**
     * Sets indexes
     *
     * @param string[]|null $indexes Restrict this new API key to a list of indices or index patterns. If the list is empty, all indices are allowed.
     *
     * @return self
     */
    public function setIndexes($indexes)
    {
        $this->container['indexes'] = $indexes;

        return $this;
    }

    /**
     * Gets maxHitsPerQuery
     *
     * @return int|null
     */
    public function getMaxHitsPerQuery()
    {
        return $this->container['maxHitsPerQuery'] ?? null;
    }

    /**
     * Sets maxHitsPerQuery
     *
     * @param int|null $maxHitsPerQuery Maximum number of hits this API key can retrieve in one query. If zero, no limit is enforced.
     *
     * @return self
     */
    public function setMaxHitsPerQuery($maxHitsPerQuery)
    {
        $this->container['maxHitsPerQuery'] = $maxHitsPerQuery;

        return $this;
    }

    /**
     * Gets maxQueriesPerIPPerHour
     *
     * @return int|null
     */
    public function getMaxQueriesPerIPPerHour()
    {
        return $this->container['maxQueriesPerIPPerHour'] ?? null;
    }

    /**
     * Sets maxQueriesPerIPPerHour
     *
     * @param int|null $maxQueriesPerIPPerHour maximum number of API calls per hour allowed from a given IP address or a user token
     *
     * @return self
     */
    public function setMaxQueriesPerIPPerHour($maxQueriesPerIPPerHour)
    {
        $this->container['maxQueriesPerIPPerHour'] = $maxQueriesPerIPPerHour;

        return $this;
    }

    /**
     * Gets queryParameters
     *
     * @return string|null
     */
    public function getQueryParameters()
    {
        return $this->container['queryParameters'] ?? null;
    }

    /**
     * Sets queryParameters
     *
     * @param string|null $queryParameters URL-encoded query string. Force some query parameters to be applied for each query made with this API key.
     *
     * @return self
     */
    public function setQueryParameters($queryParameters)
    {
        $this->container['queryParameters'] = $queryParameters;

        return $this;
    }

    /**
     * Gets referers
     *
     * @return string[]|null
     */
    public function getReferers()
    {
        return $this->container['referers'] ?? null;
    }

    /**
     * Sets referers
     *
     * @param string[]|null $referers Restrict this new API key to specific referers. If empty or blank, defaults to all referers.
     *
     * @return self
     */
    public function setReferers($referers)
    {
        $this->container['referers'] = $referers;

        return $this;
    }

    /**
     * Gets validity
     *
     * @return int|null
     */
    public function getValidity()
    {
        return $this->container['validity'] ?? null;
    }

    /**
     * Sets validity
     *
     * @param int|null $validity Validity limit for this key in seconds. The key will automatically be removed after this period of time.
     *
     * @return self
     */
    public function setValidity($validity)
    {
        $this->container['validity'] = $validity;

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

