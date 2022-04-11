<?php

namespace Algolia\AlgoliaSearch\Model\Recommend;

/**
 * BaseTrendingRequest Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class BaseTrendingRequest extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'model' => '\Algolia\AlgoliaSearch\Model\Recommend\TrendingModels',
        'facetName' => 'string',
        'facetValue' => 'string',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'model' => null,
        'facetName' => null,
        'facetValue' => null,
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
        'model' => 'setModel',
        'facetName' => 'setFacetName',
        'facetValue' => 'setFacetValue',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'model' => 'getModel',
        'facetName' => 'getFacetName',
        'facetValue' => 'getFacetValue',
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
        if (isset($data['model'])) {
            $this->container['model'] = $data['model'];
        }
        if (isset($data['facetName'])) {
            $this->container['facetName'] = $data['facetName'];
        }
        if (isset($data['facetValue'])) {
            $this->container['facetValue'] = $data['facetValue'];
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

        if (!isset($this->container['model']) || $this->container['model'] === null) {
            $invalidProperties[] = "'model' can't be null";
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
     * Gets model
     *
     * @return \Algolia\AlgoliaSearch\Model\Recommend\TrendingModels
     */
    public function getModel()
    {
        return $this->container['model'] ?? null;
    }

    /**
     * Sets model
     *
     * @param \Algolia\AlgoliaSearch\Model\Recommend\TrendingModels $model model
     *
     * @return self
     */
    public function setModel($model)
    {
        $this->container['model'] = $model;

        return $this;
    }

    /**
     * Gets facetName
     *
     * @return string|null
     */
    public function getFacetName()
    {
        return $this->container['facetName'] ?? null;
    }

    /**
     * Sets facetName
     *
     * @param string|null $facetName the facet name to use for trending models
     *
     * @return self
     */
    public function setFacetName($facetName)
    {
        $this->container['facetName'] = $facetName;

        return $this;
    }

    /**
     * Gets facetValue
     *
     * @return string|null
     */
    public function getFacetValue()
    {
        return $this->container['facetValue'] ?? null;
    }

    /**
     * Sets facetValue
     *
     * @param string|null $facetValue the facet value to use for trending models
     *
     * @return self
     */
    public function setFacetValue($facetValue)
    {
        $this->container['facetValue'] = $facetValue;

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

