<?php

namespace Algolia\AlgoliaSearch\Api;

use Algolia\AlgoliaSearch\Algolia;
use Algolia\AlgoliaSearch\Configuration\AbtestingConfig;
use Algolia\AlgoliaSearch\ObjectSerializer;
use Algolia\AlgoliaSearch\RetryStrategy\ApiWrapper;
use Algolia\AlgoliaSearch\RetryStrategy\ApiWrapperInterface;
use Algolia\AlgoliaSearch\RetryStrategy\ClusterHosts;

/**
 * AbtestingApi Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 */
class AbtestingApi
{
    /**
     * @var ApiWrapperInterface
     */
    protected $api;

    /**
     * @var AbtestingConfig
     */
    protected $config;

    /**
     * @param AbtestingConfig $config
     * @param ApiWrapperInterface $apiWrapper
     */
    public function __construct(ApiWrapperInterface $apiWrapper, AbtestingConfig $config)
    {
        $this->config = $config;

        $this->api = $apiWrapper;
    }

    /**
     * Instantiate the client with basic credentials and region
     *
     * @param string $appId  Application ID
     * @param string $apiKey Algolia API Key
     * @param string $region Region
     */
    public static function create($appId = null, $apiKey = null, $region = null)
    {
        $allowedRegions = explode('-', 'us-de');
        $config = AbtestingConfig::create($appId, $apiKey, $region, $allowedRegions);

        return static::createWithConfig($config);
    }

    /**
     * Instantiate the client with configuration
     *
     * @param AbtestingConfig $config Configuration
     */
    public static function createWithConfig(AbtestingConfig $config)
    {
        $config = clone $config;

        if ($hosts = $config->getHosts()) {
            // If a list of hosts was passed, we ignore the cache
            $clusterHosts = ClusterHosts::create($hosts);
        } else {
            $clusterHosts = ClusterHosts::create('analytics.'.$config->getRegion().'.algolia.com');
        }

        $apiWrapper = new ApiWrapper(
            Algolia::getHttpClient(),
            $config,
            $clusterHosts
        );

        return new static($apiWrapper, $config);
    }

    /**
     * @return AbtestingConfig
     */
    public function getClientConfig()
    {
        return $this->config;
    }

    /**
     * Creates a new A/B test with provided configuration.
     *
     * @param array $addABTestsRequest addABTestsRequest (required)
     * - $addABTestsRequest['name'] => (string) A/B test name. (required)
     * - $addABTestsRequest['variant'] => (array) List of 2 variants for the A/B test. (required)
     * - $addABTestsRequest['endAt'] => (string) End date for the A/B test expressed as YYYY-MM-DDThh:mm:ssZ. (required)
     *
     * @see \Algolia\AlgoliaSearch\Model\Abtesting\AddABTestsRequest
     *
     * @return array<string, mixed>|\Algolia\AlgoliaSearch\Model\Abtesting\ABTestResponse
     */
    public function addABTests($addABTestsRequest)
    {
        // verify the required parameter 'addABTestsRequest' is set
        if ($addABTestsRequest === null || (is_array($addABTestsRequest) && count($addABTestsRequest) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $addABTestsRequest when calling addABTests'
            );
        }

        $resourcePath = '/2/abtests';
        $queryParams = [];
        $httpBody = [];

        if (isset($addABTestsRequest)) {
            $httpBody = $addABTestsRequest;
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Send requests to the Algolia REST API.
     *
     * @param string $path The path of the API endpoint to target, anything after the /1 needs to be specified. (required)
     * @param array $parameters Query parameters to be applied to the current query. (optional)
     *
     * @return array<string, mixed>|object
     */
    public function del($path, $parameters = null)
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
                $queryParams = $parameters;
            }
        }

