<?php

namespace Algolia\AlgoliaSearch\Api;

use Algolia\AlgoliaSearch\Algolia;
use Algolia\AlgoliaSearch\Configuration\RecommendConfig;
use Algolia\AlgoliaSearch\RetryStrategy\ApiWrapper;
use Algolia\AlgoliaSearch\RetryStrategy\ApiWrapperInterface;
use Algolia\AlgoliaSearch\RetryStrategy\ClusterHosts;

/**
 * RecommendApi Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 */
class RecommendApi
{
    /**
     * @var ApiWrapperInterface
     */
    protected $api;

    /**
     * @var RecommendConfig
     */
    protected $config;

    /**
     * @param RecommendConfig $config
     * @param ApiWrapperInterface $apiWrapper
     */
    public function __construct(ApiWrapperInterface $apiWrapper, RecommendConfig $config)
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
        return static::createWithConfig(RecommendConfig::create($appId, $apiKey));
    }

    /**
     * Instantiate the client with congiguration
     *
     * @param RecommendConfig $config Configuration
     */
    public static function createWithConfig(RecommendConfig $config)
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
     * @return RecommendConfig
     */
    public function getClientConfig()
    {
        return $this->config;
    }

    /**
     * Returns recommendations for a specific model and objectID.
     *
     * @param array $getRecommendationsParams getRecommendationsParams (required)
     *
     * @return array<string, mixed>
     */
    public function getRecommendations($getRecommendationsParams)
    {
        // verify the required parameter 'getRecommendationsParams' is set
        if ($getRecommendationsParams === null || (is_array($getRecommendationsParams) && count($getRecommendationsParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $getRecommendationsParams when calling getRecommendations'
            );
        }

        $resourcePath = '/1/indexes/*/recommendations';
        $queryParams = [];
        $httpBody = [];

        if (isset($getRecommendationsParams)) {
            $httpBody = $getRecommendationsParams;
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
