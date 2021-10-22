# OpenAPI\Client\DefaultApi

All URIs are relative to https://-1.algolianet.com.

Method | HTTP request | Description
------------- | ------------- | -------------
[**getRecommendations()**](DefaultApi.md#getRecommendations) | **POST** /1/indexes/*/recommendations | Get recommendations for the given requests.


## `getRecommendations()`

```php
getRecommendations($inline_object, $x_algolia_application_id, $x_algolia_api_key): \OpenAPI\Client\Model\InlineResponse200
```

Get recommendations for the given requests.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DefaultApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$inline_object = array(new \OpenAPI\Client\Model\InlineObject()); // \OpenAPI\Client\Model\InlineObject[]
$x_algolia_application_id = 'x_algolia_application_id_example'; // string | Algolia appID
$x_algolia_api_key = 'x_algolia_api_key_example'; // string | Algolia API key

try {
    $result = $apiInstance->getRecommendations($inline_object, $x_algolia_application_id, $x_algolia_api_key);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->getRecommendations: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inline_object** | [**\OpenAPI\Client\Model\InlineObject[]**](../Model/InlineObject.md)|  |
 **x_algolia_application_id** | **string**| Algolia appID | [optional]
 **x_algolia_api_key** | **string**| Algolia API key | [optional]

### Return type

[**\OpenAPI\Client\Model\InlineResponse200**](../Model/InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)
