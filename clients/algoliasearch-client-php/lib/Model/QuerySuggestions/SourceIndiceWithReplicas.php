<?php

namespace Algolia\AlgoliaSearch\Model\QuerySuggestions;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * SourceIndiceWithReplicas Class Doc Comment
 *
 * @category Class
 * @description Source indice with replicas used to generate a Query Suggestions index.
 *
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class SourceIndiceWithReplicas implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'SourceIndiceWithReplicas';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'replicas' => 'bool',
        'indexName' => 'string',
        'analyticsTags' => 'string[]',
        'facets' => 'object[]',
        'minHits' => 'int',
        'minLetters' => 'int',
        'generate' => 'string[][]',
        'external' => '\Algolia\AlgoliaSearch\Model\QuerySuggestions\SourceIndexExternal[]',
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
        'indexName' => null,
        'analyticsTags' => null,
        'facets' => null,
        'minHits' => null,
        'minLetters' => null,
        'generate' => null,
        'external' => null,
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
        'indexName' => 'indexName',
        'analyticsTags' => 'analyticsTags',
        'facets' => 'facets',
        'minHits' => 'minHits',
        'minLetters' => 'minLetters',
        'generate' => 'generate',
        'external' => 'external',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'replicas' => 'setReplicas',
        'indexName' => 'setIndexName',
        'analyticsTags' => 'setAnalyticsTags',
        'facets' => 'setFacets',
        'minHits' => 'setMinHits',
        'minLetters' => 'setMinLetters',
        'generate' => 'setGenerate',
        'external' => 'setExternal',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'replicas' => 'getReplicas',
        'indexName' => 'getIndexName',
        'analyticsTags' => 'getAnalyticsTags',
        'facets' => 'getFacets',
        'minHits' => 'getMinHits',
        'minLetters' => 'getMinLetters',
        'generate' => 'getGenerate',
        'external' => 'getExternal',
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
        $this->container['indexName'] = $data['indexName'] ?? null;
        $this->container['analyticsTags'] = $data['analyticsTags'] ?? null;
        $this->container['facets'] = $data['facets'] ?? null;
        $this->container['minHits'] = $data['minHits'] ?? null;
        $this->container['minLetters'] = $data['minLetters'] ?? null;
        $this->container['generate'] = $data['generate'] ?? null;
        $this->container['external'] = $data['external'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['replicas'] === null) {
            $invalidProperties[] = "'replicas' can't be null";
        }
        if ($this->container['indexName'] === null) {
            $invalidProperties[] = "'indexName' can't be null";
        }
        if ($this->container['analyticsTags'] === null) {
            $invalidProperties[] = "'analyticsTags' can't be null";
        }
        if ($this->container['facets'] === null) {
            $invalidProperties[] = "'facets' can't be null";
        }
        if ($this->container['minHits'] === null) {
            $invalidProperties[] = "'minHits' can't be null";
        }
        if ($this->container['minLetters'] === null) {
            $invalidProperties[] = "'minLetters' can't be null";
        }
        if ($this->container['generate'] === null) {
            $invalidProperties[] = "'generate' can't be null";
        }
        if ($this->container['external'] === null) {
            $invalidProperties[] = "'external' can't be null";
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
     * Gets replicas
     *
     * @return bool
     */
    public function getReplicas()
    {
        return $this->container['replicas'];
    }

    /**
     * Sets replicas
     *
     * @param bool $replicas true if the Query Suggestions index is a replicas
     *
     * @return self
     */
    public function setReplicas($replicas)
    {
        $this->container['replicas'] = $replicas;

        return $this;
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
     * @param string $indexName source index name
     *
     * @return self
     */
    public function setIndexName($indexName)
    {
        $this->container['indexName'] = $indexName;

        return $this;
    }

    /**
     * Gets analyticsTags
     *
     * @return string[]
     */
    public function getAnalyticsTags()
    {
        return $this->container['analyticsTags'];
    }

    /**
     * Sets analyticsTags
     *
     * @param string[] $analyticsTags list of analytics tags to filter the popular searches per tag
     *
     * @return self
     */
    public function setAnalyticsTags($analyticsTags)
    {
        $this->container['analyticsTags'] = $analyticsTags;

        return $this;
    }

    /**
     * Gets facets
     *
     * @return object[]
     */
    public function getFacets()
    {
        return $this->container['facets'];
    }

    /**
     * Sets facets
     *
     * @param object[] $facets list of facets to define as categories for the query suggestions
     *
     * @return self
     */
    public function setFacets($facets)
    {
        $this->container['facets'] = $facets;

        return $this;
    }

    /**
     * Gets minHits
     *
     * @return int
     */
    public function getMinHits()
    {
        return $this->container['minHits'];
    }

    /**
     * Sets minHits
     *
     * @param int $minHits Minimum number of hits (e.g., matching records in the source index) to generate a suggestions.
     *
     * @return self
     */
    public function setMinHits($minHits)
    {
        $this->container['minHits'] = $minHits;

        return $this;
    }

    /**
     * Gets minLetters
     *
     * @return int
     */
    public function getMinLetters()
    {
        return $this->container['minLetters'];
    }

    /**
     * Sets minLetters
     *
     * @param int $minLetters minimum number of required letters for a suggestion to remain
     *
     * @return self
     */
    public function setMinLetters($minLetters)
    {
        $this->container['minLetters'] = $minLetters;

        return $this;
    }

    /**
     * Gets generate
     *
     * @return string[][]
     */
    public function getGenerate()
    {
        return $this->container['generate'];
    }

    /**
     * Sets generate
     *
     * @param string[][] $generate List of facet attributes used to generate Query Suggestions. The resulting suggestions are every combination of the facets in the nested list (e.g., (facetA and facetB) and facetC).
     *
     * @return self
     */
    public function setGenerate($generate)
    {
        $this->container['generate'] = $generate;

        return $this;
    }

    /**
     * Gets external
     *
     * @return \Algolia\AlgoliaSearch\Model\QuerySuggestions\SourceIndexExternal[]
     */
    public function getExternal()
    {
        return $this->container['external'];
    }

    /**
     * Sets external
     *
     * @param \Algolia\AlgoliaSearch\Model\QuerySuggestions\SourceIndexExternal[] $external list of external indices to use to generate custom Query Suggestions
     *
     * @return self
     */
    public function setExternal($external)
    {
        $this->container['external'] = $external;

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

