<?php

namespace Algolia\AlgoliaSearch\Model\Recommend;

/**
 * Personalization Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class Personalization extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'filtersScore' => 'int',
        'rankingScore' => 'int',
        'score' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'filtersScore' => null,
        'rankingScore' => null,
        'score' => null,
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
        'filtersScore' => 'setFiltersScore',
        'rankingScore' => 'setRankingScore',
        'score' => 'setScore',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'filtersScore' => 'getFiltersScore',
        'rankingScore' => 'getRankingScore',
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
        if (isset($data['filtersScore'])) {
            $this->container['filtersScore'] = $data['filtersScore'];
        }
        if (isset($data['rankingScore'])) {
            $this->container['rankingScore'] = $data['rankingScore'];
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
     * Gets filtersScore
     *
     * @return int|null
     */
    public function getFiltersScore()
    {
        return $this->container['filtersScore'] ?? null;
    }

    /**
     * Sets filtersScore
     *
     * @param int|null $filtersScore the score of the filters
     *
     * @return self
     */
    public function setFiltersScore($filtersScore)
    {
        $this->container['filtersScore'] = $filtersScore;

        return $this;
    }

    /**
     * Gets rankingScore
     *
     * @return int|null
     */
    public function getRankingScore()
    {
        return $this->container['rankingScore'] ?? null;
    }

    /**
     * Sets rankingScore
     *
     * @param int|null $rankingScore the score of the ranking
     *
     * @return self
     */
    public function setRankingScore($rankingScore)
    {
        $this->container['rankingScore'] = $rankingScore;

        return $this;
    }

    /**
     * Gets score
     *
     * @return int|null
     */
    public function getScore()
    {
        return $this->container['score'] ?? null;
    }

    /**
     * Sets score
     *
     * @param int|null $score the score of the event
     *
     * @return self
     */
    public function setScore($score)
    {
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

