<?php

require '../../../clients/algoliasearch-client-php/vendor/autoload.php';

use Algolia\AlgoliaSearch\Api\PersonalizationClient;

$client = PersonalizationClient::create(getenv('ALGOLIA_APPLICATION_ID'), getenv('ALGOLIA_RECOMMENDATION_KEY'));

var_dump(
    $client->deleteUserProfile('userToken')
);
