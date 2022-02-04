<?php

namespace Algolia\AlgoliaSearch\Model\Personalization;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * PersonalizationStrategyParams Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class PersonalizationStrategyParams implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'personalizationStrategyParams';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'eventScoring' => '\Algolia\AlgoliaSearch\Model\Personalization\EventScoring[]',
        'facetScoring' => '\Algolia\AlgoliaSearch\Model\Personalization\FacetScoring[]',
        'personalizationImpact' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'eventScoring' => null,
        'facetScoring' => null,
        'personalizationImpact' => null,
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
        'eventScoring' => 'eventScoring',
        'facetScoring' => 'facetScoring',
        'personalizationImpact' => 'personalizationImpact',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'eventScoring' => 'setEventScoring',
        'facetScoring' => 'setFacetScoring',
        'personalizationImpact' => 'setPersonalizationImpact',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'eventScoring' => 'getEventScoring',
        'facetScoring' => 'getFacetScoring',
        'personalizationImpact' => 'getPersonalizationImpact',
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
        $this->container['eventScoring'] = $data['eventScoring'] ?? null;
        $this->container['facetScoring'] = $data['facetScoring'] ?? null;
        $this->container['personalizationImpact'] = $data['personalizationImpact'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['eventScoring'] === null) {
            $invalidProperties[] = "'eventScoring' can't be null";
        }
        if ($this->container['facetScoring'] === null) {
            $invalidProperties[] = "'facetScoring' can't be null";
        }
        if ($this->container['personalizationImpact'] === null) {
            $invalidProperties[] = "'personalizationImpact' can't be null";
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
     * Gets eventScoring
     *
     * @return \Algolia\AlgoliaSearch\Model\Personalization\EventScoring[]
     */
    public function getEventScoring()
    {
        return $this->container['eventScoring'];
    }

    /**
     * Sets eventScoring
     *
     * @param \Algolia\AlgoliaSearch\Model\Personalization\EventScoring[] $eventScoring scores associated with the events
     *
     * @return self
     */
    public function setEventScoring($eventScoring)
    {
        $this->container['eventScoring'] = $eventScoring;

        return $this;
    }

    /**
     * Gets facetScoring
     *
     * @return \Algolia\AlgoliaSearch\Model\Personalization\FacetScoring[]
     */
    public function getFacetScoring()
    {
        return $this->container['facetScoring'];
    }

    /**
     * Sets facetScoring
     *
     * @param \Algolia\AlgoliaSearch\Model\Personalization\FacetScoring[] $facetScoring scores associated with the facets
     *
     * @return self
     */
    public function setFacetScoring($facetScoring)
    {
        $this->container['facetScoring'] = $facetScoring;

        return $this;
    }

    /**
     * Gets personalizationImpact
     *
     * @return int
     */
    public function getPersonalizationImpact()
    {
        return $this->container['personalizationImpact'];
    }

    /**
     * Sets personalizationImpact
     *
     * @param int $personalizationImpact the impact that personalization has on search results: a number between 0 (personalization disabled) and 100 (personalization fully enabled)
     *
     * @return self
     */
    public function setPersonalizationImpact($personalizationImpact)
    {
        $this->container['personalizationImpact'] = $personalizationImpact;

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

