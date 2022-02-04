<?php

require '../../../clients/algoliasearch-client-php/vendor/autoload.php';

use Algolia\AlgoliaSearch\Api\RecommendApi;

$client = RecommendApi::create(getenv('ALGOLIA_APPLICATION_ID'), getenv('ALGOLIA_ADMIN_KEY'));
$indexName = getenv('SEARCH_INDEX');
$query = getenv('SEARCH_QUERY');

var_dump($client->getRecommendations(
    [
        'requests' => [
            [
                'indexName' => $indexName,
                'model' => 'bought-together',
                'objectID' => $query,
                'threshold' => 0
            ]
        ]
    ]
));
