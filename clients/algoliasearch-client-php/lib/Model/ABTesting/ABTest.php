<?php

namespace Algolia\AlgoliaSearch\Model\ABTesting;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * ABTest Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class ABTest implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'ABTest';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'abTestID' => 'int',
        'clickSignificance' => 'double',
        'conversionSignificance' => 'double',
        'endAt' => 'string',
        'createdAt' => 'string',
        'name' => 'string',
        'status' => 'string',
        'variants' => '\Algolia\AlgoliaSearch\Model\ABTesting\Variant[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'abTestID' => null,
        'clickSignificance' => 'double',
        'conversionSignificance' => 'double',
        'endAt' => null,
        'createdAt' => null,
        'name' => null,
        'status' => null,
        'variants' => null,
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
        'abTestID' => 'abTestID',
        'clickSignificance' => 'clickSignificance',
        'conversionSignificance' => 'conversionSignificance',
        'endAt' => 'endAt',
        'createdAt' => 'createdAt',
        'name' => 'name',
        'status' => 'status',
        'variants' => 'variants',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'abTestID' => 'setAbTestID',
        'clickSignificance' => 'setClickSignificance',
        'conversionSignificance' => 'setConversionSignificance',
        'endAt' => 'setEndAt',
        'createdAt' => 'setCreatedAt',
        'name' => 'setName',
        'status' => 'setStatus',
        'variants' => 'setVariants',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'abTestID' => 'getAbTestID',
        'clickSignificance' => 'getClickSignificance',
        'conversionSignificance' => 'getConversionSignificance',
        'endAt' => 'getEndAt',
        'createdAt' => 'getCreatedAt',
        'name' => 'getName',
        'status' => 'getStatus',
        'variants' => 'getVariants',
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
        $this->container['abTestID'] = $data['abTestID'] ?? null;
        $this->container['clickSignificance'] = $data['clickSignificance'] ?? null;
        $this->container['conversionSignificance'] = $data['conversionSignificance'] ?? null;
        $this->container['endAt'] = $data['endAt'] ?? null;
        $this->container['createdAt'] = $data['createdAt'] ?? null;
        $this->container['name'] = $data['name'] ?? null;
        $this->container['status'] = $data['status'] ?? null;
        $this->container['variants'] = $data['variants'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['abTestID'] === null) {
            $invalidProperties[] = "'abTestID' can't be null";
        }
        if ($this->container['clickSignificance'] === null) {
            $invalidProperties[] = "'clickSignificance' can't be null";
        }
        if ($this->container['conversionSignificance'] === null) {
            $invalidProperties[] = "'conversionSignificance' can't be null";
        }
        if ($this->container['endAt'] === null) {
            $invalidProperties[] = "'endAt' can't be null";
        }
        if ($this->container['createdAt'] === null) {
            $invalidProperties[] = "'createdAt' can't be null";
        }
        if ($this->container['name'] === null) {
            $invalidProperties[] = "'name' can't be null";
        }
        if ($this->container['status'] === null) {
            $invalidProperties[] = "'status' can't be null";
        }
        if ($this->container['variants'] === null) {
            $invalidProperties[] = "'variants' can't be null";
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
     * Gets abTestID
     *
     * @return int
     */
    public function getAbTestID()
    {
        return $this->container['abTestID'];
    }

    /**
     * Sets abTestID
     *
     * @param int $abTestID the A/B test ID
     *
     * @return self
     */
    public function setAbTestID($abTestID)
    {
        $this->container['abTestID'] = $abTestID;

        return $this;
    }

    /**
     * Gets clickSignificance
     *
     * @return float
     */
    public function getClickSignificance()
    {
        return $this->container['clickSignificance'];
    }

    /**
     * Sets clickSignificance
     *
     * @param float $clickSignificance A/B test significance based on click data. Should be > 0.95 to be considered significant (no matter which variant is winning).
     *
     * @return self
     */
    public function setClickSignificance($clickSignificance)
    {
        $this->container['clickSignificance'] = $clickSignificance;

        return $this;
    }

    /**
     * Gets conversionSignificance
     *
     * @return float
     */
    public function getConversionSignificance()
    {
        return $this->container['conversionSignificance'];
    }

    /**
     * Sets conversionSignificance
     *
     * @param float $conversionSignificance A/B test significance based on conversion data. Should be > 0.95 to be considered significant (no matter which variant is winning).
     *
     * @return self
     */
    public function setConversionSignificance($conversionSignificance)
    {
        $this->container['conversionSignificance'] = $conversionSignificance;

        return $this;
    }

    /**
     * Gets endAt
     *
     * @return string
     */
    public function getEndAt()
    {
        return $this->container['endAt'];
    }

    /**
     * Sets endAt
     *
     * @param string $endAt end date for the A/B test expressed as YYYY-MM-DDThh:mm:ssZ
     *
     * @return self
     */
    public function setEndAt($endAt)
    {
        $this->container['endAt'] = $endAt;

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
     * @param string $createdAt end date for the A/B test expressed as YYYY-MM-DDThh:mm:ssZ
     *
     * @return self
     */
    public function setCreatedAt($createdAt)
    {
        $this->container['createdAt'] = $createdAt;

        return $this;
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
     * @param string $name A/B test name
     *
     * @return self
     */
    public function setName($name)
    {
        $this->container['name'] = $name;

        return $this;
    }

    /**
     * Gets status
     *
     * @return string
     */
    public function getStatus()
    {
        return $this->container['status'];
    }

    /**
     * Sets status
     *
     * @param string $status status of the A/B test
     *
     * @return self
     */
    public function setStatus($status)
    {
        $this->container['status'] = $status;

        return $this;
    }

    /**
     * Gets variants
     *
     * @return \Algolia\AlgoliaSearch\Model\ABTesting\Variant[]
     */
    public function getVariants()
    {
        return $this->container['variants'];
    }

    /**
     * Sets variants
     *
     * @param \Algolia\AlgoliaSearch\Model\ABTesting\Variant[] $variants list of A/B test variant
     *
     * @return self
     */
    public function setVariants($variants)
    {
        $this->container['variants'] = $variants;

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

