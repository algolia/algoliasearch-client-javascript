<?php

namespace Algolia\AlgoliaSearch\Model\Recommend;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * RecommendationRequest Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class RecommendationRequest implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'recommendationRequest';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'indexName' => 'string',
        'objectID' => 'string',
        'model' => 'string',
        'threshold' => 'int',
        'maxRecommendations' => 'int',
        'queryParameters' => '\Algolia\AlgoliaSearch\Model\Recommend\SearchParams',
        'fallbackParameters' => '\Algolia\AlgoliaSearch\Model\Recommend\SearchParams',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'indexName' => null,
        'objectID' => null,
        'model' => null,
        'threshold' => null,
        'maxRecommendations' => null,
        'queryParameters' => null,
        'fallbackParameters' => null,
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
        'indexName' => 'indexName',
        'objectID' => 'objectID',
        'model' => 'model',
        'threshold' => 'threshold',
        'maxRecommendations' => 'maxRecommendations',
        'queryParameters' => 'queryParameters',
        'fallbackParameters' => 'fallbackParameters',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'indexName' => 'setIndexName',
        'objectID' => 'setObjectID',
        'model' => 'setModel',
        'threshold' => 'setThreshold',
        'maxRecommendations' => 'setMaxRecommendations',
        'queryParameters' => 'setQueryParameters',
        'fallbackParameters' => 'setFallbackParameters',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'indexName' => 'getIndexName',
        'objectID' => 'getObjectID',
        'model' => 'getModel',
        'threshold' => 'getThreshold',
        'maxRecommendations' => 'getMaxRecommendations',
        'queryParameters' => 'getQueryParameters',
        'fallbackParameters' => 'getFallbackParameters',
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

    const MODEL_RELATED_PRODUCTS = 'related-products';
    const MODEL_BOUGHT_TOGETHER = 'bought-together';

    /**
     * Gets allowable values of the enum
     *
     * @return string[]
     */
    public function getModelAllowableValues()
    {
        return [
            self::MODEL_RELATED_PRODUCTS,
            self::MODEL_BOUGHT_TOGETHER,
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
        $this->container['indexName'] = $data['indexName'] ?? null;
        $this->container['objectID'] = $data['objectID'] ?? null;
        $this->container['model'] = $data['model'] ?? null;
        $this->container['threshold'] = $data['threshold'] ?? null;
        $this->container['maxRecommendations'] = $data['maxRecommendations'] ?? 0;
        $this->container['queryParameters'] = $data['queryParameters'] ?? null;
        $this->container['fallbackParameters'] = $data['fallbackParameters'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['indexName'] === null) {
            $invalidProperties[] = "'indexName' can't be null";
        }
        if ($this->container['objectID'] === null) {
            $invalidProperties[] = "'objectID' can't be null";
        }
        if ($this->container['model'] === null) {
            $invalidProperties[] = "'model' can't be null";
        }
        $allowedValues = $this->getModelAllowableValues();
        if (!is_null($this->container['model']) && !in_array($this->container['model'], $allowedValues, true)) {
            $invalidProperties[] = sprintf(
                "invalid value '%s' for 'model', must be one of '%s'",
                $this->container['model'],
                implode("', '", $allowedValues)
            );
        }

        if ($this->container['threshold'] === null) {
            $invalidProperties[] = "'threshold' can't be null";
        }
        if (($this->container['threshold'] > 100)) {
            $invalidProperties[] = "invalid value for 'threshold', must be smaller than or equal to 100.";
        }

        if (($this->container['threshold'] < 0)) {
            $invalidProperties[] = "invalid value for 'threshold', must be bigger than or equal to 0.";
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
        return $this->container['indexName'];
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
     * @param string $objectID unique identifier of the object
     *
     * @return self
     */
    public function setObjectID($objectID)
    {
        $this->container['objectID'] = $objectID;

        return $this;
    }

    /**
     * Gets model
     *
     * @return string
     */
    public function getModel()
    {
        return $this->container['model'];
    }

    /**
     * Sets model
     *
     * @param string $model the recommendation model to use
     *
     * @return self
     */
    public function setModel($model)
    {
        $allowedValues = $this->getModelAllowableValues();
        if (!in_array($model, $allowedValues, true)) {
            throw new \InvalidArgumentException(
                sprintf(
                    "Invalid value '%s' for 'model', must be one of '%s'",
                    $model,
                    implode("', '", $allowedValues)
                )
            );
        }
        $this->container['model'] = $model;

        return $this;
    }

    /**
     * Gets threshold
     *
     * @return int
     */
    public function getThreshold()
    {
        return $this->container['threshold'];
    }

    /**
     * Sets threshold
     *
     * @param int $threshold the threshold to use when filtering recommendations by their score
     *
     * @return self
     */
    public function setThreshold($threshold)
    {
        if (($threshold > 100)) {
            throw new \InvalidArgumentException('invalid value for $threshold when calling RecommendationRequest., must be smaller than or equal to 100.');
        }
        if (($threshold < 0)) {
            throw new \InvalidArgumentException('invalid value for $threshold when calling RecommendationRequest., must be bigger than or equal to 0.');
        }

        $this->container['threshold'] = $threshold;

        return $this;
    }

    /**
     * Gets maxRecommendations
     *
     * @return int|null
     */
    public function getMaxRecommendations()
    {
        return $this->container['maxRecommendations'];
    }

    /**
     * Sets maxRecommendations
     *
     * @param int|null $maxRecommendations The max number of recommendations to retrieve. If it's set to 0, all the recommendations of the objectID may be returned.
     *
     * @return self
     */
    public function setMaxRecommendations($maxRecommendations)
    {
        $this->container['maxRecommendations'] = $maxRecommendations;

        return $this;
    }

    /**
     * Gets queryParameters
     *
     * @return \Algolia\AlgoliaSearch\Model\Recommend\SearchParams|null
     */
    public function getQueryParameters()
    {
        return $this->container['queryParameters'];
    }

    /**
     * Sets queryParameters
     *
     * @param \Algolia\AlgoliaSearch\Model\Recommend\SearchParams|null $queryParameters queryParameters
     *
     * @return self
     */
    public function setQueryParameters($queryParameters)
    {
        $this->container['queryParameters'] = $queryParameters;

        return $this;
    }

    /**
     * Gets fallbackParameters
     *
     * @return \Algolia\AlgoliaSearch\Model\Recommend\SearchParams|null
     */
    public function getFallbackParameters()
    {
        return $this->container['fallbackParameters'];
    }

    /**
     * Sets fallbackParameters
     *
     * @param \Algolia\AlgoliaSearch\Model\Recommend\SearchParams|null $fallbackParameters fallbackParameters
     *
     * @return self
     */
    public function setFallbackParameters($fallbackParameters)
    {
        $this->container['fallbackParameters'] = $fallbackParameters;

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

