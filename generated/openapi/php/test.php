<?php

require 'vendor/autoload.php';
use OpenAPI\Client\Api\DefaultApi;
use OpenAPI\Client\Model\InlineObject;
use OpenAPI\Client\Configuration;

$config = new Configuration();
$appId = getenv('ALGOLIA_APPLICATION_ID_1');
$apiKey = getenv('ALGOLIA_ADMIN_KEY_1');
$config->setHost("https://{$appId}-1.algolianet.com");

$client = new DefaultApi(null, $config);

$object = new InlineObject([
    'index_name' => 'products',
    'object_id' => 'B018APC4LE',
    'model' => 'bought-together',
]);

echo $client->getRecommendations([$object], $appId, $apiKey);

// Open API
//"[{"indexName":"products","model":"bought-together","objectID":"B018APC4LE","threshold":0,"maxRecommendations":0}]"
// Current Api Client
// '{"requests":[{"indexName":"products","objectID":"B018APC4LE","model":"bought-together","threshold":0}]}'