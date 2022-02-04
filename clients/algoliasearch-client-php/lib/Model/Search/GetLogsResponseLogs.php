<?php

namespace Algolia\AlgoliaSearch\Model\Search;

use \Algolia\AlgoliaSearch\ObjectSerializer;
use \ArrayAccess;

/**
 * GetLogsResponseLogs Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 * @implements \ArrayAccess<TKey, TValue>
 * @template TKey int|null
 * @template TValue mixed|null
 */
class GetLogsResponseLogs implements ModelInterface, ArrayAccess, \JsonSerializable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'getLogsResponse_logs';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'timestamp' => 'string',
        'method' => 'string',
        'answerCode' => 'string',
        'queryBody' => 'string',
        'answer' => 'string',
        'url' => 'string',
        'ip' => 'string',
        'queryHeaders' => 'string',
        'sha1' => 'string',
        'nbApiCalls' => 'string',
        'processingTimeMs' => 'string',
        'index' => 'string',
        'queryParams' => 'string',
        'queryNbHits' => 'string',
        'innerQueries' => '\Algolia\AlgoliaSearch\Model\Search\GetLogsResponseInnerQueries[]',
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'timestamp' => null,
        'method' => null,
        'answerCode' => null,
        'queryBody' => null,
        'answer' => null,
        'url' => null,
        'ip' => null,
        'queryHeaders' => null,
        'sha1' => null,
        'nbApiCalls' => null,
        'processingTimeMs' => null,
        'index' => null,
        'queryParams' => null,
        'queryNbHits' => null,
        'innerQueries' => null,
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
        'timestamp' => 'timestamp',
        'method' => 'method',
        'answerCode' => 'answer_code',
        'queryBody' => 'query_body',
        'answer' => 'answer',
        'url' => 'url',
        'ip' => 'ip',
        'queryHeaders' => 'query_headers',
        'sha1' => 'sha1',
        'nbApiCalls' => 'nb_api_calls',
        'processingTimeMs' => 'processing_time_ms',
        'index' => 'index',
        'queryParams' => 'query_params',
        'queryNbHits' => 'query_nb_hits',
        'innerQueries' => 'inner_queries',
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'timestamp' => 'setTimestamp',
        'method' => 'setMethod',
        'answerCode' => 'setAnswerCode',
        'queryBody' => 'setQueryBody',
        'answer' => 'setAnswer',
        'url' => 'setUrl',
        'ip' => 'setIp',
        'queryHeaders' => 'setQueryHeaders',
        'sha1' => 'setSha1',
        'nbApiCalls' => 'setNbApiCalls',
        'processingTimeMs' => 'setProcessingTimeMs',
        'index' => 'setIndex',
        'queryParams' => 'setQueryParams',
        'queryNbHits' => 'setQueryNbHits',
        'innerQueries' => 'setInnerQueries',
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'timestamp' => 'getTimestamp',
        'method' => 'getMethod',
        'answerCode' => 'getAnswerCode',
        'queryBody' => 'getQueryBody',
        'answer' => 'getAnswer',
        'url' => 'getUrl',
        'ip' => 'getIp',
        'queryHeaders' => 'getQueryHeaders',
        'sha1' => 'getSha1',
        'nbApiCalls' => 'getNbApiCalls',
        'processingTimeMs' => 'getProcessingTimeMs',
        'index' => 'getIndex',
        'queryParams' => 'getQueryParams',
        'queryNbHits' => 'getQueryNbHits',
        'innerQueries' => 'getInnerQueries',
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
        $this->container['timestamp'] = $data['timestamp'] ?? null;
        $this->container['method'] = $data['method'] ?? null;
        $this->container['answerCode'] = $data['answerCode'] ?? null;
        $this->container['queryBody'] = $data['queryBody'] ?? null;
        $this->container['answer'] = $data['answer'] ?? null;
        $this->container['url'] = $data['url'] ?? null;
        $this->container['ip'] = $data['ip'] ?? null;
        $this->container['queryHeaders'] = $data['queryHeaders'] ?? null;
        $this->container['sha1'] = $data['sha1'] ?? null;
        $this->container['nbApiCalls'] = $data['nbApiCalls'] ?? null;
        $this->container['processingTimeMs'] = $data['processingTimeMs'] ?? null;
        $this->container['index'] = $data['index'] ?? null;
        $this->container['queryParams'] = $data['queryParams'] ?? null;
        $this->container['queryNbHits'] = $data['queryNbHits'] ?? null;
        $this->container['innerQueries'] = $data['innerQueries'] ?? null;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties()
    {
        $invalidProperties = [];

        if ($this->container['timestamp'] === null) {
            $invalidProperties[] = "'timestamp' can't be null";
        }
        if ($this->container['method'] === null) {
            $invalidProperties[] = "'method' can't be null";
        }
        if ($this->container['answerCode'] === null) {
            $invalidProperties[] = "'answerCode' can't be null";
        }
        if ($this->container['queryBody'] === null) {
            $invalidProperties[] = "'queryBody' can't be null";
        }
        if ($this->container['answer'] === null) {
            $invalidProperties[] = "'answer' can't be null";
        }
        if ($this->container['url'] === null) {
            $invalidProperties[] = "'url' can't be null";
        }
        if ($this->container['ip'] === null) {
            $invalidProperties[] = "'ip' can't be null";
        }
        if ($this->container['queryHeaders'] === null) {
            $invalidProperties[] = "'queryHeaders' can't be null";
        }
        if ($this->container['sha1'] === null) {
            $invalidProperties[] = "'sha1' can't be null";
        }
        if ($this->container['nbApiCalls'] === null) {
            $invalidProperties[] = "'nbApiCalls' can't be null";
        }
        if ($this->container['processingTimeMs'] === null) {
            $invalidProperties[] = "'processingTimeMs' can't be null";
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
     * Gets timestamp
     *
     * @return string
     */
    public function getTimestamp()
    {
        return $this->container['timestamp'];
    }

    /**
     * Sets timestamp
     *
     * @param string $timestamp timestamp in ISO-8601 format
     *
     * @return self
     */
    public function setTimestamp($timestamp)
    {
        $this->container['timestamp'] = $timestamp;

        return $this;
    }

    /**
     * Gets method
     *
     * @return string
     */
    public function getMethod()
    {
        return $this->container['method'];
    }

    /**
     * Sets method
     *
     * @param string $method HTTP method of the perfomed request
     *
     * @return self
     */
    public function setMethod($method)
    {
        $this->container['method'] = $method;

        return $this;
    }

    /**
     * Gets answerCode
     *
     * @return string
     */
    public function getAnswerCode()
    {
        return $this->container['answerCode'];
    }

    /**
     * Sets answerCode
     *
     * @param string $answerCode HTTP response code
     *
     * @return self
     */
    public function setAnswerCode($answerCode)
    {
        $this->container['answerCode'] = $answerCode;

        return $this;
    }

    /**
     * Gets queryBody
     *
     * @return string
     */
    public function getQueryBody()
    {
        return $this->container['queryBody'];
    }

    /**
     * Sets queryBody
     *
     * @param string $queryBody Request body. Truncated after 1000 characters.
     *
     * @return self
     */
    public function setQueryBody($queryBody)
    {
        $this->container['queryBody'] = $queryBody;

        return $this;
    }

    /**
     * Gets answer
     *
     * @return string
     */
    public function getAnswer()
    {
        return $this->container['answer'];
    }

    /**
     * Sets answer
     *
     * @param string $answer Answer body. Truncated after 1000 characters.
     *
     * @return self
     */
    public function setAnswer($answer)
    {
        $this->container['answer'] = $answer;

        return $this;
    }

    /**
     * Gets url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->container['url'];
    }

    /**
     * Sets url
     *
     * @param string $url request URL
     *
     * @return self
     */
    public function setUrl($url)
    {
        $this->container['url'] = $url;

        return $this;
    }

    /**
     * Gets ip
     *
     * @return string
     */
    public function getIp()
    {
        return $this->container['ip'];
    }

    /**
     * Sets ip
     *
     * @param string $ip IP of the client which perfomed the request
     *
     * @return self
     */
    public function setIp($ip)
    {
        $this->container['ip'] = $ip;

        return $this;
    }

    /**
     * Gets queryHeaders
     *
     * @return string
     */
    public function getQueryHeaders()
    {
        return $this->container['queryHeaders'];
    }

    /**
     * Sets queryHeaders
     *
     * @param string $queryHeaders request Headers (API Key is obfuscated)
     *
     * @return self
     */
    public function setQueryHeaders($queryHeaders)
    {
        $this->container['queryHeaders'] = $queryHeaders;

        return $this;
    }

    /**
     * Gets sha1
     *
     * @return string
     */
    public function getSha1()
    {
        return $this->container['sha1'];
    }

    /**
     * Sets sha1
     *
     * @param string $sha1 SHA1 signature of the log entry
     *
     * @return self
     */
    public function setSha1($sha1)
    {
        $this->container['sha1'] = $sha1;

        return $this;
    }

    /**
     * Gets nbApiCalls
     *
     * @return string
     */
    public function getNbApiCalls()
    {
        return $this->container['nbApiCalls'];
    }

    /**
     * Sets nbApiCalls
     *
     * @param string $nbApiCalls number of API calls
     *
     * @return self
     */
    public function setNbApiCalls($nbApiCalls)
    {
        $this->container['nbApiCalls'] = $nbApiCalls;

        return $this;
    }

    /**
     * Gets processingTimeMs
     *
     * @return string
     */
    public function getProcessingTimeMs()
    {
        return $this->container['processingTimeMs'];
    }

    /**
     * Sets processingTimeMs
     *
     * @param string $processingTimeMs Processing time for the query. It doesn't include network time.
     *
     * @return self
     */
    public function setProcessingTimeMs($processingTimeMs)
    {
        $this->container['processingTimeMs'] = $processingTimeMs;

        return $this;
    }

    /**
     * Gets index
     *
     * @return string|null
     */
    public function getIndex()
    {
        return $this->container['index'];
    }

    /**
     * Sets index
     *
     * @param string|null $index index targeted by the query
     *
     * @return self
     */
    public function setIndex($index)
    {
        $this->container['index'] = $index;

        return $this;
    }

    /**
     * Gets queryParams
     *
     * @return string|null
     */
    public function getQueryParams()
    {
        return $this->container['queryParams'];
    }

    /**
     * Sets queryParams
     *
     * @param string|null $queryParams query parameters sent with the request
     *
     * @return self
     */
    public function setQueryParams($queryParams)
    {
        $this->container['queryParams'] = $queryParams;

        return $this;
    }

    /**
     * Gets queryNbHits
     *
     * @return string|null
     */
    public function getQueryNbHits()
    {
        return $this->container['queryNbHits'];
    }

    /**
     * Sets queryNbHits
     *
     * @param string|null $queryNbHits number of hits returned for the query
     *
     * @return self
     */
    public function setQueryNbHits($queryNbHits)
    {
        $this->container['queryNbHits'] = $queryNbHits;

        return $this;
    }

    /**
     * Gets innerQueries
     *
     * @return \Algolia\AlgoliaSearch\Model\Search\GetLogsResponseInnerQueries[]|null
     */
    public function getInnerQueries()
    {
        return $this->container['innerQueries'];
    }

    /**
     * Sets innerQueries
     *
     * @param \Algolia\AlgoliaSearch\Model\Search\GetLogsResponseInnerQueries[]|null $innerQueries array of all performed queries for the given request
     *
     * @return self
     */
    public function setInnerQueries($innerQueries)
    {
        $this->container['innerQueries'] = $innerQueries;

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

