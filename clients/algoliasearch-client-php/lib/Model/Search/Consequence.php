<?php

namespace Algolia\AlgoliaSearch\Model\Search;

/**
 * Consequence Class Doc Comment
 *
 * @category Class
 * @description Consequence of the Rule.
 *
 * @package Algolia\AlgoliaSearch
 */
class Consequence extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'params' => '\Algolia\AlgoliaSearch\Model\Search\ConsequenceParams',
        'promote' => '\Algolia\AlgoliaSearch\Model\Search\Promote[]',
        'filterPromotes' => 'bool',
        'hide' => '\Algolia\AlgoliaSearch\Model\Search\ConsequenceHide[]',
        'userData' => 'object',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'params' => null,
        'promote' => null,
        'filterPromotes' => null,
        'hide' => null,
        'userData' => null,
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
        'params' => 'setParams',
        'promote' => 'setPromote',
        'filterPromotes' => 'setFilterPromotes',
        'hide' => 'setHide',
        'userData' => 'setUserData',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'params' => 'getParams',
        'promote' => 'getPromote',
        'filterPromotes' => 'getFilterPromotes',
        'hide' => 'getHide',
        'userData' => 'getUserData',
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
        if (isset($data['params'])) {
            $this->container['params'] = $data['params'];
        }
        if (isset($data['promote'])) {
            $this->container['promote'] = $data['promote'];
        }
        if (isset($data['filterPromotes'])) {
            $this->container['filterPromotes'] = $data['filterPromotes'];
        }
        if (isset($data['hide'])) {
            $this->container['hide'] = $data['hide'];
        }
        if (isset($data['userData'])) {
            $this->container['userData'] = $data['userData'];
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
     * Gets params
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\ConsequenceParams|null
     */
    public function getParams()
    {
        return $this->container['params'] ?? null;
    }

    /**
     * Sets params
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\ConsequenceParams|null $params params
     *
     * @return self
     */
    public function setParams($params)
    {
        $this->container['params'] = $params;

        return $this;
    }

    /**
     * Gets promote
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\Promote[]|null
     */
    public function getPromote()
    {
        return $this->container['promote'] ?? null;
    }

    /**
     * Sets promote
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\Promote[]|null $promote objects to promote as hits
     *
     * @return self
     */
    public function setPromote($promote)
    {
        $this->container['promote'] = $promote;

        return $this;
    }

    /**
     * Gets filterPromotes
     *
     * @return bool|null
     */
    public function getFilterPromotes()
    {
        return $this->container['filterPromotes'] ?? null;
    }

    /**
     * Sets filterPromotes
     *
     * @param bool|null $filterPromotes Only use in combination with the promote consequence. When true, promoted results will be restricted to match the filters of the current search. When false, the promoted results will show up regardless of the filters.
     *
     * @return self
     */
    public function setFilterPromotes($filterPromotes)
    {
        $this->container['filterPromotes'] = $filterPromotes;

        return $this;
    }

    /**
     * Gets hide
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\ConsequenceHide[]|null
     */
    public function getHide()
    {
        return $this->container['hide'] ?? null;
    }

    /**
     * Sets hide
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\ConsequenceHide[]|null $hide Objects to hide from hits. Each object must contain an objectID field. By default, you can hide up to 50 items per rule.
     *
     * @return self
     */
    public function setHide($hide)
    {
        $this->container['hide'] = $hide;

        return $this;
    }

    /**
     * Gets userData
     *
     * @return object|null
     */
    public function getUserData()
    {
        return $this->container['userData'] ?? null;
    }

    /**
     * Sets userData
     *
     * @param object|null $userData Custom JSON object that will be appended to the userData array in the response. This object isn't interpreted by the API. It's limited to 1kB of minified JSON.
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
}

