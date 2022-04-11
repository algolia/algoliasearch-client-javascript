<?php

namespace Algolia\AlgoliaSearch\Model\Recommend;

/**
 * RankingInfo Class Doc Comment
 *
 * @category Class
 * @package Algolia\AlgoliaSearch
 */
class RankingInfo extends \Algolia\AlgoliaSearch\Model\AbstractModel implements ModelInterface, \ArrayAccess, \JsonSerializable
{
    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelTypes = [
        'filters' => 'int',
        'firstMatchedWord' => 'int',
        'geoDistance' => 'int',
        'geoPrecision' => 'int',
        'matchedGeoLocation' => 'array<string,\Algolia\AlgoliaSearch\Model\Recommend\RankingInfoMatchedGeoLocation>',
        'nbExactWords' => 'int',
        'nbTypos' => 'int',
        'promoted' => 'bool',
        'proximityDistance' => 'int',
        'userScore' => 'int',
        'word' => 'int',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $modelFormats = [
        'filters' => null,
        'firstMatchedWord' => null,
        'geoDistance' => null,
        'geoPrecision' => null,
        'matchedGeoLocation' => null,
        'nbExactWords' => null,
        'nbTypos' => null,
        'promoted' => null,
        'proximityDistance' => null,
        'userScore' => null,
        'word' => null,
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
        'filters' => 'setFilters',
        'firstMatchedWord' => 'setFirstMatchedWord',
        'geoDistance' => 'setGeoDistance',
        'geoPrecision' => 'setGeoPrecision',
        'matchedGeoLocation' => 'setMatchedGeoLocation',
        'nbExactWords' => 'setNbExactWords',
        'nbTypos' => 'setNbTypos',
        'promoted' => 'setPromoted',
        'proximityDistance' => 'setProximityDistance',
        'userScore' => 'setUserScore',
        'word' => 'setWord',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'filters' => 'getFilters',
        'firstMatchedWord' => 'getFirstMatchedWord',
        'geoDistance' => 'getGeoDistance',
        'geoPrecision' => 'getGeoPrecision',
        'matchedGeoLocation' => 'getMatchedGeoLocation',
        'nbExactWords' => 'getNbExactWords',
        'nbTypos' => 'getNbTypos',
        'promoted' => 'getPromoted',
        'proximityDistance' => 'getProximityDistance',
        'userScore' => 'getUserScore',
        'word' => 'getWord',
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
        if (isset($data['filters'])) {
            $this->container['filters'] = $data['filters'];
        }
        if (isset($data['firstMatchedWord'])) {
            $this->container['firstMatchedWord'] = $data['firstMatchedWord'];
        }
        if (isset($data['geoDistance'])) {
            $this->container['geoDistance'] = $data['geoDistance'];
        }
        if (isset($data['geoPrecision'])) {
            $this->container['geoPrecision'] = $data['geoPrecision'];
        }
        if (isset($data['matchedGeoLocation'])) {
            $this->container['matchedGeoLocation'] = $data['matchedGeoLocation'];
        }
        if (isset($data['nbExactWords'])) {
            $this->container['nbExactWords'] = $data['nbExactWords'];
        }
        if (isset($data['nbTypos'])) {
            $this->container['nbTypos'] = $data['nbTypos'];
        }
        if (isset($data['promoted'])) {
            $this->container['promoted'] = $data['promoted'];
        }
        if (isset($data['proximityDistance'])) {
            $this->container['proximityDistance'] = $data['proximityDistance'];
        }
        if (isset($data['userScore'])) {
            $this->container['userScore'] = $data['userScore'];
        }
        if (isset($data['word'])) {
            $this->container['word'] = $data['word'];
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
     * Gets filters
     *
     * @return int|null
     */
    public function getFilters()
    {
        return $this->container['filters'] ?? null;
    }

    /**
     * Sets filters
     *
     * @param int|null $filters this field is reserved for advanced usage
     *
     * @return self
     */
    public function setFilters($filters)
    {
        $this->container['filters'] = $filters;

        return $this;
    }

    /**
     * Gets firstMatchedWord
     *
     * @return int|null
     */
    public function getFirstMatchedWord()
    {
        return $this->container['firstMatchedWord'] ?? null;
    }

    /**
     * Sets firstMatchedWord
     *
     * @param int|null $firstMatchedWord position of the most important matched attribute in the attributes to index list
     *
     * @return self
     */
    public function setFirstMatchedWord($firstMatchedWord)
    {
        $this->container['firstMatchedWord'] = $firstMatchedWord;

        return $this;
    }

    /**
     * Gets geoDistance
     *
     * @return int|null
     */
    public function getGeoDistance()
    {
        return $this->container['geoDistance'] ?? null;
    }

    /**
     * Sets geoDistance
     *
     * @param int|null $geoDistance distance between the geo location in the search query and the best matching geo location in the record, divided by the geo precision (in meters)
     *
     * @return self
     */
    public function setGeoDistance($geoDistance)
    {
        $this->container['geoDistance'] = $geoDistance;

        return $this;
    }

    /**
     * Gets geoPrecision
     *
     * @return int|null
     */
    public function getGeoPrecision()
    {
        return $this->container['geoPrecision'] ?? null;
    }

    /**
     * Sets geoPrecision
     *
     * @param int|null $geoPrecision precision used when computing the geo distance, in meters
     *
     * @return self
     */
    public function setGeoPrecision($geoPrecision)
    {
        $this->container['geoPrecision'] = $geoPrecision;

        return $this;
    }

    /**
     * Gets matchedGeoLocation
     *
     * @return array<string,\Algolia\AlgoliaSearch\Model\Recommend\RankingInfoMatchedGeoLocation>|null
     */
    public function getMatchedGeoLocation()
    {
        return $this->container['matchedGeoLocation'] ?? null;
    }

    /**
     * Sets matchedGeoLocation
     *
     * @param array<string,\Algolia\AlgoliaSearch\Model\Recommend\RankingInfoMatchedGeoLocation>|null $matchedGeoLocation matchedGeoLocation
     *
     * @return self
     */
    public function setMatchedGeoLocation($matchedGeoLocation)
    {
        $this->container['matchedGeoLocation'] = $matchedGeoLocation;

        return $this;
    }

    /**
     * Gets nbExactWords
     *
     * @return int|null
     */
    public function getNbExactWords()
    {
        return $this->container['nbExactWords'] ?? null;
    }

    /**
     * Sets nbExactWords
     *
     * @param int|null $nbExactWords number of exactly matched words
     *
     * @return self
     */
    public function setNbExactWords($nbExactWords)
    {
        $this->container['nbExactWords'] = $nbExactWords;

        return $this;
    }

    /**
     * Gets nbTypos
     *
     * @return int|null
     */
    public function getNbTypos()
    {
        return $this->container['nbTypos'] ?? null;
    }

    /**
     * Sets nbTypos
     *
     * @param int|null $nbTypos number of typos encountered when matching the record
     *
     * @return self
     */
    public function setNbTypos($nbTypos)
    {
        $this->container['nbTypos'] = $nbTypos;

        return $this;
    }

    /**
     * Gets promoted
     *
     * @return bool|null
     */
    public function getPromoted()
    {
        return $this->container['promoted'] ?? null;
    }

    /**
     * Sets promoted
     *
     * @param bool|null $promoted present and set to true if a Rule promoted the hit
     *
     * @return self
     */
    public function setPromoted($promoted)
    {
        $this->container['promoted'] = $promoted;

        return $this;
    }

    /**
     * Gets proximityDistance
     *
     * @return int|null
     */
    public function getProximityDistance()
    {
        return $this->container['proximityDistance'] ?? null;
    }

    /**
     * Sets proximityDistance
     *
     * @param int|null $proximityDistance when the query contains more than one word, the sum of the distances between matched words (in meters)
     *
     * @return self
     */
    public function setProximityDistance($proximityDistance)
    {
        $this->container['proximityDistance'] = $proximityDistance;

        return $this;
    }

    /**
     * Gets userScore
     *
     * @return int|null
     */
    public function getUserScore()
    {
        return $this->container['userScore'] ?? null;
    }

    /**
     * Sets userScore
     *
     * @param int|null $userScore custom ranking for the object, expressed as a single integer value
     *
     * @return self
     */
    public function setUserScore($userScore)
    {
        $this->container['userScore'] = $userScore;

        return $this;
    }

    /**
     * Gets word
     *
     * @return int|null
     */
    public function getWord()
    {
        return $this->container['word'] ?? null;
    }

    /**
     * Sets word
     *
     * @param int|null $word number of matched words, including prefixes and typos
     *
     * @return self
     */
    public function setWord($word)
    {
        $this->container['word'] = $word;

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

