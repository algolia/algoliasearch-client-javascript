<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * BatchAssignUserIdsParams Class Doc Comment
 *
 * @category Class
 * @description Assign userID parameters.
 *
 * @package Algolia\AlgoliaSearch
 */
class BatchAssignUserIdsParams extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'cluster' => 'string',
        'users' => 'string[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'cluster' => null,
        'users' => null,
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
        'cluster' => 'setCluster',
        'users' => 'setUsers',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'cluster' => 'getCluster',
        'users' => 'getUsers',
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
        if (isset($data['cluster'])) {
            $this->container['cluster'] = $data['cluster'];
        }
        if (isset($data['users'])) {
            $this->container['users'] = $data['users'];
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

        if (!isset($this->container['cluster']) || $this->container['cluster'] === null) {
            $invalidProperties[] = "'cluster' can't be null";
        }
        if (!isset($this->container['users']) || $this->container['users'] === null) {
            $invalidProperties[] = "'users' can't be null";
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
     * Gets cluster
     *
     * @return string
     */
    public function getCluster()
    {
        return $this->container['cluster'] ?? null;
    }

    /**
     * Sets cluster
     *
     * @param string $cluster name of the cluster
     *
     * @return self
     */
    public function setCluster($cluster)
    {
        $this->container['cluster'] = $cluster;

        return $this;
    }

    /**
     * Gets users
     *
     * @return string[]
     */
    public function getUsers()
    {
        return $this->container['users'] ?? null;
    }

    /**
     * Sets users
     *
     * @param string[] $users userIDs to assign. Note you cannot move users with this method.
     *
     * @return self
     */
    public function setUsers($users)
    {
        $this->container['users'] = $users;

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

