<?php

require '../../../clients/algoliasearch-client-php/vendor/autoload.php';

use Algolia\AlgoliaSearch\Api\SearchApi;

$client = SearchApi::create(getenv('ALGOLIA_APPLICATION_ID'), getenv('ALGOLIA_ADMIN_KEY'));
$indexName = getenv('SEARCH_INDEX');

var_dump($client->search($indexName, ['query' => getenv('SEARCH_QUERY')]));
