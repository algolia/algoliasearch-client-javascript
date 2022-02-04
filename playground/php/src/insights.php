<?php

require '../../../clients/algoliasearch-client-php/vendor/autoload.php';

use Algolia\AlgoliaSearch\Api\InsightsApi;

$client = InsightsApi::create(getenv('ALGOLIA_APPLICATION_ID'), getenv('ALGOLIA_ADMIN_KEY'));
$indexName = getenv('SEARCH_INDEX');

$twoDaysAgoMs = (time() - (2 * 24 * 60 * 60)) * 1000;

$event = [
    'eventType' => 'click',
    'eventName' => 'foo',
    'index' => 'sending_events',
    'userToken' => 'bar',
    'objectIDs' => ['one', 'two'],
    'timestamp' => $twoDaysAgoMs,
];

var_dump(
    $client->pushEvents([$event])
);
