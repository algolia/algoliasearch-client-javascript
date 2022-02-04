<?php

require '../../../clients/algoliasearch-client-php/vendor/autoload.php';

use Algolia\AlgoliaSearch\Api\QuerySuggestionsApi;

$client = QuerySuggestionsApi::create(getenv('ALGOLIA_APPLICATION_ID'), getenv('QUERY_SUGGESTIONS_KEY'));

var_dump($client->getAllConfigs());
