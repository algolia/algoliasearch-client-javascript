<?php

namespace Algolia\AlgoliaSearch\Model\Insights;

/**
 * InsightEvent Class Doc Comment
 *
 * @category Class
 * @description Insights event.
 *
 * @package Algolia\AlgoliaSearch
 */
class InsightEvent extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'eventType' => '\Algolia\AlgoliaSearch\Model\Insights\EventType',
        'eventName' => 'string',
        'index' => 'string',
        'userToken' => 'string',
        'timestamp' => 'int',
        'queryID' => 'string',
        'objectIDs' => 'string[]',
        'filters' => 'string[]',
        'positions' => 'int[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'eventType' => null,
        'eventName' => null,
        'index' => null,
        'userToken' => null,
        'timestamp' => null,
        'queryID' => null,
        'objectIDs' => null,
        'filters' => null,
        'positions' => null,
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
        'eventType' => 'setEventType',
        'eventName' => 'setEventName',
        'index' => 'setIndex',
        'userToken' => 'setUserToken',
        'timestamp' => 'setTimestamp',
        'queryID' => 'setQueryID',
        'objectIDs' => 'setObjectIDs',
        'filters' => 'setFilters',
        'positions' => 'setPositions',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'eventType' => 'getEventType',
        'eventName' => 'getEventName',
        'index' => 'getIndex',
        'userToken' => 'getUserToken',
        'timestamp' => 'getTimestamp',
        'queryID' => 'getQueryID',
        'objectIDs' => 'getObjectIDs',
        'filters' => 'getFilters',
        'positions' => 'getPositions',
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
        if (isset($data['eventType'])) {
            $this->container['eventType'] = $data['eventType'];
        }
        if (isset($data['eventName'])) {
            $this->container['eventName'] = $data['eventName'];
        }
        if (isset($data['index'])) {
            $this->container['index'] = $data['index'];
        }
        if (isset($data['userToken'])) {
            $this->container['userToken'] = $data['userToken'];
        }
        if (isset($data['timestamp'])) {
            $this->container['timestamp'] = $data['timestamp'];
        }
        if (isset($data['queryID'])) {
            $this->container['queryID'] = $data['queryID'];
        }
        if (isset($data['objectIDs'])) {
            $this->container['objectIDs'] = $data['objectIDs'];
        }
        if (isset($data['filters'])) {
            $this->container['filters'] = $data['filters'];
        }
        if (isset($data['positions'])) {
            $this->container['positions'] = $data['positions'];
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

        if (!isset($this->container['eventType']) || $this->container['eventType'] === null) {
            $invalidProperties[] = "'eventType' can't be null";
        }
        if (!isset($this->container['eventName']) || $this->container['eventName'] === null) {
            $invalidProperties[] = "'eventName' can't be null";
        }
        if (!isset($this->container['index']) || $this->container['index'] === null) {
            $invalidProperties[] = "'index' can't be null";
        }
        if (!isset($this->container['userToken']) || $this->container['userToken'] === null) {
            $invalidProperties[] = "'userToken' can't be null";
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
     * Gets eventType
     *
     * @return \Algolia\AlgoliaSearch\Model\Insights\EventType
     */
    public function getEventType()
    {
        return $this->container['eventType'] ?? null;
    }

    /**
     * Sets eventType
     *
     * @param \Algolia\AlgoliaSearch\Model\Insights\EventType $eventType eventType
     *
     * @return self
     */
    public function setEventType($eventType)
    {
        $this->container['eventType'] = $eventType;

        return $this;
    }

    /**
     * Gets eventName
     *
     * @return string
     */
    public function getEventName()
    {
        return $this->container['eventName'] ?? null;
    }

    /**
     * Sets eventName
     *
     * @param string $eventName a user-defined string used to categorize events
     *
     * @return self
     */
    public function setEventName($eventName)
    {
        $this->container['eventName'] = $eventName;

        return $this;
    }

    /**
     * Gets index
     *
     * @return string
     */
    public function getIndex()
    {
        return $this->container['index'] ?? null;
    }

    /**
     * Sets index
     *
     * @param string $index name of the targeted index
     *
     * @return self
     */
    public function setIndex($index)
    {
        $this->container['index'] = $index;

        return $this;
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
     * @param string $userToken A user identifier. Depending if the user is logged-in or not, several strategies can be used from a sessionId to a technical identifier.
     *
     * @return self
     */
    public function setUserToken($userToken)
    {
        $this->container['userToken'] = $userToken;

        return $this;
    }

    /**
     * Gets timestamp
     *
     * @return int|null
     */
    public function getTimestamp()
    {
        return $this->container['timestamp'] ?? null;
    }

    /**
     * Sets timestamp
     *
     * @param int|null $timestamp time of the event expressed in milliseconds since the Unix epoch
     *
     * @return self
     */
    public function setTimestamp($timestamp)
    {
        $this->container['timestamp'] = $timestamp;

        return $this;
    }

    /**
     * Gets queryID
     *
     * @return string|null
     */
    public function getQueryID()
    {
        return $this->container['queryID'] ?? null;
    }

    /**
     * Sets queryID
     *
     * @param string|null $queryID Algolia queryID. This is required when an event is tied to a search.
     *
     * @return self
     */
    public function setQueryID($queryID)
    {
        $this->container['queryID'] = $queryID;

        return $this;
    }

    /**
     * Gets objectIDs
     *
     * @return string[]|null
     */
    public function getObjectIDs()
    {
        return $this->container['objectIDs'] ?? null;
    }

    /**
     * Sets objectIDs
     *
     * @param string[]|null $objectIDs An array of index objectID. Limited to 20 objects. An event can’t have both objectIDs and filters at the same time.
     *
     * @return self
     */
    public function setObjectIDs($objectIDs)
    {
        $this->container['objectIDs'] = $objectIDs;

        return $this;
    }

    /**
     * Gets filters
     *
     * @return string[]|null
     */
    public function getFilters()
    {
        return $this->container['filters'] ?? null;
    }

    /**
     * Sets filters
     *
     * @param string[]|null $filters An array of filters. Limited to 10 filters. An event can’t have both objectIDs and filters at the same time.
     *
     * @return self
     */
    public function setFilters($filters)
    {
        $this->container['filters'] = $filters;

        return $this;
    }

    /**
     * Gets positions
     *
     * @return int[]|null
     */
    public function getPositions()
    {
        return $this->container['positions'] ?? null;
    }

    /**
     * Sets positions
     *
     * @param int[]|null $positions Position of the click in the list of Algolia search results. This field is required if a queryID is provided. One position must be provided for each objectID.
     *
     * @return self
     */
    public function setPositions($positions)
    {
        $this->container['positions'] = $positions;

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

