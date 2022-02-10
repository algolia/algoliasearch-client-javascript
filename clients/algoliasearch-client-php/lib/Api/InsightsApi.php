<?php

namespace Algolia\AlgoliaSearch\Api;

use Algolia\AlgoliaSearch\Algolia;
use Algolia\AlgoliaSearch\Configuration\InsightsConfig;
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
            $clusterHosts = ClusterHosts::createForInsights($config->getAppId());
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
     * Operation pushEvents
     *
     * Pushes an array of events.
     *
     * @param  \Algolia\AlgoliaSearch\Model\Insights\InsightEvents $insightEvents insightEvents (required)
     *
     * @throws \Algolia\AlgoliaSearch\ApiException on non-2xx response
     * @throws \InvalidArgumentException
     *
     * @return \Algolia\AlgoliaSearch\Model\Insights\PushEventsResponse|\Algolia\AlgoliaSearch\Model\Insights\ErrorBase|\Algolia\AlgoliaSearch\Model\Insights\ErrorBase|\Algolia\AlgoliaSearch\Model\Insights\ErrorBase|\Algolia\AlgoliaSearch\Model\Insights\ErrorBase
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
