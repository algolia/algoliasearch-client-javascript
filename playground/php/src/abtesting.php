<?php

require '../../../clients/algoliasearch-client-php/vendor/autoload.php';

use Algolia\AlgoliaSearch\Api\AbtestingApi;

$client = AbtestingApi::create(getenv('ALGOLIA_APPLICATION_ID'), getenv('ALGOLIA_ANALYTICS_KEY'));

$abTest = [
    'name' => 'testing',
    'variants' => [
        [
            'index' => 'test1',
            'trafficPercentage' => 30,
            'description' => 'a description',
        ],
        [
            'index' => 'test2',
            'trafficPercentage' => 50,
        ],
    ],
    'endAt' => '2022-02-01',
];

var_dump(
    $client->addABTests($abTest)
);
