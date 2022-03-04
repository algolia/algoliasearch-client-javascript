<?php

namespace Algolia\AlgoliaSearch\Api;

use Algolia\AlgoliaSearch\Algolia;
use Algolia\AlgoliaSearch\Configuration\InsightsConfig;
use Algolia\AlgoliaSearch\ObjectSerializer;
use Algolia\AlgoliaSearch\RetryStrategy\ApiWrapper;
use Algolia\AlgoliaSearch\RetryStrategy\ApiWrapperInterface;
use Algolia\AlgoliaSearch\RetryStrategy\ClusterHosts;

/**
 * InsightsApi Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 */
class InsightsApi
{
    /**
     * @var ApiWrapperInterface
     */
    protected $api;

    /**
     * @var InsightsConfig
     */
    protected $config;

    /**
     * @param InsightsConfig $config
     * @param ApiWrapperInterface $apiWrapper
     */
    public function __construct(ApiWrapperInterface $apiWrapper, InsightsConfig $config)
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
        $config = InsightsConfig::create($appId, $apiKey, $region, $allowedRegions);

        return static::createWithConfig($config);
    }

    /**
     * Instantiate the client with congiguration
     *
     * @param InsightsConfig $config Configuration
     */
    public static function createWithConfig(InsightsConfig $config)
    {
        $config = clone $config;

        if ($hosts = $config->getHosts()) {
            // If a list of hosts was passed, we ignore the cache
            $clusterHosts = ClusterHosts::create($hosts);
        } else {
            $clusterHosts = ClusterHosts::create('insights.'.$config->getRegion().'.algolia.io');
        }

        $apiWrapper = new ApiWrapper(
            Algolia::getHttpClient(),
            $config,
            $clusterHosts
        );

        return new static($apiWrapper, $config);
    }

    /**
     * @return InsightsConfig
     */
    public function getClientConfig()
    {
        return $this->config;
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
     * Pushes an array of events.
     *
     * @param array $insightEvents insightEvents (required)
     *
     * @return array<string, mixed>
     */
    public function pushEvents($insightEvents)
    {
        // verify the required parameter 'insightEvents' is set
        if ($insightEvents === null || (is_array($insightEvents) && count($insightEvents) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $insightEvents when calling pushEvents'
            );
        }

        $resourcePath = '/1/events';
        $queryParams = [];
        $httpBody = [];

        if (isset($insightEvents)) {
            $httpBody = $insightEvents;
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
