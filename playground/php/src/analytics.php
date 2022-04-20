<?php

require '../../../clients/algoliasearch-client-php/vendor/autoload.php';

use Algolia\AlgoliaSearch\Api\AnalyticsClient;

$client = AnalyticsClient::create(getenv('ALGOLIA_APPLICATION_ID'), getenv('ALGOLIA_ANALYTICS_KEY'));
$indexName = getenv('ANALYTICS_INDEX');

var_dump(
    $client->getTopFilterForAttribute(
        'myAttribute1,myAttribute2',
        $indexName
    )
);
