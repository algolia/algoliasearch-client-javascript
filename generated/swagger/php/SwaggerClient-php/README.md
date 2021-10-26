# SwaggerClient-php
API powering the Recommend feature of Algolia.

This PHP package is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project:

- API version: 0.1.0
- Build package: io.swagger.codegen.v3.generators.php.PhpClientCodegen

## Requirements

PHP 5.5 and later

## Installation & Usage
### Composer

To install the bindings via [Composer](http://getcomposer.org/), add the following to `composer.json`:

```
{
  "repositories": [
    {
      "type": "git",
      "url": "http://github.com/GIT_USER_ID/GIT_REPO_ID.git"
    }
  ],
  "require": {
    "GIT_USER_ID/GIT_REPO_ID": "*@dev"
  }
}
```

Then run `composer install`

### Manual Installation

Download the files and include `autoload.php`:

```php
    require_once('/path/to/SwaggerClient-php/vendor/autoload.php');
```

## Tests

To run the unit tests:

```
composer install
./vendor/bin/phpunit
```

## Getting Started

Please follow the [installation procedure](#installation--usage) and then run the following:

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$apiInstance = new Swagger\Client\Api\DefaultApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$body = array(new \Swagger\Client\Model\RecommendationsBody()); // \Swagger\Client\Model\RecommendationsBody[] | 
$x_algolia_application_id = "x_algolia_application_id_example"; // string | Algolia appID
$x_algolia_api_key = "x_algolia_api_key_example"; // string | Algolia API key

try {
    $result = $apiInstance->getRecommendations($body, $x_algolia_application_id, $x_algolia_api_key);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->getRecommendations: ', $e->getMessage(), PHP_EOL;
}
?>
```

## Documentation for API Endpoints

All URIs are relative to *https://{appid}-1.algolianet.com*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DefaultApi* | [**getRecommendations**](docs/Api/DefaultApi.md#getrecommendations) | **POST** /1/indexes/*/recommendations | Get recommendations for the given requests.

## Documentation For Models

 - [InlineResponse200](docs/Model/InlineResponse200.md)
 - [RecommendationsBody](docs/Model/RecommendationsBody.md)

## Documentation For Authorization

 All endpoints do not require authorization.


## Author


