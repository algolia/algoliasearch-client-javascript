<?php

namespace Algolia\AlgoliaSearch\Model\Search;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * SearchUserIdsResponseHits Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class SearchUserIdsResponseHits implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'searchUserIdsResponse_hits';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'userID' => 'string',
        'clusterName' => 'string',
        'nbRecords' => 'int',
        'dataSize' => 'int',
        'objectID' => 'string',
        'highlightResult' => '\Algolia\AlgoliaSearch\Model\Search\SearchUserIdsResponseHighlightResult',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'userID' => null,
        'clusterName' => null,
        'nbRecords' => null,
        'dataSize' => null,
        'objectID' => null,
        'highlightResult' => null,
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
        'userID' => 'userID',
        'clusterName' => 'clusterName',
        'nbRecords' => 'nbRecords',
        'dataSize' => 'dataSize',
        'objectID' => 'objectID',
        'highlightResult' => '_highlightResult',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'userID' => 'setUserID',
        'clusterName' => 'setClusterName',
        'nbRecords' => 'setNbRecords',
        'dataSize' => 'setDataSize',
        'objectID' => 'setObjectID',
        'highlightResult' => 'setHighlightResult',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'userID' => 'getUserID',
        'clusterName' => 'getClusterName',
        'nbRecords' => 'getNbRecords',
        'dataSize' => 'getDataSize',
        'objectID' => 'getObjectID',
        'highlightResult' => 'getHighlightResult',
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
        $this->container['userID'] = $data['userID'] ?? null;
        $this->container['clusterName'] = $data['clusterName'] ?? null;
        $this->container['nbRecords'] = $data['nbRecords'] ?? null;
        $this->container['dataSize'] = $data['dataSize'] ?? null;
        $this->container['objectID'] = $data['objectID'] ?? null;
        $this->container['highlightResult'] = $data['highlightResult'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['userID'] === null) {
            $invalidProperties[] = "'userID' can't be null";
        }
        if (!preg_match('/^[a-zA-Z0-9 \\-*.]+$/', $this->container['userID'])) {
            $invalidProperties[] = "invalid value for 'userID', must be conform to the pattern /^[a-zA-Z0-9 \\-*.]+$/.";
        }

        if ($this->container['clusterName'] === null) {
            $invalidProperties[] = "'clusterName' can't be null";
        }
        if ($this->container['nbRecords'] === null) {
            $invalidProperties[] = "'nbRecords' can't be null";
        }
        if ($this->container['dataSize'] === null) {
            $invalidProperties[] = "'dataSize' can't be null";
        }
        if ($this->container['objectID'] === null) {
            $invalidProperties[] = "'objectID' can't be null";
        }
        if ($this->container['highlightResult'] === null) {
            $invalidProperties[] = "'highlightResult' can't be null";
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
     * Gets userID
     *
     * @return string
     */
    public function getUserID()
    {
        return $this->container['userID'];
    }

    /**
     * Sets userID
     *
     * @param string $userID userID of the user
     *
     * @return self
     */
    public function setUserID($userID)
    {
        if ((!preg_match('/^[a-zA-Z0-9 \\-*.]+$/', $userID))) {
            throw new \InvalidArgumentException("invalid value for $userID when calling SearchUserIdsResponseHits., must conform to the pattern /^[a-zA-Z0-9 \\-*.]+$/.");
        }

        $this->container['userID'] = $userID;

        return $this;
    }

    /**
     * Gets clusterName
     *
     * @return string
     */
    public function getClusterName()
    {
        return $this->container['clusterName'];
    }

    /**
     * Sets clusterName
     *
     * @param string $clusterName name of the cluster
     *
     * @return self
     */
    public function setClusterName($clusterName)
    {
        $this->container['clusterName'] = $clusterName;

        return $this;
    }

    /**
     * Gets nbRecords
     *
     * @return int
     */
    public function getNbRecords()
    {
        return $this->container['nbRecords'];
    }

    /**
     * Sets nbRecords
     *
     * @param int $nbRecords number of records in the cluster
     *
     * @return self
     */
    public function setNbRecords($nbRecords)
    {
        $this->container['nbRecords'] = $nbRecords;

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
     * @param int $dataSize data size taken by all the users assigned to the cluster
     *
     * @return self
     */
    public function setDataSize($dataSize)
    {
        $this->container['dataSize'] = $dataSize;

        return $this;
    }

    /**
     * Gets objectID
     *
     * @return string
     */
    public function getObjectID()
    {
        return $this->container['objectID'];
    }

    /**
     * Sets objectID
     *
     * @param string $objectID userID of the requested user. Same as userID.
     *
     * @return self
     */
    public function setObjectID($objectID)
    {
        $this->container['objectID'] = $objectID;

        return $this;
    }

    /**
     * Gets highlightResult
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\SearchUserIdsResponseHighlightResult
     */
    public function getHighlightResult()
    {
        return $this->container['highlightResult'];
    }

    /**
     * Sets highlightResult
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\SearchUserIdsResponseHighlightResult $highlightResult highlightResult
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

