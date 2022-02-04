<?php

namespace Algolia\AlgoliaSearch\Configuration;

class SearchConfig extends Configuration
{
    private $defaultWaitTaskTimeBeforeRetry = 100000;

    public static function create($appId = null, $apiKey = null)
    {
        $config = [
            'appId' => null !== $appId ? $appId : getenv('ALGOLIA_APP_ID'),
            'apiKey' => null !== $apiKey ? $apiKey : getenv('ALGOLIA_API_KEY'),
        ];

        return new static($config);
    }

    public function getDefaultConfiguration()
    {
        return [
            'appId' => '',
            'apiKey' => '',
            'hosts' => null,
            'readTimeout' => $this->defaultReadTimeout,
            'writeTimeout' => $this->defaultWriteTimeout,
            'connectTimeout' => $this->defaultConnectTimeout,
            'waitTaskTimeBeforeRetry' => $this->defaultWaitTaskTimeBeforeRetry,
            'defaultHeaders' => [],
            'defaultForwardToReplicas' => null,
            'batchSize' => 1000,
        ];
    }
}
