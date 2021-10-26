# Swagger\Client\DefaultApi

All URIs are relative to *https://{appid}-1.algolianet.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getRecommendations**](DefaultApi.md#getrecommendations) | **POST** /1/indexes/*/recommendations | Get recommendations for the given requests.

# **getRecommendations**
> \Swagger\Client\Model\InlineResponse200 getRecommendations($body, $x_algolia_application_id, $x_algolia_api_key)

Get recommendations for the given requests.

### Example
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

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**\Swagger\Client\Model\RecommendationsBody[]**](../Model/RecommendationsBody.md)|  |
 **x_algolia_application_id** | **string**| Algolia appID | [optional]
 **x_algolia_api_key** | **string**| Algolia API key | [optional]

### Return type

[**\Swagger\Client\Model\InlineResponse200**](../Model/InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

