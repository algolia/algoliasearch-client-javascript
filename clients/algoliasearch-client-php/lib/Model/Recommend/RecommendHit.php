<?php

namespace Algolia\AlgoliaSearch\Model\Recommend;

/**
 * RecommendHit Class Doc Comment
 *
 * @category Class
 * @description A Recommend hit.
 *
 * @package Algolia\AlgoliaSearch
 */
class RecommendHit extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'objectID' => 'string',
        'highlightResult' => '\Algolia\AlgoliaSearch\Model\Recommend\HighlightResult',
        'snippetResult' => '\Algolia\AlgoliaSearch\Model\Recommend\SnippetResult',
        'rankingInfo' => '\Algolia\AlgoliaSearch\Model\Recommend\RankingInfo',
        'distinctSeqID' => 'int',
        'score' => 'double',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'objectID' => null,
        'highlightResult' => null,
        'snippetResult' => null,
        'rankingInfo' => null,
        'distinctSeqID' => null,
        'score' => 'double',
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
        'objectID' => 'setObjectID',
        'highlightResult' => 'setHighlightResult',
        'snippetResult' => 'setSnippetResult',
        'rankingInfo' => 'setRankingInfo',
        'distinctSeqID' => 'setDistinctSeqID',
        'score' => 'setScore',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'objectID' => 'getObjectID',
        'highlightResult' => 'getHighlightResult',
        'snippetResult' => 'getSnippetResult',
        'rankingInfo' => 'getRankingInfo',
        'distinctSeqID' => 'getDistinctSeqID',
        'score' => 'getScore',
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
        if (isset($data['objectID'])) {
            $this->container['objectID'] = $data['objectID'];
        }
        if (isset($data['highlightResult'])) {
            $this->container['highlightResult'] = $data['highlightResult'];
        }
        if (isset($data['snippetResult'])) {
            $this->container['snippetResult'] = $data['snippetResult'];
        }
        if (isset($data['rankingInfo'])) {
            $this->container['rankingInfo'] = $data['rankingInfo'];
        }
        if (isset($data['distinctSeqID'])) {
            $this->container['distinctSeqID'] = $data['distinctSeqID'];
        }
        if (isset($data['score'])) {
            $this->container['score'] = $data['score'];
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

        if (!isset($this->container['objectID']) || $this->container['objectID'] === null) {
            $invalidProperties[] = "'objectID' can't be null";
        }
        if (!isset($this->container['score']) || $this->container['score'] === null) {
            $invalidProperties[] = "'score' can't be null";
        }
        if (($this->container['score'] > 100)) {
            $invalidProperties[] = "invalid value for 'score', must be smaller than or equal to 100.";
        }

        if (($this->container['score'] < 0)) {
            $invalidProperties[] = "invalid value for 'score', must be bigger than or equal to 0.";
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
     * Gets objectID
     *
     * @return string
     */
    public function getObjectID()
    {
        return $this->container['objectID'] ?? null;
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
     * Gets highlightResult
     *
     * @return \Algolia\AlgoliaSearch\Model\Recommend\HighlightResult|null
     */
    public function getHighlightResult()
    {
        return $this->container['highlightResult'] ?? null;
    }

    /**
     * Sets highlightResult
     *
     * @param \Algolia\AlgoliaSearch\Model\Recommend\HighlightResult|null $highlightResult highlightResult
     *
     * @return self
     */
    public function setHighlightResult($highlightResult)
    {
        $this->container['highlightResult'] = $highlightResult;

        return $this;
    }

    /**
     * Gets snippetResult
     *
     * @return \Algolia\AlgoliaSearch\Model\Recommend\SnippetResult|null
     */
    public function getSnippetResult()
    {
        return $this->container['snippetResult'] ?? null;
    }

    /**
     * Sets snippetResult
     *
     * @param \Algolia\AlgoliaSearch\Model\Recommend\SnippetResult|null $snippetResult snippetResult
     *
     * @return self
     */
    public function setSnippetResult($snippetResult)
    {
        $this->container['snippetResult'] = $snippetResult;

        return $this;
    }

    /**
     * Gets rankingInfo
     *
     * @return \Algolia\AlgoliaSearch\Model\Recommend\RankingInfo|null
     */
    public function getRankingInfo()
    {
        return $this->container['rankingInfo'] ?? null;
    }

    /**
     * Sets rankingInfo
     *
     * @param \Algolia\AlgoliaSearch\Model\Recommend\RankingInfo|null $rankingInfo rankingInfo
     *
     * @return self
     */
    public function setRankingInfo($rankingInfo)
    {
        $this->container['rankingInfo'] = $rankingInfo;

        return $this;
    }

    /**
     * Gets distinctSeqID
     *
     * @return int|null
     */
    public function getDistinctSeqID()
    {
        return $this->container['distinctSeqID'] ?? null;
    }

    /**
     * Sets distinctSeqID
     *
     * @param int|null $distinctSeqID distinctSeqID
     *
     * @return self
     */
    public function setDistinctSeqID($distinctSeqID)
    {
        $this->container['distinctSeqID'] = $distinctSeqID;

        return $this;
    }

    /**
     * Gets score
     *
     * @return float
     */
    public function getScore()
    {
        return $this->container['score'] ?? null;
    }

    /**
     * Sets score
     *
     * @param float $score the recommendation score
     *
     * @return self
     */
    public function setScore($score)
    {
        if (($score > 100)) {
            throw new \InvalidArgumentException('invalid value for $score when calling RecommendHit., must be smaller than or equal to 100.');
        }
        if (($score < 0)) {
            throw new \InvalidArgumentException('invalid value for $score when calling RecommendHit., must be bigger than or equal to 0.');
        }

        $this->container['score'] = $score;

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

