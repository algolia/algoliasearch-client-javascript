<?php

namespace Algolia\AlgoliaSearch\Api;

use Algolia\AlgoliaSearch\Algolia;
use Algolia\AlgoliaSearch\Configuration\SearchConfig;
use Algolia\AlgoliaSearch\ObjectSerializer;
use Algolia\AlgoliaSearch\RetryStrategy\ApiWrapper;
use Algolia\AlgoliaSearch\RetryStrategy\ApiWrapperInterface;
use Algolia\AlgoliaSearch\RetryStrategy\ClusterHosts;

/**
 * SearchApi Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 */
class SearchApi
{
    /**
     * @var ApiWrapperInterface
     */
    protected $api;

    /**
     * @var SearchConfig
     */
    protected $config;

    /**
     * @param SearchConfig $config
     * @param ApiWrapperInterface $apiWrapper
     */
    public function __construct(ApiWrapperInterface $apiWrapper, SearchConfig $config)
    {
        $this->config = $config;

        $this->api = $apiWrapper;
    }

    /**
     * Instantiate the client with basic credentials
     *
     * @param string $appId  Application ID
     * @param string $apiKey Algolia API Key
     */
    public static function create($appId = null, $apiKey = null)
    {
        return static::createWithConfig(SearchConfig::create($appId, $apiKey));
    }

    /**
     * Instantiate the client with congiguration
     *
     * @param SearchConfig $config Configuration
     */
    public static function createWithConfig(SearchConfig $config)
    {
        $config = clone $config;

        $cacheKey = sprintf('%s-clusterHosts-%s', __CLASS__, $config->getAppId());

        if ($hosts = $config->getHosts()) {
            // If a list of hosts was passed, we ignore the cache
            $clusterHosts = ClusterHosts::create($hosts);
        } elseif (false === ($clusterHosts = ClusterHosts::createFromCache($cacheKey))) {
            // We'll try to restore the ClusterHost from cache, if we cannot
            // we create a new instance and set the cache key
            $clusterHosts = ClusterHosts::createFromAppId($config->getAppId())
                ->setCacheKey($cacheKey);
        }

        $apiWrapper = new ApiWrapper(
            Algolia::getHttpClient(),
            $config,
            $clusterHosts
        );

        return new static($apiWrapper, $config);
    }

    /**
     * @return SearchConfig
     */
    public function getClientConfig()
    {
        return $this->config;
    }

