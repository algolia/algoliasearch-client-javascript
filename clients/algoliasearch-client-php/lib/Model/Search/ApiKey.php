<?php

namespace Algolia\AlgoliaSearch\Model\Search;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * ApiKey Class Doc Comment
 *
 * @category Class
 * @description Api Key object.
 *
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class ApiKey implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'apiKey';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'acl' => 'string[]',
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
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
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
        'acl' => 'acl',
        'description' => 'description',
        'indexes' => 'indexes',
        'maxHitsPerQuery' => 'maxHitsPerQuery',
        'maxQueriesPerIPPerHour' => 'maxQueriesPerIPPerHour',
        'queryParameters' => 'queryParameters',
        'referers' => 'referers',
        'validity' => 'validity',
    ];

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

    const ACL_ADD_OBJECT = 'addObject';
    const ACL_ANALYTICS = 'analytics';
    const ACL_BROWSE = 'browse';
    const ACL_DELETE_OBJECT = 'deleteObject';
    const ACL_DELETE_INDEX = 'deleteIndex';
    const ACL_EDIT_SETTINGS = 'editSettings';
    const ACL_LIST_INDEXES = 'listIndexes';
    const ACL_LOGS = 'logs';
    const ACL_PERSONALIZATION = 'personalization';
    const ACL_RECOMMENDATION = 'recommendation';
    const ACL_SEARCH = 'search';
    const ACL_SEE_UNRETRIEVABLE_ATTRIBUTES = 'seeUnretrievableAttributes';
    const ACL_SETTINGS = 'settings';
    const ACL_USAGE = 'usage';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public function getAclAllowableValues()
    {
        return [
            self::ACL_ADD_OBJECT,
            self::ACL_ANALYTICS,
            self::ACL_BROWSE,
            self::ACL_DELETE_OBJECT,
            self::ACL_DELETE_INDEX,
            self::ACL_EDIT_SETTINGS,
            self::ACL_LIST_INDEXES,
            self::ACL_LOGS,
            self::ACL_PERSONALIZATION,
            self::ACL_RECOMMENDATION,
            self::ACL_SEARCH,
            self::ACL_SEE_UNRETRIEVABLE_ATTRIBUTES,
            self::ACL_SETTINGS,
            self::ACL_USAGE,
        ];
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
        $this->container['acl'] = $data['acl'] ?? null;
        $this->container['description'] = $data['description'] ?? '';
        $this->container['indexes'] = $data['indexes'] ?? null;
        $this->container['maxHitsPerQuery'] = $data['maxHitsPerQuery'] ?? 0;
        $this->container['maxQueriesPerIPPerHour'] = $data['maxQueriesPerIPPerHour'] ?? 0;
        $this->container['queryParameters'] = $data['queryParameters'] ?? '';
        $this->container['referers'] = $data['referers'] ?? null;
        $this->container['validity'] = $data['validity'] ?? 0;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['acl'] === null) {
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
     * @return string[]
     */
    public function getAcl()
    {
        return $this->container['acl'];
    }

    /**
     * Sets acl
     *
     * @param string[] $acl set of permissions associated with the key
     *
     * @return self
     */
    public function setAcl($acl)
    {
        $allowedValues = $this->getAclAllowableValues();
        if (array_diff($acl, $allowedValues)) {
            throw new \InvalidArgumentException(
                sprintf(
                    "Invalid value for 'acl', must be one of '%s'",
                    implode("', '", $allowedValues)
                )
            );
        }
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
        return $this->container['description'];
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
        return $this->container['indexes'];
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
        return $this->container['maxHitsPerQuery'];
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
        return $this->container['maxQueriesPerIPPerHour'];
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
        return $this->container['queryParameters'];
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
        return $this->container['referers'];
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
        return $this->container['validity'];
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

