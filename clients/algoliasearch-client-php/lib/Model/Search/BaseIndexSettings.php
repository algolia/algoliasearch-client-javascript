<?php

namespace Algolia\AlgoliaSearch\Model\Search;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * BaseIndexSettings Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class BaseIndexSettings implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'baseIndexSettings';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'replicas' => 'string[]',
        'paginationLimitedTo' => 'int',
        'disableTypoToleranceOnWords' => 'string[]',
        'attributesToTransliterate' => 'string[]',
        'camelCaseAttributes' => 'string[]',
        'decompoundedAttributes' => 'object',
        'indexLanguages' => 'string[]',
        'filterPromotes' => 'bool',
        'disablePrefixOnAttributes' => 'string[]',
        'allowCompressionOfIntegerArray' => 'bool',
        'numericAttributesForFiltering' => 'string[]',
        'userData' => 'object',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'replicas' => null,
        'paginationLimitedTo' => null,
        'disableTypoToleranceOnWords' => null,
        'attributesToTransliterate' => null,
        'camelCaseAttributes' => null,
        'decompoundedAttributes' => null,
        'indexLanguages' => null,
        'filterPromotes' => null,
        'disablePrefixOnAttributes' => null,
        'allowCompressionOfIntegerArray' => null,
        'numericAttributesForFiltering' => null,
        'userData' => null,
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
        'replicas' => 'replicas',
        'paginationLimitedTo' => 'paginationLimitedTo',
        'disableTypoToleranceOnWords' => 'disableTypoToleranceOnWords',
        'attributesToTransliterate' => 'attributesToTransliterate',
        'camelCaseAttributes' => 'camelCaseAttributes',
        'decompoundedAttributes' => 'decompoundedAttributes',
        'indexLanguages' => 'indexLanguages',
        'filterPromotes' => 'filterPromotes',
        'disablePrefixOnAttributes' => 'disablePrefixOnAttributes',
        'allowCompressionOfIntegerArray' => 'allowCompressionOfIntegerArray',
        'numericAttributesForFiltering' => 'numericAttributesForFiltering',
        'userData' => 'userData',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'replicas' => 'setReplicas',
        'paginationLimitedTo' => 'setPaginationLimitedTo',
        'disableTypoToleranceOnWords' => 'setDisableTypoToleranceOnWords',
        'attributesToTransliterate' => 'setAttributesToTransliterate',
        'camelCaseAttributes' => 'setCamelCaseAttributes',
        'decompoundedAttributes' => 'setDecompoundedAttributes',
        'indexLanguages' => 'setIndexLanguages',
        'filterPromotes' => 'setFilterPromotes',
        'disablePrefixOnAttributes' => 'setDisablePrefixOnAttributes',
        'allowCompressionOfIntegerArray' => 'setAllowCompressionOfIntegerArray',
        'numericAttributesForFiltering' => 'setNumericAttributesForFiltering',
        'userData' => 'setUserData',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'replicas' => 'getReplicas',
        'paginationLimitedTo' => 'getPaginationLimitedTo',
        'disableTypoToleranceOnWords' => 'getDisableTypoToleranceOnWords',
        'attributesToTransliterate' => 'getAttributesToTransliterate',
        'camelCaseAttributes' => 'getCamelCaseAttributes',
        'decompoundedAttributes' => 'getDecompoundedAttributes',
        'indexLanguages' => 'getIndexLanguages',
        'filterPromotes' => 'getFilterPromotes',
        'disablePrefixOnAttributes' => 'getDisablePrefixOnAttributes',
        'allowCompressionOfIntegerArray' => 'getAllowCompressionOfIntegerArray',
        'numericAttributesForFiltering' => 'getNumericAttributesForFiltering',
        'userData' => 'getUserData',
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
        $this->container['replicas'] = $data['replicas'] ?? null;
        $this->container['paginationLimitedTo'] = $data['paginationLimitedTo'] ?? 1000;
        $this->container['disableTypoToleranceOnWords'] = $data['disableTypoToleranceOnWords'] ?? null;
        $this->container['attributesToTransliterate'] = $data['attributesToTransliterate'] ?? null;
        $this->container['camelCaseAttributes'] = $data['camelCaseAttributes'] ?? null;
        $this->container['decompoundedAttributes'] = $data['decompoundedAttributes'] ?? null;
        $this->container['indexLanguages'] = $data['indexLanguages'] ?? null;
        $this->container['filterPromotes'] = $data['filterPromotes'] ?? false;
        $this->container['disablePrefixOnAttributes'] = $data['disablePrefixOnAttributes'] ?? null;
        $this->container['allowCompressionOfIntegerArray'] = $data['allowCompressionOfIntegerArray'] ?? false;
        $this->container['numericAttributesForFiltering'] = $data['numericAttributesForFiltering'] ?? null;
        $this->container['userData'] = $data['userData'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

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
     * @param string[]|null $replicas creates replicas, exact copies of an index
     *
     * @return self
     */
    public function setReplicas($replicas)
    {
        $this->container['replicas'] = $replicas;

        return $this;
    }

    /**
     * Gets paginationLimitedTo
     *
     * @return int|null
     */
    public function getPaginationLimitedTo()
    {
        return $this->container['paginationLimitedTo'];
    }

    /**
     * Sets paginationLimitedTo
     *
     * @param int|null $paginationLimitedTo set the maximum number of hits accessible via pagination
     *
     * @return self
     */
    public function setPaginationLimitedTo($paginationLimitedTo)
    {
        $this->container['paginationLimitedTo'] = $paginationLimitedTo;

        return $this;
    }

    /**
     * Gets disableTypoToleranceOnWords
     *
     * @return string[]|null
     */
    public function getDisableTypoToleranceOnWords()
    {
        return $this->container['disableTypoToleranceOnWords'];
    }

    /**
     * Sets disableTypoToleranceOnWords
     *
     * @param string[]|null $disableTypoToleranceOnWords a list of words for which you want to turn off typo tolerance
     *
     * @return self
     */
    public function setDisableTypoToleranceOnWords($disableTypoToleranceOnWords)
    {
        $this->container['disableTypoToleranceOnWords'] = $disableTypoToleranceOnWords;

        return $this;
    }

    /**
     * Gets attributesToTransliterate
     *
     * @return string[]|null
     */
    public function getAttributesToTransliterate()
    {
        return $this->container['attributesToTransliterate'];
    }

    /**
     * Sets attributesToTransliterate
     *
     * @param string[]|null $attributesToTransliterate specify on which attributes to apply transliteration
     *
     * @return self
     */
    public function setAttributesToTransliterate($attributesToTransliterate)
    {
        $this->container['attributesToTransliterate'] = $attributesToTransliterate;

        return $this;
    }

    /**
     * Gets camelCaseAttributes
     *
     * @return string[]|null
     */
    public function getCamelCaseAttributes()
    {
        return $this->container['camelCaseAttributes'];
    }

    /**
     * Sets camelCaseAttributes
     *
     * @param string[]|null $camelCaseAttributes list of attributes on which to do a decomposition of camel case words
     *
     * @return self
     */
    public function setCamelCaseAttributes($camelCaseAttributes)
    {
        $this->container['camelCaseAttributes'] = $camelCaseAttributes;

        return $this;
    }

    /**
     * Gets decompoundedAttributes
     *
     * @return object|null
     */
    public function getDecompoundedAttributes()
    {
        return $this->container['decompoundedAttributes'];
    }

    /**
     * Sets decompoundedAttributes
     *
     * @param object|null $decompoundedAttributes specify on which attributes in your index Algolia should apply word segmentation, also known as decompounding
     *
     * @return self
     */
    public function setDecompoundedAttributes($decompoundedAttributes)
    {
        $this->container['decompoundedAttributes'] = $decompoundedAttributes;

        return $this;
    }

    /**
     * Gets indexLanguages
     *
     * @return string[]|null
     */
    public function getIndexLanguages()
    {
        return $this->container['indexLanguages'];
    }

    /**
     * Sets indexLanguages
     *
     * @param string[]|null $indexLanguages sets the languages at the index level for language-specific processing such as tokenization and normalization
     *
     * @return self
     */
    public function setIndexLanguages($indexLanguages)
    {
        $this->container['indexLanguages'] = $indexLanguages;

        return $this;
    }

    /**
     * Gets filterPromotes
     *
     * @return bool|null
     */
    public function getFilterPromotes()
    {
        return $this->container['filterPromotes'];
    }

    /**
     * Sets filterPromotes
     *
     * @param bool|null $filterPromotes whether promoted results should match the filters of the current search, except for geographic filters
     *
     * @return self
     */
    public function setFilterPromotes($filterPromotes)
    {
        $this->container['filterPromotes'] = $filterPromotes;

        return $this;
    }

    /**
     * Gets disablePrefixOnAttributes
     *
     * @return string[]|null
     */
    public function getDisablePrefixOnAttributes()
    {
        return $this->container['disablePrefixOnAttributes'];
    }

    /**
     * Sets disablePrefixOnAttributes
     *
     * @param string[]|null $disablePrefixOnAttributes list of attributes on which you want to disable prefix matching
     *
     * @return self
     */
    public function setDisablePrefixOnAttributes($disablePrefixOnAttributes)
    {
        $this->container['disablePrefixOnAttributes'] = $disablePrefixOnAttributes;

        return $this;
    }

    /**
     * Gets allowCompressionOfIntegerArray
     *
     * @return bool|null
     */
    public function getAllowCompressionOfIntegerArray()
    {
        return $this->container['allowCompressionOfIntegerArray'];
    }

    /**
     * Sets allowCompressionOfIntegerArray
     *
     * @param bool|null $allowCompressionOfIntegerArray enables compression of large integer arrays
     *
     * @return self
     */
    public function setAllowCompressionOfIntegerArray($allowCompressionOfIntegerArray)
    {
        $this->container['allowCompressionOfIntegerArray'] = $allowCompressionOfIntegerArray;

        return $this;
    }

    /**
     * Gets numericAttributesForFiltering
     *
     * @return string[]|null
     */
    public function getNumericAttributesForFiltering()
    {
        return $this->container['numericAttributesForFiltering'];
    }

    /**
     * Sets numericAttributesForFiltering
     *
     * @param string[]|null $numericAttributesForFiltering list of numeric attributes that can be used as numerical filters
     *
     * @return self
     */
    public function setNumericAttributesForFiltering($numericAttributesForFiltering)
    {
        $this->container['numericAttributesForFiltering'] = $numericAttributesForFiltering;

        return $this;
    }

    /**
     * Gets userData
     *
     * @return object|null
     */
    public function getUserData()
    {
        return $this->container['userData'];
    }

    /**
     * Sets userData
     *
     * @param object|null $userData lets you store custom data in your indices
     *
     * @return self
     */
    public function setUserData($userData)
    {
        $this->container['userData'] = $userData;

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