    /**
     * Create a new API key.
     *
     * @param array $apiKey apiKey (required)
     *
     * @return array<string, mixed>
     */
    public function addApiKey($apiKey)
    {
        // verify the required parameter 'apiKey' is set
        if ($apiKey === null || (is_array($apiKey) && count($apiKey) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $apiKey when calling addApiKey'
            );
        }

        $resourcePath = '/1/keys';
        $queryParams = [];
        $httpBody = [];

        if (isset($apiKey)) {
            $httpBody = $apiKey;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Add or replace an object with a given object ID.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $objectID Unique identifier of an object. (required)
     * @param array $body The Algolia object. (required)
     *
     * @return array<string, mixed>
     */
    public function addOrUpdateObject($indexName, $objectID, $body)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling addOrUpdateObject'
            );
        }
        // verify the required parameter 'objectID' is set
        if ($objectID === null || (is_array($objectID) && count($objectID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $objectID when calling addOrUpdateObject'
            );
        }
        // verify the required parameter 'body' is set
        if ($body === null || (is_array($body) && count($body) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $body when calling addOrUpdateObject'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/{objectID}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($objectID !== null) {
            $resourcePath = str_replace(
                '{' . 'objectID' . '}',
                ObjectSerializer::toPathValue($objectID),
                $resourcePath
            );
        }

        if (isset($body)) {
            $httpBody = $body;
        }

        return $this->sendRequest('PUT', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Add a single source.
     *
     * @param array $source The source to add. (required)
     *
     * @return array<string, mixed>
     */
    public function appendSource($source)
    {
        // verify the required parameter 'source' is set
        if ($source === null || (is_array($source) && count($source) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $source when calling appendSource'
            );
        }

        $resourcePath = '/1/security/sources/append';
        $queryParams = [];
        $httpBody = [];

        if (isset($source)) {
            $httpBody = $source;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Assign or Move userID
     *
     * @param string $xAlgoliaUserID userID to assign. (required)
     * @param array $assignUserIdParams assignUserIdParams (required)
     *
     * @return array<string, mixed>
     */
    public function assignUserId($xAlgoliaUserID, $assignUserIdParams)
    {
        // verify the required parameter 'xAlgoliaUserID' is set
        if ($xAlgoliaUserID === null || (is_array($xAlgoliaUserID) && count($xAlgoliaUserID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $xAlgoliaUserID when calling assignUserId'
            );
        }
        if (!preg_match('/^[a-zA-Z0-9 \\-*.]+$/', $xAlgoliaUserID)) {
            throw new \InvalidArgumentException('invalid value for "xAlgoliaUserID" when calling SearchApi.assignUserId, must conform to the pattern /^[a-zA-Z0-9 \\-*.]+$/.');
        }

        // verify the required parameter 'assignUserIdParams' is set
        if ($assignUserIdParams === null || (is_array($assignUserIdParams) && count($assignUserIdParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $assignUserIdParams when calling assignUserId'
            );
        }

        $resourcePath = '/1/clusters/mapping';
        $queryParams = [];
        $httpBody = [];

        if ($xAlgoliaUserID !== null) {
            if ('form' === 'form' && is_array($xAlgoliaUserID)) {
                foreach ($xAlgoliaUserID as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['X-Algolia-User-ID'] = $xAlgoliaUserID;
            }
        }

        if (isset($assignUserIdParams)) {
            $httpBody = $assignUserIdParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Performs multiple write operations in a single API call.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $batchWriteParams batchWriteParams (required)
     *
     * @return array<string, mixed>
     */
    public function batch($indexName, $batchWriteParams)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling batch'
            );
        }
        // verify the required parameter 'batchWriteParams' is set
        if ($batchWriteParams === null || (is_array($batchWriteParams) && count($batchWriteParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $batchWriteParams when calling batch'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/batch';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        if (isset($batchWriteParams)) {
            $httpBody = $batchWriteParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Batch assign userIDs
     *
     * @param string $xAlgoliaUserID userID to assign. (required)
     * @param array $batchAssignUserIdsParams batchAssignUserIdsParams (required)
     *
     * @return array<string, mixed>
     */
    public function batchAssignUserIds($xAlgoliaUserID, $batchAssignUserIdsParams)
    {
        // verify the required parameter 'xAlgoliaUserID' is set
        if ($xAlgoliaUserID === null || (is_array($xAlgoliaUserID) && count($xAlgoliaUserID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $xAlgoliaUserID when calling batchAssignUserIds'
            );
        }
        if (!preg_match('/^[a-zA-Z0-9 \\-*.]+$/', $xAlgoliaUserID)) {
            throw new \InvalidArgumentException('invalid value for "xAlgoliaUserID" when calling SearchApi.batchAssignUserIds, must conform to the pattern /^[a-zA-Z0-9 \\-*.]+$/.');
        }

        // verify the required parameter 'batchAssignUserIdsParams' is set
        if ($batchAssignUserIdsParams === null || (is_array($batchAssignUserIdsParams) && count($batchAssignUserIdsParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $batchAssignUserIdsParams when calling batchAssignUserIds'
            );
        }

        $resourcePath = '/1/clusters/mapping/batch';
        $queryParams = [];
        $httpBody = [];

        if ($xAlgoliaUserID !== null) {
            if ('form' === 'form' && is_array($xAlgoliaUserID)) {
                foreach ($xAlgoliaUserID as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['X-Algolia-User-ID'] = $xAlgoliaUserID;
            }
        }

        if (isset($batchAssignUserIdsParams)) {
            $httpBody = $batchAssignUserIdsParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Send a batch of dictionary entries.
     *
     * @param string $dictionaryName The dictionary to search in. (required)
     * @param array $batchDictionaryEntriesParams batchDictionaryEntriesParams (required)
     *
     * @return array<string, mixed>
     */
    public function batchDictionaryEntries($dictionaryName, $batchDictionaryEntriesParams)
    {
        // verify the required parameter 'dictionaryName' is set
        if ($dictionaryName === null || (is_array($dictionaryName) && count($dictionaryName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $dictionaryName when calling batchDictionaryEntries'
            );
        }
        // verify the required parameter 'batchDictionaryEntriesParams' is set
        if ($batchDictionaryEntriesParams === null || (is_array($batchDictionaryEntriesParams) && count($batchDictionaryEntriesParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $batchDictionaryEntriesParams when calling batchDictionaryEntries'
            );
        }

        $resourcePath = '/1/dictionaries/{dictionaryName}/batch';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($dictionaryName !== null) {
            $resourcePath = str_replace(
                '{' . 'dictionaryName' . '}',
                ObjectSerializer::toPathValue($dictionaryName),
                $resourcePath
            );
        }

        if (isset($batchDictionaryEntriesParams)) {
            $httpBody = $batchDictionaryEntriesParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Batch Rules.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $rule rule (required)
     * @param array $forwardToReplicas When true, changes are also propagated to replicas of the given indexName. (optional)
     * @param array $clearExistingRules When true, existing Rules are cleared before adding this batch. When false, existing Rules are kept. (optional)
     *
     * @return array<string, mixed>
     */
    public function batchRules($indexName, $rule, $forwardToReplicas = null, $clearExistingRules = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling batchRules'
            );
        }
        // verify the required parameter 'rule' is set
        if ($rule === null || (is_array($rule) && count($rule) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $rule when calling batchRules'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/rules/batch';
        $queryParams = [];
        $httpBody = [];

        if ($forwardToReplicas !== null) {
            if ('form' === 'form' && is_array($forwardToReplicas)) {
                foreach ($forwardToReplicas as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['forwardToReplicas'] = $forwardToReplicas;
            }
        }

        if ($clearExistingRules !== null) {
            if ('form' === 'form' && is_array($clearExistingRules)) {
                foreach ($clearExistingRules as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['clearExistingRules'] = $clearExistingRules;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        if (isset($rule)) {
            $httpBody = $rule;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Retrieve all index content.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $browseRequest browseRequest (optional)
     *
     * @return array<string, mixed>
     */
    public function browse($indexName, $browseRequest = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling browse'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/browse';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        if (isset($browseRequest)) {
            $httpBody = $browseRequest;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Clear all synonyms.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $forwardToReplicas When true, changes are also propagated to replicas of the given indexName. (optional)
     *
     * @return array<string, mixed>
     */
    public function clearAllSynonyms($indexName, $forwardToReplicas = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling clearAllSynonyms'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/synonyms/clear';
        $queryParams = [];
        $httpBody = [];

        if ($forwardToReplicas !== null) {
            if ('form' === 'form' && is_array($forwardToReplicas)) {
                foreach ($forwardToReplicas as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['forwardToReplicas'] = $forwardToReplicas;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * clear all objects from an index.
     *
     * @param string $indexName The index in which to perform the request. (required)
     *
     * @return array<string, mixed>
     */
    public function clearObjects($indexName)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling clearObjects'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/clear';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Clear Rules.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $forwardToReplicas When true, changes are also propagated to replicas of the given indexName. (optional)
     *
     * @return array<string, mixed>
     */
    public function clearRules($indexName, $forwardToReplicas = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling clearRules'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/rules/clear';
        $queryParams = [];
        $httpBody = [];

        if ($forwardToReplicas !== null) {
            if ('form' === 'form' && is_array($forwardToReplicas)) {
                foreach ($forwardToReplicas as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['forwardToReplicas'] = $forwardToReplicas;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Send requests to the Algolia REST API.
     *
     * @param string $path The path of the API endpoint to target, anything after the /1 needs to be specified. (required)
     * @param string $parameters URL-encoded query string. Force some query parameters to be applied for each query made with this API key. (optional)
     * @param array $body The parameters to send with the custom request. (optional)
     *
     * @return array<string, mixed>
     */
    public function del($path, $parameters = null, $body = null)
    {
        // verify the required parameter 'path' is set
        if ($path === null || (is_array($path) && count($path) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $path when calling del'
            );
        }

        $resourcePath = '/1{path}';
        $queryParams = [];
        $httpBody = [];

        if ($parameters !== null) {
            if ('form' === 'form' && is_array($parameters)) {
                foreach ($parameters as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['parameters'] = $parameters;
            }
        }
        // path params
        if ($path !== null) {
            $resourcePath = str_replace(
                '{' . 'path' . '}',
                ObjectSerializer::toPathValue($path),
                $resourcePath
            );
        }

        if (isset($body)) {
            $httpBody = $body;
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Delete an API key.
     *
     * @param string $key API Key string. (required)
     *
     * @return array<string, mixed>
     */
    public function deleteApiKey($key)
    {
        // verify the required parameter 'key' is set
        if ($key === null || (is_array($key) && count($key) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $key when calling deleteApiKey'
            );
        }

        $resourcePath = '/1/keys/{key}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($key !== null) {
            $resourcePath = str_replace(
                '{' . 'key' . '}',
                ObjectSerializer::toPathValue($key),
                $resourcePath
            );
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Delete all records matching the query.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $searchParams searchParams (required)
     *
     * @return array<string, mixed>
     */
    public function deleteBy($indexName, $searchParams)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling deleteBy'
            );
        }
        // verify the required parameter 'searchParams' is set
        if ($searchParams === null || (is_array($searchParams) && count($searchParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $searchParams when calling deleteBy'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/deleteByQuery';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        if (isset($searchParams)) {
            $httpBody = $searchParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Delete index.
     *
     * @param string $indexName The index in which to perform the request. (required)
     *
     * @return array<string, mixed>
     */
    public function deleteIndex($indexName)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling deleteIndex'
            );
        }

        $resourcePath = '/1/indexes/{indexName}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Delete object.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $objectID Unique identifier of an object. (required)
     *
     * @return array<string, mixed>
     */
    public function deleteObject($indexName, $objectID)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling deleteObject'
            );
        }
        // verify the required parameter 'objectID' is set
        if ($objectID === null || (is_array($objectID) && count($objectID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $objectID when calling deleteObject'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/{objectID}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($objectID !== null) {
            $resourcePath = str_replace(
                '{' . 'objectID' . '}',
                ObjectSerializer::toPathValue($objectID),
                $resourcePath
            );
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Delete a rule.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $objectID Unique identifier of an object. (required)
     * @param array $forwardToReplicas When true, changes are also propagated to replicas of the given indexName. (optional)
     *
     * @return array<string, mixed>
     */
    public function deleteRule($indexName, $objectID, $forwardToReplicas = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling deleteRule'
            );
        }
        // verify the required parameter 'objectID' is set
        if ($objectID === null || (is_array($objectID) && count($objectID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $objectID when calling deleteRule'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/rules/{objectID}';
        $queryParams = [];
        $httpBody = [];

        if ($forwardToReplicas !== null) {
            if ('form' === 'form' && is_array($forwardToReplicas)) {
                foreach ($forwardToReplicas as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['forwardToReplicas'] = $forwardToReplicas;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($objectID !== null) {
            $resourcePath = str_replace(
                '{' . 'objectID' . '}',
                ObjectSerializer::toPathValue($objectID),
                $resourcePath
            );
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Remove a single source.
     *
     * @param string $source The IP range of the source. (required)
     *
     * @return array<string, mixed>
     */
    public function deleteSource($source)
    {
        // verify the required parameter 'source' is set
        if ($source === null || (is_array($source) && count($source) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $source when calling deleteSource'
            );
        }

        $resourcePath = '/1/security/sources/{source}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($source !== null) {
            $resourcePath = str_replace(
                '{' . 'source' . '}',
                ObjectSerializer::toPathValue($source),
                $resourcePath
            );
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Delete synonym.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $objectID Unique identifier of an object. (required)
     * @param array $forwardToReplicas When true, changes are also propagated to replicas of the given indexName. (optional)
     *
     * @return array<string, mixed>
     */
    public function deleteSynonym($indexName, $objectID, $forwardToReplicas = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling deleteSynonym'
            );
        }
        // verify the required parameter 'objectID' is set
        if ($objectID === null || (is_array($objectID) && count($objectID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $objectID when calling deleteSynonym'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/synonyms/{objectID}';
        $queryParams = [];
        $httpBody = [];

        if ($forwardToReplicas !== null) {
            if ('form' === 'form' && is_array($forwardToReplicas)) {
                foreach ($forwardToReplicas as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['forwardToReplicas'] = $forwardToReplicas;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($objectID !== null) {
            $resourcePath = str_replace(
                '{' . 'objectID' . '}',
                ObjectSerializer::toPathValue($objectID),
                $resourcePath
            );
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Send requests to the Algolia REST API.
     *
     * @param string $path The path of the API endpoint to target, anything after the /1 needs to be specified. (required)
     * @param string $parameters URL-encoded query string. Force some query parameters to be applied for each query made with this API key. (optional)
     *
     * @return array<string, mixed>
     */
    public function get($path, $parameters = null)
    {
        // verify the required parameter 'path' is set
        if ($path === null || (is_array($path) && count($path) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $path when calling get'
            );
        }

        $resourcePath = '/1{path}';
        $queryParams = [];
        $httpBody = [];

        if ($parameters !== null) {
            if ('form' === 'form' && is_array($parameters)) {
                foreach ($parameters as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['parameters'] = $parameters;
            }
        }
        // path params
        if ($path !== null) {
            $resourcePath = str_replace(
                '{' . 'path' . '}',
                ObjectSerializer::toPathValue($path),
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Get an API key.
     *
     * @param string $key API Key string. (required)
     *
     * @return array<string, mixed>
     */
    public function getApiKey($key)
    {
        // verify the required parameter 'key' is set
        if ($key === null || (is_array($key) && count($key) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $key when calling getApiKey'
            );
        }

        $resourcePath = '/1/keys/{key}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($key !== null) {
            $resourcePath = str_replace(
                '{' . 'key' . '}',
                ObjectSerializer::toPathValue($key),
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * List dictionaries supported per language.
     *
     *
     * @return array<string, mixed>
     */
    public function getDictionaryLanguages()
    {
        $resourcePath = '/1/dictionaries/*/languages';
        $queryParams = [];
        $httpBody = [];

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Retrieve dictionaries settings. The API stores languages whose standard entries are disabled. Fetch settings does not return false values.
     *
     *
     * @return array<string, mixed>
     */
    public function getDictionarySettings()
    {
        $resourcePath = '/1/dictionaries/*/settings';
        $queryParams = [];
        $httpBody = [];

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Return the lastest log entries.
     *
     * @param int $offset First entry to retrieve (zero-based). Log entries are sorted by decreasing date, therefore 0 designates the most recent log entry. (optional, default to 0)
     * @param int $length Maximum number of entries to retrieve. The maximum allowed value is 1000. (optional, default to 10)
     * @param string $indexName Index for which log entries should be retrieved. When omitted, log entries are retrieved across all indices. (optional, default to 'null')
     * @param string $type Type of log entries to retrieve. When omitted, all log entries are retrieved. (optional, default to 'all')
     *
     * @return array<string, mixed>
     */
    public function getLogs($offset = 0, $length = 10, $indexName = 'null', $type = 'all')
    {
        if ($length !== null && $length > 1000) {
            throw new \InvalidArgumentException('invalid value for "$length" when calling SearchApi.getLogs, must be smaller than or equal to 1000.');
        }

        $resourcePath = '/1/logs';
        $queryParams = [];
        $httpBody = [];

        if ($offset !== null) {
            if ('form' === 'form' && is_array($offset)) {
                foreach ($offset as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['offset'] = $offset;
            }
        }

        if ($length !== null) {
            if ('form' === 'form' && is_array($length)) {
                foreach ($length as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['length'] = $length;
            }
        }

        if ($indexName !== null) {
            if ('form' === 'form' && is_array($indexName)) {
                foreach ($indexName as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['indexName'] = $indexName;
            }
        }

        if ($type !== null) {
            if ('form' === 'form' && is_array($type)) {
                foreach ($type as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['type'] = $type;
            }
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Retrieve one object from the index.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $objectID Unique identifier of an object. (required)
     * @param array $attributesToRetrieve List of attributes to retrieve. If not specified, all retrievable attributes are returned. (optional)
     *
     * @return array<string, mixed>
     */
    public function getObject($indexName, $objectID, $attributesToRetrieve = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling getObject'
            );
        }
        // verify the required parameter 'objectID' is set
        if ($objectID === null || (is_array($objectID) && count($objectID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $objectID when calling getObject'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/{objectID}';
        $queryParams = [];
        $httpBody = [];

        if ($attributesToRetrieve !== null) {
            if ('form' === 'form' && is_array($attributesToRetrieve)) {
                foreach ($attributesToRetrieve as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['attributesToRetrieve'] = $attributesToRetrieve;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($objectID !== null) {
            $resourcePath = str_replace(
                '{' . 'objectID' . '}',
                ObjectSerializer::toPathValue($objectID),
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Retrieve one or more objects.
     *
     * @param array $getObjectsParams getObjectsParams (required)
     *
     * @return array<string, mixed>
     */
    public function getObjects($getObjectsParams)
    {
        // verify the required parameter 'getObjectsParams' is set
        if ($getObjectsParams === null || (is_array($getObjectsParams) && count($getObjectsParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $getObjectsParams when calling getObjects'
            );
        }

        $resourcePath = '/1/indexes/*/objects';
        $queryParams = [];
        $httpBody = [];

        if (isset($getObjectsParams)) {
            $httpBody = $getObjectsParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Get a rule.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $objectID Unique identifier of an object. (required)
     *
     * @return array<string, mixed>
     */
    public function getRule($indexName, $objectID)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling getRule'
            );
        }
        // verify the required parameter 'objectID' is set
        if ($objectID === null || (is_array($objectID) && count($objectID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $objectID when calling getRule'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/rules/{objectID}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($objectID !== null) {
            $resourcePath = str_replace(
                '{' . 'objectID' . '}',
                ObjectSerializer::toPathValue($objectID),
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Retrieve settings of a given indexName.
     *
     * @param string $indexName The index in which to perform the request. (required)
     *
     * @return array<string, mixed>
     */
    public function getSettings($indexName)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling getSettings'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/settings';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * List all allowed sources.
     *
     *
     * @return array<string, mixed>
     */
    public function getSources()
    {
        $resourcePath = '/1/security/sources';
        $queryParams = [];
        $httpBody = [];

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Get synonym.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $objectID Unique identifier of an object. (required)
     *
     * @return array<string, mixed>
     */
    public function getSynonym($indexName, $objectID)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling getSynonym'
            );
        }
        // verify the required parameter 'objectID' is set
        if ($objectID === null || (is_array($objectID) && count($objectID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $objectID when calling getSynonym'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/synonyms/{objectID}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($objectID !== null) {
            $resourcePath = str_replace(
                '{' . 'objectID' . '}',
                ObjectSerializer::toPathValue($objectID),
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Check the current status of a given task.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param int $taskID Unique identifier of an task. Numeric value (up to 64bits) (required)
     *
     * @return array<string, mixed>
     */
    public function getTask($indexName, $taskID)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling getTask'
            );
        }
        // verify the required parameter 'taskID' is set
        if ($taskID === null || (is_array($taskID) && count($taskID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $taskID when calling getTask'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/task/{taskID}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($taskID !== null) {
            $resourcePath = str_replace(
                '{' . 'taskID' . '}',
                ObjectSerializer::toPathValue($taskID),
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Get top userID
     *
     *
     * @return array<string, mixed>
     */
    public function getTopUserIds()
    {
        $resourcePath = '/1/clusters/mapping/top';
        $queryParams = [];
        $httpBody = [];

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Get userID
     *
     * @param string $userID userID to assign. (required)
     *
     * @return array<string, mixed>
     */
    public function getUserId($userID)
    {
        // verify the required parameter 'userID' is set
        if ($userID === null || (is_array($userID) && count($userID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $userID when calling getUserId'
            );
        }
        if (!preg_match('/^[a-zA-Z0-9 \\-*.]+$/', $userID)) {
            throw new \InvalidArgumentException('invalid value for "userID" when calling SearchApi.getUserId, must conform to the pattern /^[a-zA-Z0-9 \\-*.]+$/.');
        }

        $resourcePath = '/1/clusters/mapping/{userID}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($userID !== null) {
            $resourcePath = str_replace(
                '{' . 'userID' . '}',
                ObjectSerializer::toPathValue($userID),
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Has pending mappings
     *
     * @param array $getClusters Whether to get clusters or not. (optional)
     *
     * @return array<string, mixed>
     */
    public function hasPendingMappings($getClusters = null)
    {
        $resourcePath = '/1/clusters/mapping/pending';
        $queryParams = [];
        $httpBody = [];

        if ($getClusters !== null) {
            if ('form' === 'form' && is_array($getClusters)) {
                foreach ($getClusters as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['getClusters'] = $getClusters;
            }
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Get the full list of API Keys.
     *
     *
     * @return array<string, mixed>
     */
    public function listApiKeys()
    {
        $resourcePath = '/1/keys';
        $queryParams = [];
        $httpBody = [];

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * List clusters
     *
     *
     * @return array<string, mixed>
     */
    public function listClusters()
    {
        $resourcePath = '/1/clusters';
        $queryParams = [];
        $httpBody = [];

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * List existing indexes.
     *
     * @param int $page Requested page (zero-based). When specified, will retrieve a specific page; the page size is implicitly set to 100. When null, will retrieve all indices (no pagination). (optional)
     *
     * @return array<string, mixed>
     */
    public function listIndices($page = null)
    {
        $resourcePath = '/1/indexes';
        $queryParams = [];
        $httpBody = [];

        if ($page !== null) {
            if ('form' === 'form' && is_array($page)) {
                foreach ($page as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['page'] = $page;
            }
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * List userIDs
     *
     * @param int $page Requested page (zero-based). When specified, will retrieve a specific page; the page size is implicitly set to 100. When null, will retrieve all indices (no pagination). (optional)
     * @param int $hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
     *
     * @return array<string, mixed>
     */
    public function listUserIds($page = null, $hitsPerPage = 100)
    {
        $resourcePath = '/1/clusters/mapping';
        $queryParams = [];
        $httpBody = [];

        if ($page !== null) {
            if ('form' === 'form' && is_array($page)) {
                foreach ($page as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['page'] = $page;
            }
        }

        if ($hitsPerPage !== null) {
            if ('form' === 'form' && is_array($hitsPerPage)) {
                foreach ($hitsPerPage as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['hitsPerPage'] = $hitsPerPage;
            }
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Perform multiple write operations.
     *
     * @param array $batchParams batchParams (required)
     *
     * @return array<string, mixed>
     */
    public function multipleBatch($batchParams)
    {
        // verify the required parameter 'batchParams' is set
        if ($batchParams === null || (is_array($batchParams) && count($batchParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $batchParams when calling multipleBatch'
            );
        }

        $resourcePath = '/1/indexes/*/batch';
        $queryParams = [];
        $httpBody = [];

        if (isset($batchParams)) {
            $httpBody = $batchParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Get search results for the given requests.
     *
     * @param array $multipleQueriesParams multipleQueriesParams (required)
     *
     * @return array<string, mixed>
     */
    public function multipleQueries($multipleQueriesParams)
    {
        // verify the required parameter 'multipleQueriesParams' is set
        if ($multipleQueriesParams === null || (is_array($multipleQueriesParams) && count($multipleQueriesParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $multipleQueriesParams when calling multipleQueries'
            );
        }

        $resourcePath = '/1/indexes/*/queries';
        $queryParams = [];
        $httpBody = [];

        if (isset($multipleQueriesParams)) {
            $httpBody = $multipleQueriesParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Copy/move index.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $operationIndexParams operationIndexParams (required)
     *
     * @return array<string, mixed>
     */
    public function operationIndex($indexName, $operationIndexParams)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling operationIndex'
            );
        }
        // verify the required parameter 'operationIndexParams' is set
        if ($operationIndexParams === null || (is_array($operationIndexParams) && count($operationIndexParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $operationIndexParams when calling operationIndex'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/operation';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        if (isset($operationIndexParams)) {
            $httpBody = $operationIndexParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Partially update an object.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $objectID Unique identifier of an object. (required)
     * @param array $oneOfStringBuiltInOperation List of attributes to update. (required)
     * @param array $createIfNotExists Creates the record if it does not exist yet. (optional, default to true)
     *
     * @return array<string, mixed>
     */
    public function partialUpdateObject($indexName, $objectID, $oneOfStringBuiltInOperation, $createIfNotExists = true)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling partialUpdateObject'
            );
        }
        // verify the required parameter 'objectID' is set
        if ($objectID === null || (is_array($objectID) && count($objectID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $objectID when calling partialUpdateObject'
            );
        }
        // verify the required parameter 'oneOfStringBuiltInOperation' is set
        if ($oneOfStringBuiltInOperation === null || (is_array($oneOfStringBuiltInOperation) && count($oneOfStringBuiltInOperation) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $oneOfStringBuiltInOperation when calling partialUpdateObject'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/{objectID}/partial';
        $queryParams = [];
        $httpBody = [];

        if ($createIfNotExists !== null) {
            if ('form' === 'form' && is_array($createIfNotExists)) {
                foreach ($createIfNotExists as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['createIfNotExists'] = $createIfNotExists;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($objectID !== null) {
            $resourcePath = str_replace(
                '{' . 'objectID' . '}',
                ObjectSerializer::toPathValue($objectID),
                $resourcePath
            );
        }

        if (isset($oneOfStringBuiltInOperation)) {
            $httpBody = $oneOfStringBuiltInOperation;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Send requests to the Algolia REST API.
     *
     * @param string $path The path of the API endpoint to target, anything after the /1 needs to be specified. (required)
     * @param string $parameters URL-encoded query string. Force some query parameters to be applied for each query made with this API key. (optional)
     * @param array $body The parameters to send with the custom request. (optional)
     *
     * @return array<string, mixed>
     */
    public function post($path, $parameters = null, $body = null)
    {
        // verify the required parameter 'path' is set
        if ($path === null || (is_array($path) && count($path) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $path when calling post'
            );
        }

        $resourcePath = '/1{path}';
        $queryParams = [];
        $httpBody = [];

        if ($parameters !== null) {
            if ('form' === 'form' && is_array($parameters)) {
                foreach ($parameters as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['parameters'] = $parameters;
            }
        }
        // path params
        if ($path !== null) {
            $resourcePath = str_replace(
                '{' . 'path' . '}',
                ObjectSerializer::toPathValue($path),
                $resourcePath
            );
        }

        if (isset($body)) {
            $httpBody = $body;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Send requests to the Algolia REST API.
     *
     * @param string $path The path of the API endpoint to target, anything after the /1 needs to be specified. (required)
     * @param string $parameters URL-encoded query string. Force some query parameters to be applied for each query made with this API key. (optional)
     * @param array $body The parameters to send with the custom request. (optional)
     *
     * @return array<string, mixed>
     */
    public function put($path, $parameters = null, $body = null)
    {
        // verify the required parameter 'path' is set
        if ($path === null || (is_array($path) && count($path) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $path when calling put'
            );
        }

        $resourcePath = '/1{path}';
        $queryParams = [];
        $httpBody = [];

        if ($parameters !== null) {
            if ('form' === 'form' && is_array($parameters)) {
                foreach ($parameters as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['parameters'] = $parameters;
            }
        }
        // path params
        if ($path !== null) {
            $resourcePath = str_replace(
                '{' . 'path' . '}',
                ObjectSerializer::toPathValue($path),
                $resourcePath
            );
        }

        if (isset($body)) {
            $httpBody = $body;
        }

        return $this->sendRequest('PUT', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Remove userID
     *
     * @param string $userID userID to assign. (required)
     *
     * @return array<string, mixed>
     */
    public function removeUserId($userID)
    {
        // verify the required parameter 'userID' is set
        if ($userID === null || (is_array($userID) && count($userID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $userID when calling removeUserId'
            );
        }
        if (!preg_match('/^[a-zA-Z0-9 \\-*.]+$/', $userID)) {
            throw new \InvalidArgumentException('invalid value for "userID" when calling SearchApi.removeUserId, must conform to the pattern /^[a-zA-Z0-9 \\-*.]+$/.');
        }

        $resourcePath = '/1/clusters/mapping/{userID}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($userID !== null) {
            $resourcePath = str_replace(
                '{' . 'userID' . '}',
                ObjectSerializer::toPathValue($userID),
                $resourcePath
            );
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Replace all allowed sources.
     *
     * @param array $source The sources to allow. (required)
     *
     * @return array<string, mixed>
     */
    public function replaceSources($source)
    {
        // verify the required parameter 'source' is set
        if ($source === null || (is_array($source) && count($source) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $source when calling replaceSources'
            );
        }

        $resourcePath = '/1/security/sources';
        $queryParams = [];
        $httpBody = [];

        if (isset($source)) {
            $httpBody = $source;
        }

        return $this->sendRequest('PUT', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Restore an API key.
     *
     * @param string $key API Key string. (required)
     *
     * @return array<string, mixed>
     */
    public function restoreApiKey($key)
    {
        // verify the required parameter 'key' is set
        if ($key === null || (is_array($key) && count($key) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $key when calling restoreApiKey'
            );
        }

        $resourcePath = '/1/keys/{key}/restore';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($key !== null) {
            $resourcePath = str_replace(
                '{' . 'key' . '}',
                ObjectSerializer::toPathValue($key),
                $resourcePath
            );
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Add an object to the index.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $body The Algolia record. (required)
     *
     * @return array<string, mixed>
     */
    public function saveObject($indexName, $body)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling saveObject'
            );
        }
        // verify the required parameter 'body' is set
        if ($body === null || (is_array($body) && count($body) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $body when calling saveObject'
            );
        }

        $resourcePath = '/1/indexes/{indexName}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        if (isset($body)) {
            $httpBody = $body;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Save/Update a rule.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $objectID Unique identifier of an object. (required)
     * @param array $rule rule (required)
     * @param array $forwardToReplicas When true, changes are also propagated to replicas of the given indexName. (optional)
     *
     * @return array<string, mixed>
     */
    public function saveRule($indexName, $objectID, $rule, $forwardToReplicas = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling saveRule'
            );
        }
        // verify the required parameter 'objectID' is set
        if ($objectID === null || (is_array($objectID) && count($objectID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $objectID when calling saveRule'
            );
        }
        // verify the required parameter 'rule' is set
        if ($rule === null || (is_array($rule) && count($rule) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $rule when calling saveRule'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/rules/{objectID}';
        $queryParams = [];
        $httpBody = [];

        if ($forwardToReplicas !== null) {
            if ('form' === 'form' && is_array($forwardToReplicas)) {
                foreach ($forwardToReplicas as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['forwardToReplicas'] = $forwardToReplicas;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($objectID !== null) {
            $resourcePath = str_replace(
                '{' . 'objectID' . '}',
                ObjectSerializer::toPathValue($objectID),
                $resourcePath
            );
        }

        if (isset($rule)) {
            $httpBody = $rule;
        }

        return $this->sendRequest('PUT', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Save synonym.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $objectID Unique identifier of an object. (required)
     * @param array $synonymHit synonymHit (required)
     * @param array $forwardToReplicas When true, changes are also propagated to replicas of the given indexName. (optional)
     *
     * @return array<string, mixed>
     */
    public function saveSynonym($indexName, $objectID, $synonymHit, $forwardToReplicas = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling saveSynonym'
            );
        }
        // verify the required parameter 'objectID' is set
        if ($objectID === null || (is_array($objectID) && count($objectID) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $objectID when calling saveSynonym'
            );
        }
        // verify the required parameter 'synonymHit' is set
        if ($synonymHit === null || (is_array($synonymHit) && count($synonymHit) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $synonymHit when calling saveSynonym'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/synonyms/{objectID}';
        $queryParams = [];
        $httpBody = [];

        if ($forwardToReplicas !== null) {
            if ('form' === 'form' && is_array($forwardToReplicas)) {
                foreach ($forwardToReplicas as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['forwardToReplicas'] = $forwardToReplicas;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($objectID !== null) {
            $resourcePath = str_replace(
                '{' . 'objectID' . '}',
                ObjectSerializer::toPathValue($objectID),
                $resourcePath
            );
        }

        if (isset($synonymHit)) {
            $httpBody = $synonymHit;
        }

        return $this->sendRequest('PUT', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Save a batch of synonyms.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $synonymHit synonymHit (required)
     * @param array $forwardToReplicas When true, changes are also propagated to replicas of the given indexName. (optional)
     * @param array $replaceExistingSynonyms Replace all synonyms of the index with the ones sent with this request. (optional)
     *
     * @return array<string, mixed>
     */
    public function saveSynonyms($indexName, $synonymHit, $forwardToReplicas = null, $replaceExistingSynonyms = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling saveSynonyms'
            );
        }
        // verify the required parameter 'synonymHit' is set
        if ($synonymHit === null || (is_array($synonymHit) && count($synonymHit) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $synonymHit when calling saveSynonyms'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/synonyms/batch';
        $queryParams = [];
        $httpBody = [];

        if ($forwardToReplicas !== null) {
            if ('form' === 'form' && is_array($forwardToReplicas)) {
                foreach ($forwardToReplicas as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['forwardToReplicas'] = $forwardToReplicas;
            }
        }

        if ($replaceExistingSynonyms !== null) {
            if ('form' === 'form' && is_array($replaceExistingSynonyms)) {
                foreach ($replaceExistingSynonyms as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['replaceExistingSynonyms'] = $replaceExistingSynonyms;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        if (isset($synonymHit)) {
            $httpBody = $synonymHit;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Get search results.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $searchParams searchParams (required)
     *
     * @return array<string, mixed>
     */
    public function search($indexName, $searchParams)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling search'
            );
        }
        // verify the required parameter 'searchParams' is set
        if ($searchParams === null || (is_array($searchParams) && count($searchParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $searchParams when calling search'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/query';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        if (isset($searchParams)) {
            $httpBody = $searchParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Search the dictionary entries.
     *
     * @param string $dictionaryName The dictionary to search in. (required)
     * @param array $searchDictionaryEntriesParams searchDictionaryEntriesParams (required)
     *
     * @return array<string, mixed>
     */
    public function searchDictionaryEntries($dictionaryName, $searchDictionaryEntriesParams)
    {
        // verify the required parameter 'dictionaryName' is set
        if ($dictionaryName === null || (is_array($dictionaryName) && count($dictionaryName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $dictionaryName when calling searchDictionaryEntries'
            );
        }
        // verify the required parameter 'searchDictionaryEntriesParams' is set
        if ($searchDictionaryEntriesParams === null || (is_array($searchDictionaryEntriesParams) && count($searchDictionaryEntriesParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $searchDictionaryEntriesParams when calling searchDictionaryEntries'
            );
        }

        $resourcePath = '/1/dictionaries/{dictionaryName}/search';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($dictionaryName !== null) {
            $resourcePath = str_replace(
                '{' . 'dictionaryName' . '}',
                ObjectSerializer::toPathValue($dictionaryName),
                $resourcePath
            );
        }

        if (isset($searchDictionaryEntriesParams)) {
            $httpBody = $searchDictionaryEntriesParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Search for values of a given facet
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $facetName The facet name. (required)
     * @param array $searchForFacetValuesRequest searchForFacetValuesRequest (optional)
     *
     * @return array<string, mixed>
     */
    public function searchForFacetValues($indexName, $facetName, $searchForFacetValuesRequest = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling searchForFacetValues'
            );
        }
        // verify the required parameter 'facetName' is set
        if ($facetName === null || (is_array($facetName) && count($facetName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $facetName when calling searchForFacetValues'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/facets/{facetName}/query';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }
        // path params
        if ($facetName !== null) {
            $resourcePath = str_replace(
                '{' . 'facetName' . '}',
                ObjectSerializer::toPathValue($facetName),
                $resourcePath
            );
        }

        if (isset($searchForFacetValuesRequest)) {
            $httpBody = $searchForFacetValuesRequest;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Search for rules.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $searchRulesParams searchRulesParams (required)
     *
     * @return array<string, mixed>
     */
    public function searchRules($indexName, $searchRulesParams)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling searchRules'
            );
        }
        // verify the required parameter 'searchRulesParams' is set
        if ($searchRulesParams === null || (is_array($searchRulesParams) && count($searchRulesParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $searchRulesParams when calling searchRules'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/rules/search';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        if (isset($searchRulesParams)) {
            $httpBody = $searchRulesParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Get all synonyms that match a query.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param string $query Search for specific synonyms matching this string. (optional, default to '')
     * @param array $type Only search for specific types of synonyms. (optional)
     * @param int $page Requested page (zero-based). When specified, will retrieve a specific page; the page size is implicitly set to 100. When null, will retrieve all indices (no pagination). (optional, default to 0)
     * @param int $hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
     *
     * @return array<string, mixed>
     */
    public function searchSynonyms($indexName, $query = '', $type = null, $page = 0, $hitsPerPage = 100)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling searchSynonyms'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/synonyms/search';
        $queryParams = [];
        $httpBody = [];

        if ($query !== null) {
            if ('form' === 'form' && is_array($query)) {
                foreach ($query as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['query'] = $query;
            }
        }

        if ($type !== null) {
            if ('form' === 'form' && is_array($type)) {
                foreach ($type as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['type'] = $type;
            }
        }

        if ($page !== null) {
            if ('form' === 'form' && is_array($page)) {
                foreach ($page as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['page'] = $page;
            }
        }

        if ($hitsPerPage !== null) {
            if ('form' === 'form' && is_array($hitsPerPage)) {
                foreach ($hitsPerPage as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['hitsPerPage'] = $hitsPerPage;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Search userID
     *
     * @param array $searchUserIdsParams searchUserIdsParams (required)
     *
     * @return array<string, mixed>
     */
    public function searchUserIds($searchUserIdsParams)
    {
        // verify the required parameter 'searchUserIdsParams' is set
        if ($searchUserIdsParams === null || (is_array($searchUserIdsParams) && count($searchUserIdsParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $searchUserIdsParams when calling searchUserIds'
            );
        }

        $resourcePath = '/1/clusters/mapping/search';
        $queryParams = [];
        $httpBody = [];

        if (isset($searchUserIdsParams)) {
            $httpBody = $searchUserIdsParams;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Set dictionary settings.
     *
     * @param array $dictionarySettingsParams dictionarySettingsParams (required)
     *
     * @return array<string, mixed>
     */
    public function setDictionarySettings($dictionarySettingsParams)
    {
        // verify the required parameter 'dictionarySettingsParams' is set
        if ($dictionarySettingsParams === null || (is_array($dictionarySettingsParams) && count($dictionarySettingsParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $dictionarySettingsParams when calling setDictionarySettings'
            );
        }

        $resourcePath = '/1/dictionaries/*/settings';
        $queryParams = [];
        $httpBody = [];

        if (isset($dictionarySettingsParams)) {
            $httpBody = $dictionarySettingsParams;
        }

        return $this->sendRequest('PUT', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Update settings of a given indexName.
     *
     * @param string $indexName The index in which to perform the request. (required)
     * @param array $indexSettings indexSettings (required)
     * @param array $forwardToReplicas When true, changes are also propagated to replicas of the given indexName. (optional)
     *
     * @return array<string, mixed>
     */
    public function setSettings($indexName, $indexSettings, $forwardToReplicas = null)
    {
        // verify the required parameter 'indexName' is set
        if ($indexName === null || (is_array($indexName) && count($indexName) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexName when calling setSettings'
            );
        }
        // verify the required parameter 'indexSettings' is set
        if ($indexSettings === null || (is_array($indexSettings) && count($indexSettings) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $indexSettings when calling setSettings'
            );
        }

        $resourcePath = '/1/indexes/{indexName}/settings';
        $queryParams = [];
        $httpBody = [];

        if ($forwardToReplicas !== null) {
            if ('form' === 'form' && is_array($forwardToReplicas)) {
                foreach ($forwardToReplicas as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['forwardToReplicas'] = $forwardToReplicas;
            }
        }
        // path params
        if ($indexName !== null) {
            $resourcePath = str_replace(
                '{' . 'indexName' . '}',
                ObjectSerializer::toPathValue($indexName),
                $resourcePath
            );
        }

        if (isset($indexSettings)) {
            $httpBody = $indexSettings;
        }

        return $this->sendRequest('PUT', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Update an API key.
     *
     * @param string $key API Key string. (required)
     * @param array $apiKey apiKey (required)
     *
     * @return array<string, mixed>
     */
    public function updateApiKey($key, $apiKey)
    {
        // verify the required parameter 'key' is set
        if ($key === null || (is_array($key) && count($key) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $key when calling updateApiKey'
            );
        }
        // verify the required parameter 'apiKey' is set
        if ($apiKey === null || (is_array($apiKey) && count($apiKey) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $apiKey when calling updateApiKey'
            );
        }

        $resourcePath = '/1/keys/{key}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($key !== null) {
            $resourcePath = str_replace(
                '{' . 'key' . '}',
                ObjectSerializer::toPathValue($key),
                $resourcePath
            );
        }

        if (isset($apiKey)) {
            $httpBody = $apiKey;
        }

        return $this->sendRequest('PUT', $resourcePath, $queryParams, $httpBody);
    }

    private function sendRequest($method, $resourcePath, $queryParams, $httpBody)
    {
        $query = \GuzzleHttp\Psr7\Query::build($queryParams);

        if ($method === 'GET') {
            $request = $this->api->read(
                $method,
                $resourcePath . ($query ? "?{$query}" : '')
            );
        } else {
            $request = $this->api->write(
                $method,
                $resourcePath . ($query ? "?{$query}" : ''),
                $httpBody
            );
        }

        return $request;
    }
}
