<?php

namespace Algolia\AlgoliaSearch\Model\Abtesting;

/**
 * ABTest Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class ABTest extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'abTestID' => 'int',
        'clickSignificance' => 'double',
        'conversionSignificance' => 'double',
        'endAt' => 'string',
        'createdAt' => 'string',
        'name' => 'string',
        'status' => 'string',
        'variants' => '\Algolia\AlgoliaSearch\Model\Abtesting\Variant[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
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
        if (isset($data['abTestID'])) {
            $this->container['abTestID'] = $data['abTestID'];
        }
        if (isset($data['clickSignificance'])) {
            $this->container['clickSignificance'] = $data['clickSignificance'];
        }
        if (isset($data['conversionSignificance'])) {
            $this->container['conversionSignificance'] = $data['conversionSignificance'];
        }
        if (isset($data['endAt'])) {
            $this->container['endAt'] = $data['endAt'];
        }
        if (isset($data['createdAt'])) {
            $this->container['createdAt'] = $data['createdAt'];
        }
        if (isset($data['name'])) {
            $this->container['name'] = $data['name'];
        }
        if (isset($data['status'])) {
            $this->container['status'] = $data['status'];
        }
        if (isset($data['variants'])) {
            $this->container['variants'] = $data['variants'];
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

        if (!isset($this->container['abTestID']) || $this->container['abTestID'] === null) {
            $invalidProperties[] = "'abTestID' can't be null";
        }
        if (!isset($this->container['clickSignificance']) || $this->container['clickSignificance'] === null) {
            $invalidProperties[] = "'clickSignificance' can't be null";
        }
        if (!isset($this->container['conversionSignificance']) || $this->container['conversionSignificance'] === null) {
            $invalidProperties[] = "'conversionSignificance' can't be null";
        }
        if (!isset($this->container['endAt']) || $this->container['endAt'] === null) {
            $invalidProperties[] = "'endAt' can't be null";
        }
        if (!isset($this->container['createdAt']) || $this->container['createdAt'] === null) {
            $invalidProperties[] = "'createdAt' can't be null";
        }
        if (!isset($this->container['name']) || $this->container['name'] === null) {
            $invalidProperties[] = "'name' can't be null";
        }
        if (!isset($this->container['status']) || $this->container['status'] === null) {
            $invalidProperties[] = "'status' can't be null";
        }
        if (!isset($this->container['variants']) || $this->container['variants'] === null) {
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
        return $this->container['abTestID'] ?? null;
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
        return $this->container['clickSignificance'] ?? null;
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
        return $this->container['conversionSignificance'] ?? null;
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
        return $this->container['endAt'] ?? null;
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
        return $this->container['createdAt'] ?? null;
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
        return $this->container['name'] ?? null;
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
        return $this->container['status'] ?? null;
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
     * @return \Algolia\AlgoliaSearch\Model\Abtesting\Variant[]
     */
    public function getVariants()
    {
        return $this->container['variants'] ?? null;
    }

    /**
     * Sets variants
     *
     * @param \Algolia\AlgoliaSearch\Model\Abtesting\Variant[] $variants list of A/B test variant
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
}

