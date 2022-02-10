<?php

namespace Algolia\AlgoliaSearch\Api;

use Algolia\AlgoliaSearch\Algolia;
use Algolia\AlgoliaSearch\Configuration\PersonalizationConfig;
use Algolia\AlgoliaSearch\ObjectSerializer;
use Algolia\AlgoliaSearch\RetryStrategy\ApiWrapper;
use Algolia\AlgoliaSearch\RetryStrategy\ApiWrapperInterface;
use Algolia\AlgoliaSearch\RetryStrategy\ClusterHosts;

/**
 * PersonalizationApi Class Doc Comment
 *
 * @category Class
 * @package  Algolia\AlgoliaSearch
 */
class PersonalizationApi
{
    /**
     * @var ApiWrapperInterface
     */
    protected $api;

    /**
     * @var PersonalizationConfig
     */
    protected $config;

    /**
     * @param PersonalizationConfig $config
     * @param ApiWrapperInterface $apiWrapper
     */
    public function __construct(ApiWrapperInterface $apiWrapper, PersonalizationConfig $config)
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
        $allowedRegions = explode('-', 'us-eu');
        $config = PersonalizationConfig::create($appId, $apiKey, $region, $allowedRegions);

        return static::createWithConfig($config);
    }

    /**
     * Instantiate the client with congiguration
     *
     * @param PersonalizationConfig $config Configuration
     */
    public static function createWithConfig(PersonalizationConfig $config)
    {
        $config = clone $config;

        if ($hosts = $config->getHosts()) {
            // If a list of hosts was passed, we ignore the cache
            $clusterHosts = ClusterHosts::create($hosts);
        } else {
            $clusterHosts = ClusterHosts::create('personalization.'.$config->getRegion().'.algolia.com');
        }

        $apiWrapper = new ApiWrapper(
            Algolia::getHttpClient(),
            $config,
            $clusterHosts
        );

        return new static($apiWrapper, $config);
    }

    /**
     * @return PersonalizationConfig
     */
    public function getClientConfig()
    {
        return $this->config;
    }

    /**
     * Operation deleteUserProfile
     *
     * Delete the user profile and all its associated data.
     *
     * @param  string $userToken userToken representing the user for which to fetch the Personalization profile. (required)
     *
     * @throws \Algolia\AlgoliaSearch\ApiException on non-2xx response
     * @throws \InvalidArgumentException
     *
     * @return \Algolia\AlgoliaSearch\Model\Personalization\DeleteUserProfileResponse|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase
     */
    public function deleteUserProfile($userToken)
    {
        // verify the required parameter 'userToken' is set
        if ($userToken === null || (is_array($userToken) && count($userToken) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $userToken when calling deleteUserProfile'
            );
        }

        $resourcePath = '/1/profiles/{userToken}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($userToken !== null) {
            $resourcePath = str_replace(
                '{' . 'userToken' . '}',
                ObjectSerializer::toPathValue($userToken),
                $resourcePath
            );
        }

        return $this->sendRequest('DELETE', $resourcePath, $queryParams, $httpBody);
    }
    /**
     * Operation getPersonalizationStrategy
     *
     * Get the current personalization strategy.
     *
     *
     * @throws \Algolia\AlgoliaSearch\ApiException on non-2xx response
     * @throws \InvalidArgumentException
     *
     * @return \Algolia\AlgoliaSearch\Model\Personalization\PersonalizationStrategyParams|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase
     */
    public function getPersonalizationStrategy()
    {
        $resourcePath = '/1/strategies/personalization';
        $queryParams = [];
        $httpBody = [];

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }
    /**
     * Operation getUserTokenProfile
     *
     * Get the user profile built from Personalization strategy.
     *
     * @param  string $userToken userToken representing the user for which to fetch the Personalization profile. (required)
     *
     * @throws \Algolia\AlgoliaSearch\ApiException on non-2xx response
     * @throws \InvalidArgumentException
     *
     * @return \Algolia\AlgoliaSearch\Model\Personalization\GetUserTokenResponse|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase
     */
    public function getUserTokenProfile($userToken)
    {
        // verify the required parameter 'userToken' is set
        if ($userToken === null || (is_array($userToken) && count($userToken) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $userToken when calling getUserTokenProfile'
            );
        }

        $resourcePath = '/1/profiles/personalization/{userToken}';
        $queryParams = [];
        $httpBody = [];
        // path params
        if ($userToken !== null) {
            $resourcePath = str_replace(
                '{' . 'userToken' . '}',
                ObjectSerializer::toPathValue($userToken),
                $resourcePath
            );
        }

        return $this->sendRequest('GET', $resourcePath, $queryParams, $httpBody);
    }
    /**
     * Operation setPersonalizationStrategy
     *
     * Set a new personalization strategy.
     *
     * @param  \Algolia\AlgoliaSearch\Model\Personalization\PersonalizationStrategyParams $personalizationStrategyParams personalizationStrategyParams (required)
     *
     * @throws \Algolia\AlgoliaSearch\ApiException on non-2xx response
     * @throws \InvalidArgumentException
     *
     * @return \Algolia\AlgoliaSearch\Model\Personalization\SetPersonalizationStrategyResponse|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase|\Algolia\AlgoliaSearch\Model\Personalization\ErrorBase
     */
    public function setPersonalizationStrategy($personalizationStrategyParams)
    {
        // verify the required parameter 'personalizationStrategyParams' is set
        if ($personalizationStrategyParams === null || (is_array($personalizationStrategyParams) && count($personalizationStrategyParams) === 0)) {
            throw new \InvalidArgumentException(
                'Missing the required parameter $personalizationStrategyParams when calling setPersonalizationStrategy'
            );
        }

        $resourcePath = '/1/strategies/personalization';
        $queryParams = [];
        $httpBody = [];

        if (isset($personalizationStrategyParams)) {
            $httpBody = $personalizationStrategyParams;
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
