package com.algolia.search;

import com.algolia.ApiCallback;
import com.algolia.ApiClient;
import com.algolia.ApiException;
import com.algolia.ApiResponse;
import com.algolia.Pair;
import com.algolia.model.BatchObject;
import com.algolia.model.BatchResponse;
import com.algolia.model.ClearAllSynonymsResponse;
import com.algolia.model.DeleteIndexResponse;
import com.algolia.model.DeleteSynonymResponse;
import com.algolia.model.IndexSettings;
import com.algolia.model.ListIndicesResponse;
import com.algolia.model.MultipleQueriesObject;
import com.algolia.model.MultipleQueriesResponse;
import com.algolia.model.OperationIndexObject;
import com.algolia.model.OperationIndexResponse;
import com.algolia.model.SaveObjectResponse;
import com.algolia.model.SaveSynonymResponse;
import com.algolia.model.SaveSynonymsResponse;
import com.algolia.model.SearchParams;
import com.algolia.model.SearchResponse;
import com.algolia.model.SearchSynonymsResponse;
import com.algolia.model.SetSettingsResponse;
import com.algolia.model.SynonymHit;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SearchApi extends ApiClient {

  public SearchApi(String appId, String apiKey) {
    super(appId, apiKey);
  }

  /**
   * Build call for batch
   *
   * @param indexName The index in which to perform the request. (required)
   * @param batchObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call batchCall(
    String indexName,
    BatchObject batchObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = batchObject;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/batch".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = { "application/json" };
    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "POST",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call batchValidateBeforeCall(
    String indexName,
    BatchObject batchObject,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling batch(Async)"
      );
    }

    // verify the required parameter 'batchObject' is set
    if (batchObject == null) {
      throw new ApiException(
        "Missing the required parameter 'batchObject' when calling batch(Async)"
      );
    }

    okhttp3.Call localVarCall = batchCall(indexName, batchObject, _callback);
    return localVarCall;
  }

  /**
   * Performs multiple write operations in a single API call.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param batchObject (required)
   * @return BatchResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public BatchResponse batch(String indexName, BatchObject batchObject)
    throws ApiException {
    ApiResponse<BatchResponse> localVarResp = batchWithHttpInfo(
      indexName,
      batchObject
    );
    return localVarResp.getData();
  }

  /**
   * Performs multiple write operations in a single API call.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param batchObject (required)
   * @return ApiResponse&lt;BatchResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<BatchResponse> batchWithHttpInfo(
    String indexName,
    BatchObject batchObject
  ) throws ApiException {
    okhttp3.Call localVarCall = batchValidateBeforeCall(
      indexName,
      batchObject,
      null
    );
    Type localVarReturnType = new TypeToken<BatchResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Performs multiple write operations in a single API call.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param batchObject (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call batchAsync(
    String indexName,
    BatchObject batchObject,
    final ApiCallback<BatchResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = batchValidateBeforeCall(
      indexName,
      batchObject,
      _callback
    );
    Type localVarReturnType = new TypeToken<BatchResponse>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for clearAllSynonyms
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call clearAllSynonymsCall(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/synonyms/clear".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (forwardToReplicas != null) {
      localVarQueryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = {};

    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "POST",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call clearAllSynonymsValidateBeforeCall(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling clearAllSynonyms(Async)"
      );
    }

    okhttp3.Call localVarCall = clearAllSynonymsCall(
      indexName,
      forwardToReplicas,
      _callback
    );
    return localVarCall;
  }

  /**
   * Clear all synonyms. Remove all synonyms from an index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return ClearAllSynonymsResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ClearAllSynonymsResponse clearAllSynonyms(
    String indexName,
    Boolean forwardToReplicas
  ) throws ApiException {
    ApiResponse<ClearAllSynonymsResponse> localVarResp = clearAllSynonymsWithHttpInfo(
      indexName,
      forwardToReplicas
    );
    return localVarResp.getData();
  }

  /**
   * Clear all synonyms. Remove all synonyms from an index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return ApiResponse&lt;ClearAllSynonymsResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<ClearAllSynonymsResponse> clearAllSynonymsWithHttpInfo(
    String indexName,
    Boolean forwardToReplicas
  ) throws ApiException {
    okhttp3.Call localVarCall = clearAllSynonymsValidateBeforeCall(
      indexName,
      forwardToReplicas,
      null
    );
    Type localVarReturnType = new TypeToken<ClearAllSynonymsResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Clear all synonyms. (asynchronously) Remove all synonyms from an index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call clearAllSynonymsAsync(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback<ClearAllSynonymsResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = clearAllSynonymsValidateBeforeCall(
      indexName,
      forwardToReplicas,
      _callback
    );
    Type localVarReturnType = new TypeToken<ClearAllSynonymsResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for deleteIndex
   *
   * @param indexName The index in which to perform the request. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call deleteIndexCall(
    String indexName,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = {};

    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "DELETE",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call deleteIndexValidateBeforeCall(
    String indexName,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling deleteIndex(Async)"
      );
    }

    okhttp3.Call localVarCall = deleteIndexCall(indexName, _callback);
    return localVarCall;
  }

  /**
   * Delete index. Delete an existing index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return DeleteIndexResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public DeleteIndexResponse deleteIndex(String indexName) throws ApiException {
    ApiResponse<DeleteIndexResponse> localVarResp = deleteIndexWithHttpInfo(
      indexName
    );
    return localVarResp.getData();
  }

  /**
   * Delete index. Delete an existing index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return ApiResponse&lt;DeleteIndexResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<DeleteIndexResponse> deleteIndexWithHttpInfo(
    String indexName
  ) throws ApiException {
    okhttp3.Call localVarCall = deleteIndexValidateBeforeCall(indexName, null);
    Type localVarReturnType = new TypeToken<DeleteIndexResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Delete index. (asynchronously) Delete an existing index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call deleteIndexAsync(
    String indexName,
    final ApiCallback<DeleteIndexResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = deleteIndexValidateBeforeCall(
      indexName,
      _callback
    );
    Type localVarReturnType = new TypeToken<DeleteIndexResponse>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for deleteSynonym
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call deleteSynonymCall(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/synonyms/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (forwardToReplicas != null) {
      localVarQueryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = {};

    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "DELETE",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call deleteSynonymValidateBeforeCall(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling deleteSynonym(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new ApiException(
        "Missing the required parameter 'objectID' when calling deleteSynonym(Async)"
      );
    }

    okhttp3.Call localVarCall = deleteSynonymCall(
      indexName,
      objectID,
      forwardToReplicas,
      _callback
    );
    return localVarCall;
  }

  /**
   * Delete synonym. Delete a single synonyms set, identified by the given objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return DeleteSynonymResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public DeleteSynonymResponse deleteSynonym(
    String indexName,
    String objectID,
    Boolean forwardToReplicas
  ) throws ApiException {
    ApiResponse<DeleteSynonymResponse> localVarResp = deleteSynonymWithHttpInfo(
      indexName,
      objectID,
      forwardToReplicas
    );
    return localVarResp.getData();
  }

  /**
   * Delete synonym. Delete a single synonyms set, identified by the given objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return ApiResponse&lt;DeleteSynonymResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<DeleteSynonymResponse> deleteSynonymWithHttpInfo(
    String indexName,
    String objectID,
    Boolean forwardToReplicas
  ) throws ApiException {
    okhttp3.Call localVarCall = deleteSynonymValidateBeforeCall(
      indexName,
      objectID,
      forwardToReplicas,
      null
    );
    Type localVarReturnType = new TypeToken<DeleteSynonymResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Delete synonym. (asynchronously) Delete a single synonyms set, identified by the given
   * objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call deleteSynonymAsync(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback<DeleteSynonymResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = deleteSynonymValidateBeforeCall(
      indexName,
      objectID,
      forwardToReplicas,
      _callback
    );
    Type localVarReturnType = new TypeToken<DeleteSynonymResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for getSettings
   *
   * @param indexName The index in which to perform the request. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call getSettingsCall(
    String indexName,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/settings".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = {};

    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "GET",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call getSettingsValidateBeforeCall(
    String indexName,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling getSettings(Async)"
      );
    }

    okhttp3.Call localVarCall = getSettingsCall(indexName, _callback);
    return localVarCall;
  }

  /**
   * Retrieve settings of a given indexName.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return IndexSettings
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public IndexSettings getSettings(String indexName) throws ApiException {
    ApiResponse<IndexSettings> localVarResp = getSettingsWithHttpInfo(
      indexName
    );
    return localVarResp.getData();
  }

  /**
   * Retrieve settings of a given indexName.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return ApiResponse&lt;IndexSettings&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<IndexSettings> getSettingsWithHttpInfo(String indexName)
    throws ApiException {
    okhttp3.Call localVarCall = getSettingsValidateBeforeCall(indexName, null);
    Type localVarReturnType = new TypeToken<IndexSettings>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Retrieve settings of a given indexName.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call getSettingsAsync(
    String indexName,
    final ApiCallback<IndexSettings> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getSettingsValidateBeforeCall(
      indexName,
      _callback
    );
    Type localVarReturnType = new TypeToken<IndexSettings>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for getSynonym
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call getSynonymCall(
    String indexName,
    String objectID,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/synonyms/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = {};

    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "GET",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call getSynonymValidateBeforeCall(
    String indexName,
    String objectID,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling getSynonym(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new ApiException(
        "Missing the required parameter 'objectID' when calling getSynonym(Async)"
      );
    }

    okhttp3.Call localVarCall = getSynonymCall(indexName, objectID, _callback);
    return localVarCall;
  }

  /**
   * Get synonym. Fetch a synonym object identified by its objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @return SynonymHit
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public SynonymHit getSynonym(String indexName, String objectID)
    throws ApiException {
    ApiResponse<SynonymHit> localVarResp = getSynonymWithHttpInfo(
      indexName,
      objectID
    );
    return localVarResp.getData();
  }

  /**
   * Get synonym. Fetch a synonym object identified by its objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @return ApiResponse&lt;SynonymHit&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<SynonymHit> getSynonymWithHttpInfo(
    String indexName,
    String objectID
  ) throws ApiException {
    okhttp3.Call localVarCall = getSynonymValidateBeforeCall(
      indexName,
      objectID,
      null
    );
    Type localVarReturnType = new TypeToken<SynonymHit>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Get synonym. (asynchronously) Fetch a synonym object identified by its objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call getSynonymAsync(
    String indexName,
    String objectID,
    final ApiCallback<SynonymHit> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getSynonymValidateBeforeCall(
      indexName,
      objectID,
      _callback
    );
    Type localVarReturnType = new TypeToken<SynonymHit>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for listIndices
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call listIndicesCall(
    Integer page,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath = "/1/indexes";

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (page != null) {
      localVarQueryParams.addAll(this.parameterToPair("Page", page));
    }

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = {};

    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "GET",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call listIndicesValidateBeforeCall(
    Integer page,
    final ApiCallback _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = listIndicesCall(page, _callback);
    return localVarCall;
  }

  /**
   * List existing indexes. List existing indexes from an application.
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
   * @return ListIndicesResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ListIndicesResponse listIndices(Integer page) throws ApiException {
    ApiResponse<ListIndicesResponse> localVarResp = listIndicesWithHttpInfo(
      page
    );
    return localVarResp.getData();
  }

  /**
   * List existing indexes. List existing indexes from an application.
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
   * @return ApiResponse&lt;ListIndicesResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<ListIndicesResponse> listIndicesWithHttpInfo(Integer page)
    throws ApiException {
    okhttp3.Call localVarCall = listIndicesValidateBeforeCall(page, null);
    Type localVarReturnType = new TypeToken<ListIndicesResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * List existing indexes. (asynchronously) List existing indexes from an application.
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call listIndicesAsync(
    Integer page,
    final ApiCallback<ListIndicesResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = listIndicesValidateBeforeCall(page, _callback);
    Type localVarReturnType = new TypeToken<ListIndicesResponse>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for multipleQueries
   *
   * @param multipleQueriesObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call multipleQueriesCall(
    MultipleQueriesObject multipleQueriesObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = multipleQueriesObject;

    // create path and map variables
    String localVarPath = "/1/indexes/*/queries";

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = { "application/json" };
    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "POST",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call multipleQueriesValidateBeforeCall(
    MultipleQueriesObject multipleQueriesObject,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'multipleQueriesObject' is set
    if (multipleQueriesObject == null) {
      throw new ApiException(
        "Missing the required parameter 'multipleQueriesObject' when calling" +
        " multipleQueries(Async)"
      );
    }

    okhttp3.Call localVarCall = multipleQueriesCall(
      multipleQueriesObject,
      _callback
    );
    return localVarCall;
  }

  /**
   * Get search results for the given requests.
   *
   * @param multipleQueriesObject (required)
   * @return MultipleQueriesResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public MultipleQueriesResponse multipleQueries(
    MultipleQueriesObject multipleQueriesObject
  ) throws ApiException {
    ApiResponse<MultipleQueriesResponse> localVarResp = multipleQueriesWithHttpInfo(
      multipleQueriesObject
    );
    return localVarResp.getData();
  }

  /**
   * Get search results for the given requests.
   *
   * @param multipleQueriesObject (required)
   * @return ApiResponse&lt;MultipleQueriesResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<MultipleQueriesResponse> multipleQueriesWithHttpInfo(
    MultipleQueriesObject multipleQueriesObject
  ) throws ApiException {
    okhttp3.Call localVarCall = multipleQueriesValidateBeforeCall(
      multipleQueriesObject,
      null
    );
    Type localVarReturnType = new TypeToken<MultipleQueriesResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Get search results for the given requests.
   *
   * @param multipleQueriesObject (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call multipleQueriesAsync(
    MultipleQueriesObject multipleQueriesObject,
    final ApiCallback<MultipleQueriesResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = multipleQueriesValidateBeforeCall(
      multipleQueriesObject,
      _callback
    );
    Type localVarReturnType = new TypeToken<MultipleQueriesResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for operationIndex
   *
   * @param indexName The index in which to perform the request. (required)
   * @param operationIndexObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call operationIndexCall(
    String indexName,
    OperationIndexObject operationIndexObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = operationIndexObject;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/operation".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = { "application/json" };
    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "POST",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call operationIndexValidateBeforeCall(
    String indexName,
    OperationIndexObject operationIndexObject,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling operationIndex(Async)"
      );
    }

    // verify the required parameter 'operationIndexObject' is set
    if (operationIndexObject == null) {
      throw new ApiException(
        "Missing the required parameter 'operationIndexObject' when calling" +
        " operationIndex(Async)"
      );
    }

    okhttp3.Call localVarCall = operationIndexCall(
      indexName,
      operationIndexObject,
      _callback
    );
    return localVarCall;
  }

  /**
   * Copy/move index. Peforms a copy or a move operation on a index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param operationIndexObject (required)
   * @return OperationIndexResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public OperationIndexResponse operationIndex(
    String indexName,
    OperationIndexObject operationIndexObject
  ) throws ApiException {
    ApiResponse<OperationIndexResponse> localVarResp = operationIndexWithHttpInfo(
      indexName,
      operationIndexObject
    );
    return localVarResp.getData();
  }

  /**
   * Copy/move index. Peforms a copy or a move operation on a index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param operationIndexObject (required)
   * @return ApiResponse&lt;OperationIndexResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<OperationIndexResponse> operationIndexWithHttpInfo(
    String indexName,
    OperationIndexObject operationIndexObject
  ) throws ApiException {
    okhttp3.Call localVarCall = operationIndexValidateBeforeCall(
      indexName,
      operationIndexObject,
      null
    );
    Type localVarReturnType = new TypeToken<OperationIndexResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Copy/move index. (asynchronously) Peforms a copy or a move operation on a index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param operationIndexObject (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call operationIndexAsync(
    String indexName,
    OperationIndexObject operationIndexObject,
    final ApiCallback<OperationIndexResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = operationIndexValidateBeforeCall(
      indexName,
      operationIndexObject,
      _callback
    );
    Type localVarReturnType = new TypeToken<OperationIndexResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for saveObject
   *
   * @param indexName The index in which to perform the request. (required)
   * @param requestBody The Algolia object. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call saveObjectCall(
    String indexName,
    Map<String, Object> requestBody,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = requestBody;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = { "application/json" };
    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "POST",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call saveObjectValidateBeforeCall(
    String indexName,
    Map<String, Object> requestBody,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling saveObject(Async)"
      );
    }

    // verify the required parameter 'requestBody' is set
    if (requestBody == null) {
      throw new ApiException(
        "Missing the required parameter 'requestBody' when calling saveObject(Async)"
      );
    }

    okhttp3.Call localVarCall = saveObjectCall(
      indexName,
      requestBody,
      _callback
    );
    return localVarCall;
  }

  /**
   * Add an object to the index, automatically assigning it an object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param requestBody The Algolia object. (required)
   * @return SaveObjectResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public SaveObjectResponse saveObject(
    String indexName,
    Map<String, Object> requestBody
  ) throws ApiException {
    ApiResponse<SaveObjectResponse> localVarResp = saveObjectWithHttpInfo(
      indexName,
      requestBody
    );
    return localVarResp.getData();
  }

  /**
   * Add an object to the index, automatically assigning it an object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param requestBody The Algolia object. (required)
   * @return ApiResponse&lt;SaveObjectResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<SaveObjectResponse> saveObjectWithHttpInfo(
    String indexName,
    Map<String, Object> requestBody
  ) throws ApiException {
    okhttp3.Call localVarCall = saveObjectValidateBeforeCall(
      indexName,
      requestBody,
      null
    );
    Type localVarReturnType = new TypeToken<SaveObjectResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Add an object to the index, automatically assigning it an object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param requestBody The Algolia object. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call saveObjectAsync(
    String indexName,
    Map<String, Object> requestBody,
    final ApiCallback<SaveObjectResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = saveObjectValidateBeforeCall(
      indexName,
      requestBody,
      _callback
    );
    Type localVarReturnType = new TypeToken<SaveObjectResponse>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for saveSynonym
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call saveSynonymCall(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = synonymHit;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/synonyms/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (forwardToReplicas != null) {
      localVarQueryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = { "application/json" };
    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "PUT",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call saveSynonymValidateBeforeCall(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling saveSynonym(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new ApiException(
        "Missing the required parameter 'objectID' when calling saveSynonym(Async)"
      );
    }

    // verify the required parameter 'synonymHit' is set
    if (synonymHit == null) {
      throw new ApiException(
        "Missing the required parameter 'synonymHit' when calling saveSynonym(Async)"
      );
    }

    okhttp3.Call localVarCall = saveSynonymCall(
      indexName,
      objectID,
      synonymHit,
      forwardToReplicas,
      _callback
    );
    return localVarCall;
  }

  /**
   * Save synonym. Create a new synonym object or update the existing synonym object with the given
   * object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return SaveSynonymResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public SaveSynonymResponse saveSynonym(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas
  ) throws ApiException {
    ApiResponse<SaveSynonymResponse> localVarResp = saveSynonymWithHttpInfo(
      indexName,
      objectID,
      synonymHit,
      forwardToReplicas
    );
    return localVarResp.getData();
  }

  /**
   * Save synonym. Create a new synonym object or update the existing synonym object with the given
   * object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return ApiResponse&lt;SaveSynonymResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<SaveSynonymResponse> saveSynonymWithHttpInfo(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas
  ) throws ApiException {
    okhttp3.Call localVarCall = saveSynonymValidateBeforeCall(
      indexName,
      objectID,
      synonymHit,
      forwardToReplicas,
      null
    );
    Type localVarReturnType = new TypeToken<SaveSynonymResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Save synonym. (asynchronously) Create a new synonym object or update the existing synonym
   * object with the given object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call saveSynonymAsync(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas,
    final ApiCallback<SaveSynonymResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = saveSynonymValidateBeforeCall(
      indexName,
      objectID,
      synonymHit,
      forwardToReplicas,
      _callback
    );
    Type localVarReturnType = new TypeToken<SaveSynonymResponse>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for saveSynonyms
   *
   * @param indexName The index in which to perform the request. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param replaceExistingSynonyms Replace all synonyms of the index with the ones sent with this
   *     request. (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call saveSynonymsCall(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = synonymHit;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/synonyms/batch".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (forwardToReplicas != null) {
      localVarQueryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    if (replaceExistingSynonyms != null) {
      localVarQueryParams.addAll(
        this.parameterToPair("replaceExistingSynonyms", replaceExistingSynonyms)
      );
    }

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = { "application/json" };
    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "POST",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call saveSynonymsValidateBeforeCall(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling saveSynonyms(Async)"
      );
    }

    // verify the required parameter 'synonymHit' is set
    if (synonymHit == null) {
      throw new ApiException(
        "Missing the required parameter 'synonymHit' when calling saveSynonyms(Async)"
      );
    }

    okhttp3.Call localVarCall = saveSynonymsCall(
      indexName,
      synonymHit,
      forwardToReplicas,
      replaceExistingSynonyms,
      _callback
    );
    return localVarCall;
  }

  /**
   * Save a batch of synonyms. Create/update multiple synonym objects at once, potentially replacing
   * the entire list of synonyms if replaceExistingSynonyms is true.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param replaceExistingSynonyms Replace all synonyms of the index with the ones sent with this
   *     request. (optional)
   * @return SaveSynonymsResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public SaveSynonymsResponse saveSynonyms(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms
  ) throws ApiException {
    ApiResponse<SaveSynonymsResponse> localVarResp = saveSynonymsWithHttpInfo(
      indexName,
      synonymHit,
      forwardToReplicas,
      replaceExistingSynonyms
    );
    return localVarResp.getData();
  }

  /**
   * Save a batch of synonyms. Create/update multiple synonym objects at once, potentially replacing
   * the entire list of synonyms if replaceExistingSynonyms is true.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param replaceExistingSynonyms Replace all synonyms of the index with the ones sent with this
   *     request. (optional)
   * @return ApiResponse&lt;SaveSynonymsResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<SaveSynonymsResponse> saveSynonymsWithHttpInfo(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms
  ) throws ApiException {
    okhttp3.Call localVarCall = saveSynonymsValidateBeforeCall(
      indexName,
      synonymHit,
      forwardToReplicas,
      replaceExistingSynonyms,
      null
    );
    Type localVarReturnType = new TypeToken<SaveSynonymsResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Save a batch of synonyms. (asynchronously) Create/update multiple synonym objects at once,
   * potentially replacing the entire list of synonyms if replaceExistingSynonyms is true.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param replaceExistingSynonyms Replace all synonyms of the index with the ones sent with this
   *     request. (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call saveSynonymsAsync(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms,
    final ApiCallback<SaveSynonymsResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = saveSynonymsValidateBeforeCall(
      indexName,
      synonymHit,
      forwardToReplicas,
      replaceExistingSynonyms,
      _callback
    );
    Type localVarReturnType = new TypeToken<SaveSynonymsResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for search
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call searchCall(
    String indexName,
    SearchParams searchParams,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = searchParams;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/query".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = { "application/json" };
    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "POST",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call searchValidateBeforeCall(
    String indexName,
    SearchParams searchParams,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling search(Async)"
      );
    }

    // verify the required parameter 'searchParams' is set
    if (searchParams == null) {
      throw new ApiException(
        "Missing the required parameter 'searchParams' when calling search(Async)"
      );
    }

    okhttp3.Call localVarCall = searchCall(indexName, searchParams, _callback);
    return localVarCall;
  }

  /**
   * Get search results.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @return SearchResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public SearchResponse search(String indexName, SearchParams searchParams)
    throws ApiException {
    ApiResponse<SearchResponse> localVarResp = searchWithHttpInfo(
      indexName,
      searchParams
    );
    return localVarResp.getData();
  }

  /**
   * Get search results.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @return ApiResponse&lt;SearchResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<SearchResponse> searchWithHttpInfo(
    String indexName,
    SearchParams searchParams
  ) throws ApiException {
    okhttp3.Call localVarCall = searchValidateBeforeCall(
      indexName,
      searchParams,
      null
    );
    Type localVarReturnType = new TypeToken<SearchResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Get search results.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call searchAsync(
    String indexName,
    SearchParams searchParams,
    final ApiCallback<SearchResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = searchValidateBeforeCall(
      indexName,
      searchParams,
      _callback
    );
    Type localVarReturnType = new TypeToken<SearchResponse>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for searchSynonyms
   *
   * @param indexName The index in which to perform the request. (required)
   * @param query Search for specific synonyms matching this string. (optional, default to )
   * @param type Only search for specific types of synonyms. (optional)
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional, default to 0)
   * @param hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call searchSynonymsCall(
    String indexName,
    String query,
    String type,
    Integer page,
    Integer hitsPerPage,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/synonyms/search".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (query != null) {
      localVarQueryParams.addAll(this.parameterToPair("query", query));
    }

    if (type != null) {
      localVarQueryParams.addAll(this.parameterToPair("type", type));
    }

    if (page != null) {
      localVarQueryParams.addAll(this.parameterToPair("Page", page));
    }

    if (hitsPerPage != null) {
      localVarQueryParams.addAll(
        this.parameterToPair("hitsPerPage", hitsPerPage)
      );
    }

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = {};

    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "POST",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call searchSynonymsValidateBeforeCall(
    String indexName,
    String query,
    String type,
    Integer page,
    Integer hitsPerPage,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling searchSynonyms(Async)"
      );
    }

    okhttp3.Call localVarCall = searchSynonymsCall(
      indexName,
      query,
      type,
      page,
      hitsPerPage,
      _callback
    );
    return localVarCall;
  }

  /**
   * Get all synonyms that match a query. Search or browse all synonyms, optionally filtering them
   * by type.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param query Search for specific synonyms matching this string. (optional, default to )
   * @param type Only search for specific types of synonyms. (optional)
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional, default to 0)
   * @param hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
   * @return SearchSynonymsResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public SearchSynonymsResponse searchSynonyms(
    String indexName,
    String query,
    String type,
    Integer page,
    Integer hitsPerPage
  ) throws ApiException {
    ApiResponse<SearchSynonymsResponse> localVarResp = searchSynonymsWithHttpInfo(
      indexName,
      query,
      type,
      page,
      hitsPerPage
    );
    return localVarResp.getData();
  }

  /**
   * Get all synonyms that match a query. Search or browse all synonyms, optionally filtering them
   * by type.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param query Search for specific synonyms matching this string. (optional, default to )
   * @param type Only search for specific types of synonyms. (optional)
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional, default to 0)
   * @param hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
   * @return ApiResponse&lt;SearchSynonymsResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<SearchSynonymsResponse> searchSynonymsWithHttpInfo(
    String indexName,
    String query,
    String type,
    Integer page,
    Integer hitsPerPage
  ) throws ApiException {
    okhttp3.Call localVarCall = searchSynonymsValidateBeforeCall(
      indexName,
      query,
      type,
      page,
      hitsPerPage,
      null
    );
    Type localVarReturnType = new TypeToken<SearchSynonymsResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Get all synonyms that match a query. (asynchronously) Search or browse all synonyms, optionally
   * filtering them by type.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param query Search for specific synonyms matching this string. (optional, default to )
   * @param type Only search for specific types of synonyms. (optional)
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional, default to 0)
   * @param hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call searchSynonymsAsync(
    String indexName,
    String query,
    String type,
    Integer page,
    Integer hitsPerPage,
    final ApiCallback<SearchSynonymsResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = searchSynonymsValidateBeforeCall(
      indexName,
      query,
      type,
      page,
      hitsPerPage,
      _callback
    );
    Type localVarReturnType = new TypeToken<SearchSynonymsResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for setSettings
   *
   * @param indexName The index in which to perform the request. (required)
   * @param indexSettings (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call setSettingsCall(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = indexSettings;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/settings".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (forwardToReplicas != null) {
      localVarQueryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    final String[] localVarAccepts = { "application/json" };
    final String localVarAccept = this.selectHeaderAccept(localVarAccepts);
    if (localVarAccept != null) {
      localVarHeaderParams.put("Accept", localVarAccept);
    }

    final String[] localVarContentTypes = { "application/json" };
    final String localVarContentType =
      this.selectHeaderContentType(localVarContentTypes);
    localVarHeaderParams.put("Content-Type", localVarContentType);

    String[] localVarAuthNames = new String[] { "apiKey", "appId" };
    return this.buildCall(
        localVarPath,
        "PUT",
        localVarQueryParams,
        localVarCollectionQueryParams,
        localVarPostBody,
        localVarHeaderParams,
        localVarCookieParams,
        localVarFormParams,
        localVarAuthNames,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private okhttp3.Call setSettingsValidateBeforeCall(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling setSettings(Async)"
      );
    }

    // verify the required parameter 'indexSettings' is set
    if (indexSettings == null) {
      throw new ApiException(
        "Missing the required parameter 'indexSettings' when calling setSettings(Async)"
      );
    }

    okhttp3.Call localVarCall = setSettingsCall(
      indexName,
      indexSettings,
      forwardToReplicas,
      _callback
    );
    return localVarCall;
  }

  /**
   * Update settings of a given indexName. Only specified settings are overridden; unspecified
   * settings are left unchanged. Specifying null for a setting resets it to its default value.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param indexSettings (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return SetSettingsResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public SetSettingsResponse setSettings(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas
  ) throws ApiException {
    ApiResponse<SetSettingsResponse> localVarResp = setSettingsWithHttpInfo(
      indexName,
      indexSettings,
      forwardToReplicas
    );
    return localVarResp.getData();
  }

  /**
   * Update settings of a given indexName. Only specified settings are overridden; unspecified
   * settings are left unchanged. Specifying null for a setting resets it to its default value.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param indexSettings (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return ApiResponse&lt;SetSettingsResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<SetSettingsResponse> setSettingsWithHttpInfo(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas
  ) throws ApiException {
    okhttp3.Call localVarCall = setSettingsValidateBeforeCall(
      indexName,
      indexSettings,
      forwardToReplicas,
      null
    );
    Type localVarReturnType = new TypeToken<SetSettingsResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Update settings of a given indexName. Only specified settings are overridden;
   * unspecified settings are left unchanged. Specifying null for a setting resets it to its default
   * value.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param indexSettings (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * <tr><td> 400 </td><td> Bad request or request arguments. </td><td>  -  </td></tr>
   * <tr><td> 402 </td><td> This feature is not enabled on your Algolia account. </td><td>  -  </td></tr>
   * <tr><td> 403 </td><td> Method not allowed with this API key. </td><td>  -  </td></tr>
   * <tr><td> 404 </td><td> Index not found. </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call setSettingsAsync(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas,
    final ApiCallback<SetSettingsResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = setSettingsValidateBeforeCall(
      indexName,
      indexSettings,
      forwardToReplicas,
      _callback
    );
    Type localVarReturnType = new TypeToken<SetSettingsResponse>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }
}
