<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * Indice Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class Indice extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'name' => 'string',
        'createdAt' => 'string',
        'updatedAt' => 'string',
        'entries' => 'int',
        'dataSize' => 'int',
        'fileSize' => 'int',
        'lastBuildTimeS' => 'int',
        'numberOfPendingTask' => 'int',
        'pendingTask' => 'bool',
        'primary' => 'string',
        'replicas' => 'string[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'name' => null,
        'createdAt' => null,
        'updatedAt' => null,
        'entries' => null,
        'dataSize' => null,
        'fileSize' => null,
        'lastBuildTimeS' => null,
        'numberOfPendingTask' => null,
        'pendingTask' => null,
        'primary' => null,
        'replicas' => null,
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
        'name' => 'setName',
        'createdAt' => 'setCreatedAt',
        'updatedAt' => 'setUpdatedAt',
        'entries' => 'setEntries',
        'dataSize' => 'setDataSize',
        'fileSize' => 'setFileSize',
        'lastBuildTimeS' => 'setLastBuildTimeS',
        'numberOfPendingTask' => 'setNumberOfPendingTask',
        'pendingTask' => 'setPendingTask',
        'primary' => 'setPrimary',
        'replicas' => 'setReplicas',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'name' => 'getName',
        'createdAt' => 'getCreatedAt',
        'updatedAt' => 'getUpdatedAt',
        'entries' => 'getEntries',
        'dataSize' => 'getDataSize',
        'fileSize' => 'getFileSize',
        'lastBuildTimeS' => 'getLastBuildTimeS',
        'numberOfPendingTask' => 'getNumberOfPendingTask',
        'pendingTask' => 'getPendingTask',
        'primary' => 'getPrimary',
        'replicas' => 'getReplicas',
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
        if (isset($data['name'])) {
            $this->container['name'] = $data['name'];
        }
        if (isset($data['createdAt'])) {
            $this->container['createdAt'] = $data['createdAt'];
        }
        if (isset($data['updatedAt'])) {
            $this->container['updatedAt'] = $data['updatedAt'];
        }
        if (isset($data['entries'])) {
            $this->container['entries'] = $data['entries'];
        }
        if (isset($data['dataSize'])) {
            $this->container['dataSize'] = $data['dataSize'];
        }
        if (isset($data['fileSize'])) {
            $this->container['fileSize'] = $data['fileSize'];
        }
        if (isset($data['lastBuildTimeS'])) {
            $this->container['lastBuildTimeS'] = $data['lastBuildTimeS'];
        }
        if (isset($data['numberOfPendingTask'])) {
            $this->container['numberOfPendingTask'] = $data['numberOfPendingTask'];
        }
        if (isset($data['pendingTask'])) {
            $this->container['pendingTask'] = $data['pendingTask'];
        }
        if (isset($data['primary'])) {
            $this->container['primary'] = $data['primary'];
        }
        if (isset($data['replicas'])) {
            $this->container['replicas'] = $data['replicas'];
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

        if (!isset($this->container['name']) || $this->container['name'] === null) {
            $invalidProperties[] = "'name' can't be null";
        }
        if (!isset($this->container['createdAt']) || $this->container['createdAt'] === null) {
            $invalidProperties[] = "'createdAt' can't be null";
        }
        if (!isset($this->container['updatedAt']) || $this->container['updatedAt'] === null) {
            $invalidProperties[] = "'updatedAt' can't be null";
        }
        if (!isset($this->container['entries']) || $this->container['entries'] === null) {
            $invalidProperties[] = "'entries' can't be null";
        }
        if (!isset($this->container['dataSize']) || $this->container['dataSize'] === null) {
            $invalidProperties[] = "'dataSize' can't be null";
        }
        if (!isset($this->container['fileSize']) || $this->container['fileSize'] === null) {
            $invalidProperties[] = "'fileSize' can't be null";
        }
        if (!isset($this->container['lastBuildTimeS']) || $this->container['lastBuildTimeS'] === null) {
            $invalidProperties[] = "'lastBuildTimeS' can't be null";
        }
        if (!isset($this->container['pendingTask']) || $this->container['pendingTask'] === null) {
            $invalidProperties[] = "'pendingTask' can't be null";
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
     * Gets name
     *
     * @return string
     */
    public function getName()
    {
        return $this->container['name'] ?? null;
    }

    /**
     * Sets name
     *
     * @param string $name index name
     *
     * @return self
     */
    public function setName($name)
    {
        $this->container['name'] = $name;

        return $this;
    }

    /**
     * Gets createdAt
     *
     * @return string
     */
    public function getCreatedAt()
    {
        return $this->container['createdAt'] ?? null;
    }

    /**
     * Sets createdAt
     *
     * @param string $createdAt Index creation date. An empty string means that the index has no records.
     *
     * @return self
     */
    public function setCreatedAt($createdAt)
    {
        $this->container['createdAt'] = $createdAt;

        return $this;
    }

    /**
     * Gets updatedAt
     *
     * @return string
     */
    public function getUpdatedAt()
    {
        return $this->container['updatedAt'] ?? null;
    }

    /**
     * Sets updatedAt
     *
     * @param string $updatedAt date of last update (ISO-8601 format)
     *
     * @return self
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->container['updatedAt'] = $updatedAt;

        return $this;
    }

    /**
     * Gets entries
     *
     * @return int
     */
    public function getEntries()
    {
        return $this->container['entries'] ?? null;
    }

    /**
     * Sets entries
     *
     * @param int $entries number of records contained in the index
     *
     * @return self
     */
    public function setEntries($entries)
    {
        $this->container['entries'] = $entries;

        return $this;
    }

    /**
     * Gets dataSize
     *
     * @return int
     */
    public function getDataSize()
    {
        return $this->container['dataSize'] ?? null;
    }

    /**
     * Sets dataSize
     *
     * @param int $dataSize number of bytes of the index in minified format
     *
     * @return self
     */
    public function setDataSize($dataSize)
    {
        $this->container['dataSize'] = $dataSize;

        return $this;
    }

    /**
     * Gets fileSize
     *
     * @return int
     */
    public function getFileSize()
    {
        return $this->container['fileSize'] ?? null;
    }

    /**
     * Sets fileSize
     *
     * @param int $fileSize number of bytes of the index binary file
     *
     * @return self
     */
    public function setFileSize($fileSize)
    {
        $this->container['fileSize'] = $fileSize;

        return $this;
    }

    /**
     * Gets lastBuildTimeS
     *
     * @return int
     */
    public function getLastBuildTimeS()
    {
        return $this->container['lastBuildTimeS'] ?? null;
    }

    /**
     * Sets lastBuildTimeS
     *
     * @param int $lastBuildTimeS last build time
     *
     * @return self
     */
    public function setLastBuildTimeS($lastBuildTimeS)
    {
        $this->container['lastBuildTimeS'] = $lastBuildTimeS;

        return $this;
    }

    /**
     * Gets numberOfPendingTask
     *
     * @return int|null
     */
    public function getNumberOfPendingTask()
    {
        return $this->container['numberOfPendingTask'] ?? null;
    }

    /**
     * Sets numberOfPendingTask
     *
     * @param int|null $numberOfPendingTask Number of pending indexing operations. This value is deprecated and should not be used.
     *
     * @return self
     */
    public function setNumberOfPendingTask($numberOfPendingTask)
    {
        $this->container['numberOfPendingTask'] = $numberOfPendingTask;

        return $this;
    }

    /**
     * Gets pendingTask
     *
     * @return bool
     */
    public function getPendingTask()
    {
        return $this->container['pendingTask'] ?? null;
    }

    /**
     * Sets pendingTask
     *
     * @param bool $pendingTask A boolean which says whether the index has pending tasks. This value is deprecated and should not be used.
     *
     * @return self
     */
    public function setPendingTask($pendingTask)
    {
        $this->container['pendingTask'] = $pendingTask;

        return $this;
    }

    /**
     * Gets primary
     *
     * @return string|null
     */
    public function getPrimary()
    {
        return $this->container['primary'] ?? null;
    }

    /**
     * Sets primary
     *
     * @param string|null $primary Only present if the index is a replica. Contains the name of the related primary index.
     *
     * @return self
     */
    public function setPrimary($primary)
    {
        $this->container['primary'] = $primary;

        return $this;
    }

    /**
     * Gets replicas
     *
     * @return string[]|null
     */
    public function getReplicas()
    {
        return $this->container['replicas'] ?? null;
    }

    /**
     * Sets replicas
     *
     * @param string[]|null $replicas Only present if the index is a primary index with replicas. Contains the names of all linked replicas.
     *
     * @return self
     */
    public function setReplicas($replicas)
    {
        $this->container['replicas'] = $replicas;

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

