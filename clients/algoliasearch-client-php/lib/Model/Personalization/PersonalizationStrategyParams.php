<?php

namespace Algolia\AlgoliaSearch\Model\Personalization;

/**
 * PersonalizationStrategyParams Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class PersonalizationStrategyParams extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'eventScoring' => '\Algolia\AlgoliaSearch\Model\Personalization\EventScoring[]',
        'facetScoring' => '\Algolia\AlgoliaSearch\Model\Personalization\FacetScoring[]',
        'personalizationImpact' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'eventScoring' => null,
        'facetScoring' => null,
        'personalizationImpact' => null,
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
        if (isset($data['eventScoring'])) {
            $this->container['eventScoring'] = $data['eventScoring'];
        }
        if (isset($data['facetScoring'])) {
            $this->container['facetScoring'] = $data['facetScoring'];
        }
        if (isset($data['personalizationImpact'])) {
            $this->container['personalizationImpact'] = $data['personalizationImpact'];
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

        if (!isset($this->container['eventScoring']) || $this->container['eventScoring'] === null) {
            $invalidProperties[] = "'eventScoring' can't be null";
        }
        if (!isset($this->container['facetScoring']) || $this->container['facetScoring'] === null) {
            $invalidProperties[] = "'facetScoring' can't be null";
        }
        if (!isset($this->container['personalizationImpact']) || $this->container['personalizationImpact'] === null) {
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
        return $this->container['eventScoring'] ?? null;
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
        return $this->container['facetScoring'] ?? null;
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
        return $this->container['personalizationImpact'] ?? null;
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
}

