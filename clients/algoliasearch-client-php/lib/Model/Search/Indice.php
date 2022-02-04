<?php

namespace Algolia\AlgoliaSearch\Model\Search;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * Indice Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class Indice implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'indice';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
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
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
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
    public static function openAPITypes()
    {
        return self::$openAPITypes;
    }

    /**
     * Array of property to format mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPIFormats()
    {
        return self::$openAPIFormats;
    }

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @var string[]
     */
    protected static $attributeMap = [
        'name' => 'name',
        'createdAt' => 'createdAt',
        'updatedAt' => 'updatedAt',
        'entries' => 'entries',
        'dataSize' => 'dataSize',
        'fileSize' => 'fileSize',
        'lastBuildTimeS' => 'lastBuildTimeS',
        'numberOfPendingTask' => 'numberOfPendingTask',
        'pendingTask' => 'pendingTask',
        'primary' => 'primary',
        'replicas' => 'replicas',
    ];

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
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @return array
     */
    public static function attributeMap()
    {
        return self::$attributeMap;
    }

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
     * The original name of the model.
     *
     * @return string
     */
    public function getModelName()
    {
        return self::$openAPIModelName;
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
     *                      initializing the model
     */
    public function __construct(array $data = null)
    {
        $this->container['name'] = $data['name'] ?? null;
        $this->container['createdAt'] = $data['createdAt'] ?? null;
        $this->container['updatedAt'] = $data['updatedAt'] ?? null;
        $this->container['entries'] = $data['entries'] ?? null;
        $this->container['dataSize'] = $data['dataSize'] ?? null;
        $this->container['fileSize'] = $data['fileSize'] ?? null;
        $this->container['lastBuildTimeS'] = $data['lastBuildTimeS'] ?? null;
        $this->container['numberOfPendingTask'] = $data['numberOfPendingTask'] ?? null;
        $this->container['pendingTask'] = $data['pendingTask'] ?? null;
        $this->container['primary'] = $data['primary'] ?? null;
        $this->container['replicas'] = $data['replicas'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['name'] === null) {
            $invalidProperties[] = "'name' can't be null";
        }
        if ($this->container['createdAt'] === null) {
            $invalidProperties[] = "'createdAt' can't be null";
        }
        if ($this->container['updatedAt'] === null) {
            $invalidProperties[] = "'updatedAt' can't be null";
        }
        if ($this->container['entries'] === null) {
            $invalidProperties[] = "'entries' can't be null";
        }
        if ($this->container['dataSize'] === null) {
            $invalidProperties[] = "'dataSize' can't be null";
        }
        if ($this->container['fileSize'] === null) {
            $invalidProperties[] = "'fileSize' can't be null";
        }
        if ($this->container['lastBuildTimeS'] === null) {
            $invalidProperties[] = "'lastBuildTimeS' can't be null";
        }
        if ($this->container['pendingTask'] === null) {
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
        return $this->container['name'];
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
        return $this->container['createdAt'];
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
        return $this->container['updatedAt'];
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
        return $this->container['entries'];
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
        return $this->container['dataSize'];
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
        return $this->container['fileSize'];
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
        return $this->container['lastBuildTimeS'];
    }

    /**
     * Sets lastBuildTimeS
     *
     * @param int $lastBuildTimeS Last build time
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
        return $this->container['numberOfPendingTask'];
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
        return $this->container['pendingTask'];
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
        return $this->container['primary'];
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
        return $this->container['replicas'];
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

    /**
     * Serializes the object to a value that can be serialized natively by json_encode().
     *
     * @link https://www.php.net/manual/en/jsonserializable.jsonserialize.php
     *
     * @return mixed returns data which can be serialized by json_encode(), which is a value
     * of any type other than a resource
     */
    public function jsonSerialize()
    {
        return ObjectSerializer::sanitizeForSerialization($this);
    }

    /**
     * Gets the string presentation of the object
     *
     * @return string
     */
    public function __toString()
    {
        return json_encode(
            ObjectSerializer::sanitizeForSerialization($this),
            JSON_PRETTY_PRINT
        );
    }

    /**
     * Gets a header-safe presentation of the object
     *
     * @return string
     */
    public function toHeaderValue()
    {
        return json_encode(ObjectSerializer::sanitizeForSerialization($this));
    }
}

