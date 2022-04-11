<?php

namespace Algolia\AlgoliaSearch\Model\Personalization;

/**
 * GetUserTokenResponse Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class GetUserTokenResponse extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'userToken' => 'string',
        'lastEventAt' => 'string',
        'scores' => 'object',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'userToken' => null,
        'lastEventAt' => null,
        'scores' => null,
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
        'userToken' => 'setUserToken',
        'lastEventAt' => 'setLastEventAt',
        'scores' => 'setScores',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'userToken' => 'getUserToken',
        'lastEventAt' => 'getLastEventAt',
        'scores' => 'getScores',
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
        if (isset($data['userToken'])) {
            $this->container['userToken'] = $data['userToken'];
        }
        if (isset($data['lastEventAt'])) {
            $this->container['lastEventAt'] = $data['lastEventAt'];
        }
        if (isset($data['scores'])) {
            $this->container['scores'] = $data['scores'];
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

        if (!isset($this->container['userToken']) || $this->container['userToken'] === null) {
            $invalidProperties[] = "'userToken' can't be null";
        }
        if (!isset($this->container['lastEventAt']) || $this->container['lastEventAt'] === null) {
            $invalidProperties[] = "'lastEventAt' can't be null";
        }
        if (!isset($this->container['scores']) || $this->container['scores'] === null) {
            $invalidProperties[] = "'scores' can't be null";
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
     * Gets userToken
     *
     * @return string
     */
    public function getUserToken()
    {
        return $this->container['userToken'] ?? null;
    }

    /**
     * Sets userToken
     *
     * @param string $userToken userToken representing the user for which to fetch the Personalization profile
     *
     * @return self
     */
    public function setUserToken($userToken)
    {
        $this->container['userToken'] = $userToken;

        return $this;
    }

    /**
     * Gets lastEventAt
     *
     * @return string
     */
    public function getLastEventAt()
    {
        return $this->container['lastEventAt'] ?? null;
    }

    /**
     * Sets lastEventAt
     *
     * @param string $lastEventAt Date of last event update. (ISO-8601 format).
     *
     * @return self
     */
    public function setLastEventAt($lastEventAt)
    {
        $this->container['lastEventAt'] = $lastEventAt;

        return $this;
    }

    /**
     * Gets scores
     *
     * @return object
     */
    public function getScores()
    {
        return $this->container['scores'] ?? null;
    }

    /**
     * Sets scores
     *
     * @param object $scores the userToken scores
     *
     * @return self
     */
    public function setScores($scores)
    {
        $this->container['scores'] = $scores;

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