        // path params
        if ($path !== null) {
            $resourcePath = str_replace(
                '{path}',
                $path,
                $resourcePath
            );
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Deletes the A/B Test.
     *
     * @param int $id The A/B test ID. (required)
     *
     * @return array<string, mixed>|\Algolia\AlgoliaSearch\Model\Abtesting\ABTestResponse
     */
    public function deleteABTest($id)
    {
        // verify the required parameter 'id' is set
        if ($id === null || (is_array($id) && count($id) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $id when calling deleteABTest'
            );
        }

        $resourcePath = '/2/abtests/{id}';
        $queryParams = [];
        $httpBody = [];

        // path params
        if ($id !== null) {
            $resourcePath = str_replace(
                '{id}',
                ObjectSerializer::toPathValue($id),
                $resourcePath
            );
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Send requests to the Algolia REST API.
     *
     * @param string $path The path of the API endpoint to target, anything after the /1 needs to be specified. (required)
     * @param array $parameters Query parameters to be applied to the current query. (optional)
     *
     * @return array<string, mixed>|object
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
                $queryParams = $parameters;
            }
        }

        // path params
        if ($path !== null) {
            $resourcePath = str_replace(
                '{path}',
                $path,
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Returns metadata and metrics for A/B test id.
     *
     * @param int $id The A/B test ID. (required)
     *
     * @return array<string, mixed>|\Algolia\AlgoliaSearch\Model\Abtesting\ABTest
     */
    public function getABTest($id)
    {
        // verify the required parameter 'id' is set
        if ($id === null || (is_array($id) && count($id) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $id when calling getABTest'
            );
        }

        $resourcePath = '/2/abtests/{id}';
        $queryParams = [];
        $httpBody = [];

        // path params
        if ($id !== null) {
            $resourcePath = str_replace(
                '{id}',
                ObjectSerializer::toPathValue($id),
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Fetch all existing A/B tests for App that are available for the current API Key.
     *
     * @param int $offset Position of the starting record. Used for paging. 0 is the first record. (optional, default to 0)
     * @param int $limit Number of records to return. Limit is the size of the page. (optional, default to 10)
     *
     * @return array<string, mixed>|\Algolia\AlgoliaSearch\Model\Abtesting\ListABTestsResponse
     */
    public function listABTests($offset = 0, $limit = 10)
    {
        $resourcePath = '/2/abtests';
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

        if ($limit !== null) {
            if ('form' === 'form' && is_array($limit)) {
                foreach ($limit as $key => $value) {
                    $queryParams[$key] = $value;
                }
            } else {
                $queryParams['limit'] = $limit;
            }
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Send requests to the Algolia REST API.
     *
     * @param string $path The path of the API endpoint to target, anything after the /1 needs to be specified. (required)
     * @param array $parameters Query parameters to be applied to the current query. (optional)
     * @param array $body The parameters to send with the custom request. (optional)
     *
     * @return array<string, mixed>|object
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
                $queryParams = $parameters;
            }
        }

        // path params
        if ($path !== null) {
            $resourcePath = str_replace(
                '{path}',
                $path,
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
     * @param array $parameters Query parameters to be applied to the current query. (optional)
     * @param array $body The parameters to send with the custom request. (optional)
     *
     * @return array<string, mixed>|object
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
                $queryParams = $parameters;
            }
        }

        // path params
        if ($path !== null) {
            $resourcePath = str_replace(
                '{path}',
                $path,
                $resourcePath
            );
        }

        if (isset($body)) {
            $httpBody = $body;
        }

        return $this->sendRequest('PUT', $resourcePath, $queryParams, $httpBody);
    }

    /**
     * Marks the A/B test as stopped.
     *
     * @param int $id The A/B test ID. (required)
     *
     * @return array<string, mixed>|\Algolia\AlgoliaSearch\Model\Abtesting\ABTestResponse
     */
    public function stopABTest($id)
    {
        // verify the required parameter 'id' is set
        if ($id === null || (is_array($id) && count($id) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $id when calling stopABTest'
            );
        }

        $resourcePath = '/2/abtests/{id}/stop';
        $queryParams = [];
        $httpBody = [];

        // path params
        if ($id !== null) {
            $resourcePath = str_replace(
                '{id}',
                ObjectSerializer::toPathValue($id),
                $resourcePath
            );
        }

        return $this->sendRequest('POST', $resourcePath, $queryParams, $httpBody);
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
