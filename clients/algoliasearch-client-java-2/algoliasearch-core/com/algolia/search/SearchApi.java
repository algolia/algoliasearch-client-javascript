package com.algolia.search;

import com.algolia.ApiCallback;
import com.algolia.ApiClient;
import com.algolia.ApiException;
import com.algolia.ApiResponse;
import com.algolia.Pair;
import com.algolia.model.AddApiKeyResponse;
import com.algolia.model.ApiKey;
import com.algolia.model.AppendSourceResponse;
import com.algolia.model.AssignUserIdObject;
import com.algolia.model.AssignUserIdResponse;
import com.algolia.model.BatchAssignUserIdsObject;
import com.algolia.model.BatchAssignUserIdsResponse;
import com.algolia.model.BatchObject;
import com.algolia.model.BatchResponse;
import com.algolia.model.ClearAllSynonymsResponse;
import com.algolia.model.DeleteApiKeyResponse;
import com.algolia.model.DeleteIndexResponse;
import com.algolia.model.DeleteSourceResponse;
import com.algolia.model.DeleteSynonymResponse;
import com.algolia.model.GetLogsResponse;
import com.algolia.model.GetTaskResponse;
import com.algolia.model.GetTopUserIdsResponse;
import com.algolia.model.HasPendingMappingsResponse;
import com.algolia.model.IndexSettings;
import com.algolia.model.KeyObject;
import com.algolia.model.ListApiKeysResponse;
import com.algolia.model.ListClustersResponse;
import com.algolia.model.ListIndicesResponse;
import com.algolia.model.ListUserIdsResponse;
import com.algolia.model.MultipleQueriesObject;
import com.algolia.model.MultipleQueriesResponse;
import com.algolia.model.OperationIndexObject;
import com.algolia.model.OperationIndexResponse;
import com.algolia.model.RemoveUserIdResponse;
import com.algolia.model.ReplaceSourceResponse;
import com.algolia.model.SaveObjectResponse;
import com.algolia.model.SaveSynonymResponse;
import com.algolia.model.SaveSynonymsResponse;
import com.algolia.model.SearchParams;
import com.algolia.model.SearchResponse;
import com.algolia.model.SearchSynonymsResponse;
import com.algolia.model.SearchUserIdsObject;
import com.algolia.model.SearchUserIdsResponse;
import com.algolia.model.SetSettingsResponse;
import com.algolia.model.Source;
import com.algolia.model.SynonymHit;
import com.algolia.model.UpdateApiKeyResponse;
import com.algolia.model.UserId;
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
   * Build call for addApiKey
   *
   * @param apiKey (required)
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
  public okhttp3.Call addApiKeyCall(ApiKey apiKey, final ApiCallback _callback)
    throws ApiException {
    Object localVarPostBody = apiKey;

    // create path and map variables
    String localVarPath = "/1/keys";

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
  private okhttp3.Call addApiKeyValidateBeforeCall(
    ApiKey apiKey,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'apiKey' is set
    if (apiKey == null) {
      throw new ApiException(
        "Missing the required parameter 'apiKey' when calling addApiKey(Async)"
      );
    }

    okhttp3.Call localVarCall = addApiKeyCall(apiKey, _callback);
    return localVarCall;
  }

  /**
   * Create a new API key. Add a new API Key with specific permissions/restrictions.
   *
   * @param apiKey (required)
   * @return AddApiKeyResponse
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
  public AddApiKeyResponse addApiKey(ApiKey apiKey) throws ApiException {
    ApiResponse<AddApiKeyResponse> localVarResp = addApiKeyWithHttpInfo(apiKey);
    return localVarResp.getData();
  }

  /**
   * Create a new API key. Add a new API Key with specific permissions/restrictions.
   *
   * @param apiKey (required)
   * @return ApiResponse&lt;AddApiKeyResponse&gt;
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
  public ApiResponse<AddApiKeyResponse> addApiKeyWithHttpInfo(ApiKey apiKey)
    throws ApiException {
    okhttp3.Call localVarCall = addApiKeyValidateBeforeCall(apiKey, null);
    Type localVarReturnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Create a new API key. (asynchronously) Add a new API Key with specific
   * permissions/restrictions.
   *
   * @param apiKey (required)
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
  public okhttp3.Call addApiKeyAsync(
    ApiKey apiKey,
    final ApiCallback<AddApiKeyResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = addApiKeyValidateBeforeCall(apiKey, _callback);
    Type localVarReturnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for appendSource
   *
   * @param source The source to add. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call appendSourceCall(
    Source source,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = source;

    // create path and map variables
    String localVarPath = "/1/security/sources/append";

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
  private okhttp3.Call appendSourceValidateBeforeCall(
    Source source,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'source' is set
    if (source == null) {
      throw new ApiException(
        "Missing the required parameter 'source' when calling appendSource(Async)"
      );
    }

    okhttp3.Call localVarCall = appendSourceCall(source, _callback);
    return localVarCall;
  }

  /**
   * Add a single source to the list of allowed sources.
   *
   * @param source The source to add. (required)
   * @return AppendSourceResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public AppendSourceResponse appendSource(Source source) throws ApiException {
    ApiResponse<AppendSourceResponse> localVarResp = appendSourceWithHttpInfo(
      source
    );
    return localVarResp.getData();
  }

  /**
   * Add a single source to the list of allowed sources.
   *
   * @param source The source to add. (required)
   * @return ApiResponse&lt;AppendSourceResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<AppendSourceResponse> appendSourceWithHttpInfo(
    Source source
  ) throws ApiException {
    okhttp3.Call localVarCall = appendSourceValidateBeforeCall(source, null);
    Type localVarReturnType = new TypeToken<AppendSourceResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Add a single source to the list of allowed sources.
   *
   * @param source The source to add. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call appendSourceAsync(
    Source source,
    final ApiCallback<AppendSourceResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = appendSourceValidateBeforeCall(
      source,
      _callback
    );
    Type localVarReturnType = new TypeToken<AppendSourceResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for assignUserId
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param assignUserIdObject (required)
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
  public okhttp3.Call assignUserIdCall(
    Object xAlgoliaUserID,
    AssignUserIdObject assignUserIdObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = assignUserIdObject;

    // create path and map variables
    String localVarPath = "/1/clusters/mapping";

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (xAlgoliaUserID != null) {
      localVarQueryParams.addAll(
        this.parameterToPair("X-Algolia-User-ID", xAlgoliaUserID)
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
  private okhttp3.Call assignUserIdValidateBeforeCall(
    Object xAlgoliaUserID,
    AssignUserIdObject assignUserIdObject,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'xAlgoliaUserID' is set
    if (xAlgoliaUserID == null) {
      throw new ApiException(
        "Missing the required parameter 'xAlgoliaUserID' when calling assignUserId(Async)"
      );
    }

    // verify the required parameter 'assignUserIdObject' is set
    if (assignUserIdObject == null) {
      throw new ApiException(
        "Missing the required parameter 'assignUserIdObject' when calling assignUserId(Async)"
      );
    }

    okhttp3.Call localVarCall = assignUserIdCall(
      xAlgoliaUserID,
      assignUserIdObject,
      _callback
    );
    return localVarCall;
  }

  /**
   * Assign or Move userID Assign or Move a userID to a cluster. The time it takes to migrate (move)
   * a user is proportional to the amount of data linked to the userID. Upon success, the response
   * is 200 OK. A successful response indicates that the operation has been taken into account, and
   * the userID is directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param assignUserIdObject (required)
   * @return AssignUserIdResponse
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
  public AssignUserIdResponse assignUserId(
    Object xAlgoliaUserID,
    AssignUserIdObject assignUserIdObject
  ) throws ApiException {
    ApiResponse<AssignUserIdResponse> localVarResp = assignUserIdWithHttpInfo(
      xAlgoliaUserID,
      assignUserIdObject
    );
    return localVarResp.getData();
  }

  /**
   * Assign or Move userID Assign or Move a userID to a cluster. The time it takes to migrate (move)
   * a user is proportional to the amount of data linked to the userID. Upon success, the response
   * is 200 OK. A successful response indicates that the operation has been taken into account, and
   * the userID is directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param assignUserIdObject (required)
   * @return ApiResponse&lt;AssignUserIdResponse&gt;
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
  public ApiResponse<AssignUserIdResponse> assignUserIdWithHttpInfo(
    Object xAlgoliaUserID,
    AssignUserIdObject assignUserIdObject
  ) throws ApiException {
    okhttp3.Call localVarCall = assignUserIdValidateBeforeCall(
      xAlgoliaUserID,
      assignUserIdObject,
      null
    );
    Type localVarReturnType = new TypeToken<AssignUserIdResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Assign or Move userID (asynchronously) Assign or Move a userID to a cluster. The time it takes
   * to migrate (move) a user is proportional to the amount of data linked to the userID. Upon
   * success, the response is 200 OK. A successful response indicates that the operation has been
   * taken into account, and the userID is directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param assignUserIdObject (required)
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
  public okhttp3.Call assignUserIdAsync(
    Object xAlgoliaUserID,
    AssignUserIdObject assignUserIdObject,
    final ApiCallback<AssignUserIdResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = assignUserIdValidateBeforeCall(
      xAlgoliaUserID,
      assignUserIdObject,
      _callback
    );
    Type localVarReturnType = new TypeToken<AssignUserIdResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
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
   * Build call for batchAssignUserIds
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param batchAssignUserIdsObject (required)
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
  public okhttp3.Call batchAssignUserIdsCall(
    Object xAlgoliaUserID,
    BatchAssignUserIdsObject batchAssignUserIdsObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = batchAssignUserIdsObject;

    // create path and map variables
    String localVarPath = "/1/clusters/mapping/batch";

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (xAlgoliaUserID != null) {
      localVarQueryParams.addAll(
        this.parameterToPair("X-Algolia-User-ID", xAlgoliaUserID)
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
  private okhttp3.Call batchAssignUserIdsValidateBeforeCall(
    Object xAlgoliaUserID,
    BatchAssignUserIdsObject batchAssignUserIdsObject,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'xAlgoliaUserID' is set
    if (xAlgoliaUserID == null) {
      throw new ApiException(
        "Missing the required parameter 'xAlgoliaUserID' when calling batchAssignUserIds(Async)"
      );
    }

    // verify the required parameter 'batchAssignUserIdsObject' is set
    if (batchAssignUserIdsObject == null) {
      throw new ApiException(
        "Missing the required parameter 'batchAssignUserIdsObject' when calling" +
        " batchAssignUserIds(Async)"
      );
    }

    okhttp3.Call localVarCall = batchAssignUserIdsCall(
      xAlgoliaUserID,
      batchAssignUserIdsObject,
      _callback
    );
    return localVarCall;
  }

  /**
   * Batch assign userIDs Assign multiple userIDs to a cluster. Upon success, the response is 200
   * OK. A successful response indicates that the operation has been taken into account, and the
   * userIDs are directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param batchAssignUserIdsObject (required)
   * @return BatchAssignUserIdsResponse
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
  public BatchAssignUserIdsResponse batchAssignUserIds(
    Object xAlgoliaUserID,
    BatchAssignUserIdsObject batchAssignUserIdsObject
  ) throws ApiException {
    ApiResponse<BatchAssignUserIdsResponse> localVarResp = batchAssignUserIdsWithHttpInfo(
      xAlgoliaUserID,
      batchAssignUserIdsObject
    );
    return localVarResp.getData();
  }

  /**
   * Batch assign userIDs Assign multiple userIDs to a cluster. Upon success, the response is 200
   * OK. A successful response indicates that the operation has been taken into account, and the
   * userIDs are directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param batchAssignUserIdsObject (required)
   * @return ApiResponse&lt;BatchAssignUserIdsResponse&gt;
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
  public ApiResponse<BatchAssignUserIdsResponse> batchAssignUserIdsWithHttpInfo(
    Object xAlgoliaUserID,
    BatchAssignUserIdsObject batchAssignUserIdsObject
  ) throws ApiException {
    okhttp3.Call localVarCall = batchAssignUserIdsValidateBeforeCall(
      xAlgoliaUserID,
      batchAssignUserIdsObject,
      null
    );
    Type localVarReturnType = new TypeToken<BatchAssignUserIdsResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Batch assign userIDs (asynchronously) Assign multiple userIDs to a cluster. Upon success, the
   * response is 200 OK. A successful response indicates that the operation has been taken into
   * account, and the userIDs are directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param batchAssignUserIdsObject (required)
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
  public okhttp3.Call batchAssignUserIdsAsync(
    Object xAlgoliaUserID,
    BatchAssignUserIdsObject batchAssignUserIdsObject,
    final ApiCallback<BatchAssignUserIdsResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = batchAssignUserIdsValidateBeforeCall(
      xAlgoliaUserID,
      batchAssignUserIdsObject,
      _callback
    );
    Type localVarReturnType = new TypeToken<BatchAssignUserIdsResponse>() {}
      .getType();
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
   * Build call for deleteApiKey
   *
   * @param key API Key string. (required)
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
  public okhttp3.Call deleteApiKeyCall(String key, final ApiCallback _callback)
    throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/keys/{key}".replaceAll(
          "\\{" + "key" + "\\}",
          this.escapeString(key.toString())
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
  private okhttp3.Call deleteApiKeyValidateBeforeCall(
    String key,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new ApiException(
        "Missing the required parameter 'key' when calling deleteApiKey(Async)"
      );
    }

    okhttp3.Call localVarCall = deleteApiKeyCall(key, _callback);
    return localVarCall;
  }

  /**
   * Delete an API key. Delete an existing API Key.
   *
   * @param key API Key string. (required)
   * @return DeleteApiKeyResponse
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
  public DeleteApiKeyResponse deleteApiKey(String key) throws ApiException {
    ApiResponse<DeleteApiKeyResponse> localVarResp = deleteApiKeyWithHttpInfo(
      key
    );
    return localVarResp.getData();
  }

  /**
   * Delete an API key. Delete an existing API Key.
   *
   * @param key API Key string. (required)
   * @return ApiResponse&lt;DeleteApiKeyResponse&gt;
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
  public ApiResponse<DeleteApiKeyResponse> deleteApiKeyWithHttpInfo(String key)
    throws ApiException {
    okhttp3.Call localVarCall = deleteApiKeyValidateBeforeCall(key, null);
    Type localVarReturnType = new TypeToken<DeleteApiKeyResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Delete an API key. (asynchronously) Delete an existing API Key.
   *
   * @param key API Key string. (required)
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
  public okhttp3.Call deleteApiKeyAsync(
    String key,
    final ApiCallback<DeleteApiKeyResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = deleteApiKeyValidateBeforeCall(key, _callback);
    Type localVarReturnType = new TypeToken<DeleteApiKeyResponse>() {}
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
   * Build call for deleteSource
   *
   * @param source The IP range of the source. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call deleteSourceCall(
    String source,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/security/sources/{source}".replaceAll(
          "\\{" + "source" + "\\}",
          this.escapeString(source.toString())
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
  private okhttp3.Call deleteSourceValidateBeforeCall(
    String source,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'source' is set
    if (source == null) {
      throw new ApiException(
        "Missing the required parameter 'source' when calling deleteSource(Async)"
      );
    }

    okhttp3.Call localVarCall = deleteSourceCall(source, _callback);
    return localVarCall;
  }

  /**
   * Remove a single source from the list of allowed sources.
   *
   * @param source The IP range of the source. (required)
   * @return DeleteSourceResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public DeleteSourceResponse deleteSource(String source) throws ApiException {
    ApiResponse<DeleteSourceResponse> localVarResp = deleteSourceWithHttpInfo(
      source
    );
    return localVarResp.getData();
  }

  /**
   * Remove a single source from the list of allowed sources.
   *
   * @param source The IP range of the source. (required)
   * @return ApiResponse&lt;DeleteSourceResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<DeleteSourceResponse> deleteSourceWithHttpInfo(
    String source
  ) throws ApiException {
    okhttp3.Call localVarCall = deleteSourceValidateBeforeCall(source, null);
    Type localVarReturnType = new TypeToken<DeleteSourceResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Remove a single source from the list of allowed sources.
   *
   * @param source The IP range of the source. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call deleteSourceAsync(
    String source,
    final ApiCallback<DeleteSourceResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = deleteSourceValidateBeforeCall(
      source,
      _callback
    );
    Type localVarReturnType = new TypeToken<DeleteSourceResponse>() {}
      .getType();
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
   * Build call for getApiKey
   *
   * @param key API Key string. (required)
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
  public okhttp3.Call getApiKeyCall(String key, final ApiCallback _callback)
    throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/keys/{key}".replaceAll(
          "\\{" + "key" + "\\}",
          this.escapeString(key.toString())
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
  private okhttp3.Call getApiKeyValidateBeforeCall(
    String key,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new ApiException(
        "Missing the required parameter 'key' when calling getApiKey(Async)"
      );
    }

    okhttp3.Call localVarCall = getApiKeyCall(key, _callback);
    return localVarCall;
  }

  /**
   * Get an API key. Get the permissions of an API key.
   *
   * @param key API Key string. (required)
   * @return KeyObject
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
  public KeyObject getApiKey(String key) throws ApiException {
    ApiResponse<KeyObject> localVarResp = getApiKeyWithHttpInfo(key);
    return localVarResp.getData();
  }

  /**
   * Get an API key. Get the permissions of an API key.
   *
   * @param key API Key string. (required)
   * @return ApiResponse&lt;KeyObject&gt;
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
  public ApiResponse<KeyObject> getApiKeyWithHttpInfo(String key)
    throws ApiException {
    okhttp3.Call localVarCall = getApiKeyValidateBeforeCall(key, null);
    Type localVarReturnType = new TypeToken<KeyObject>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Get an API key. (asynchronously) Get the permissions of an API key.
   *
   * @param key API Key string. (required)
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
  public okhttp3.Call getApiKeyAsync(
    String key,
    final ApiCallback<KeyObject> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getApiKeyValidateBeforeCall(key, _callback);
    Type localVarReturnType = new TypeToken<KeyObject>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for getLogs
   *
   * @param offset First entry to retrieve (zero-based). Log entries are sorted by decreasing date,
   *     therefore 0 designates the most recent log entry. (optional, default to 0)
   * @param length Maximum number of entries to retrieve. The maximum allowed value is 1000.
   *     (optional, default to 10)
   * @param indexName Index for which log entries should be retrieved. When omitted, log entries are
   *     retrieved across all indices. (optional)
   * @param type Type of log entries to retrieve. When omitted, all log entries are retrieved.
   *     (optional, default to all)
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
  public okhttp3.Call getLogsCall(
    Integer offset,
    Integer length,
    String indexName,
    String type,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath = "/1/logs";

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (offset != null) {
      localVarQueryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (length != null) {
      localVarQueryParams.addAll(this.parameterToPair("length", length));
    }

    if (indexName != null) {
      localVarQueryParams.addAll(this.parameterToPair("indexName", indexName));
    }

    if (type != null) {
      localVarQueryParams.addAll(this.parameterToPair("type", type));
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
  private okhttp3.Call getLogsValidateBeforeCall(
    Integer offset,
    Integer length,
    String indexName,
    String type,
    final ApiCallback _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getLogsCall(
      offset,
      length,
      indexName,
      type,
      _callback
    );
    return localVarCall;
  }

  /**
   * Return the lastest log entries.
   *
   * @param offset First entry to retrieve (zero-based). Log entries are sorted by decreasing date,
   *     therefore 0 designates the most recent log entry. (optional, default to 0)
   * @param length Maximum number of entries to retrieve. The maximum allowed value is 1000.
   *     (optional, default to 10)
   * @param indexName Index for which log entries should be retrieved. When omitted, log entries are
   *     retrieved across all indices. (optional)
   * @param type Type of log entries to retrieve. When omitted, all log entries are retrieved.
   *     (optional, default to all)
   * @return GetLogsResponse
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
  public GetLogsResponse getLogs(
    Integer offset,
    Integer length,
    String indexName,
    String type
  ) throws ApiException {
    ApiResponse<GetLogsResponse> localVarResp = getLogsWithHttpInfo(
      offset,
      length,
      indexName,
      type
    );
    return localVarResp.getData();
  }

  /**
   * Return the lastest log entries.
   *
   * @param offset First entry to retrieve (zero-based). Log entries are sorted by decreasing date,
   *     therefore 0 designates the most recent log entry. (optional, default to 0)
   * @param length Maximum number of entries to retrieve. The maximum allowed value is 1000.
   *     (optional, default to 10)
   * @param indexName Index for which log entries should be retrieved. When omitted, log entries are
   *     retrieved across all indices. (optional)
   * @param type Type of log entries to retrieve. When omitted, all log entries are retrieved.
   *     (optional, default to all)
   * @return ApiResponse&lt;GetLogsResponse&gt;
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
  public ApiResponse<GetLogsResponse> getLogsWithHttpInfo(
    Integer offset,
    Integer length,
    String indexName,
    String type
  ) throws ApiException {
    okhttp3.Call localVarCall = getLogsValidateBeforeCall(
      offset,
      length,
      indexName,
      type,
      null
    );
    Type localVarReturnType = new TypeToken<GetLogsResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Return the lastest log entries.
   *
   * @param offset First entry to retrieve (zero-based). Log entries are sorted by decreasing date,
   *     therefore 0 designates the most recent log entry. (optional, default to 0)
   * @param length Maximum number of entries to retrieve. The maximum allowed value is 1000.
   *     (optional, default to 10)
   * @param indexName Index for which log entries should be retrieved. When omitted, log entries are
   *     retrieved across all indices. (optional)
   * @param type Type of log entries to retrieve. When omitted, all log entries are retrieved.
   *     (optional, default to all)
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
  public okhttp3.Call getLogsAsync(
    Integer offset,
    Integer length,
    String indexName,
    String type,
    final ApiCallback<GetLogsResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getLogsValidateBeforeCall(
      offset,
      length,
      indexName,
      type,
      _callback
    );
    Type localVarReturnType = new TypeToken<GetLogsResponse>() {}.getType();
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
   * Build call for getSources
   *
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call getSourcesCall(final ApiCallback _callback)
    throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath = "/1/security/sources";

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
  private okhttp3.Call getSourcesValidateBeforeCall(
    final ApiCallback _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getSourcesCall(_callback);
    return localVarCall;
  }

  /**
   * List all allowed sources.
   *
   * @return List&lt;Source&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public List<Source> getSources() throws ApiException {
    ApiResponse<List<Source>> localVarResp = getSourcesWithHttpInfo();
    return localVarResp.getData();
  }

  /**
   * List all allowed sources.
   *
   * @return ApiResponse&lt;List&lt;Source&gt;&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<List<Source>> getSourcesWithHttpInfo()
    throws ApiException {
    okhttp3.Call localVarCall = getSourcesValidateBeforeCall(null);
    Type localVarReturnType = new TypeToken<List<Source>>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) List all allowed sources.
   *
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call getSourcesAsync(
    final ApiCallback<List<Source>> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getSourcesValidateBeforeCall(_callback);
    Type localVarReturnType = new TypeToken<List<Source>>() {}.getType();
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
   * Build call for getTask
   *
   * @param indexName The index in which to perform the request. (required)
   * @param taskID Unique identifier of an task. Numeric value (up to 64bits) (required)
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
  public okhttp3.Call getTaskCall(
    String indexName,
    Integer taskID,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/indexes/{indexName}/task/{taskID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "taskID" + "\\}",
          this.escapeString(taskID.toString())
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
  private okhttp3.Call getTaskValidateBeforeCall(
    String indexName,
    Integer taskID,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling getTask(Async)"
      );
    }

    // verify the required parameter 'taskID' is set
    if (taskID == null) {
      throw new ApiException(
        "Missing the required parameter 'taskID' when calling getTask(Async)"
      );
    }

    okhttp3.Call localVarCall = getTaskCall(indexName, taskID, _callback);
    return localVarCall;
  }

  /**
   * Check the current status of a given task.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param taskID Unique identifier of an task. Numeric value (up to 64bits) (required)
   * @return GetTaskResponse
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
  public GetTaskResponse getTask(String indexName, Integer taskID)
    throws ApiException {
    ApiResponse<GetTaskResponse> localVarResp = getTaskWithHttpInfo(
      indexName,
      taskID
    );
    return localVarResp.getData();
  }

  /**
   * Check the current status of a given task.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param taskID Unique identifier of an task. Numeric value (up to 64bits) (required)
   * @return ApiResponse&lt;GetTaskResponse&gt;
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
  public ApiResponse<GetTaskResponse> getTaskWithHttpInfo(
    String indexName,
    Integer taskID
  ) throws ApiException {
    okhttp3.Call localVarCall = getTaskValidateBeforeCall(
      indexName,
      taskID,
      null
    );
    Type localVarReturnType = new TypeToken<GetTaskResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Check the current status of a given task.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param taskID Unique identifier of an task. Numeric value (up to 64bits) (required)
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
  public okhttp3.Call getTaskAsync(
    String indexName,
    Integer taskID,
    final ApiCallback<GetTaskResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getTaskValidateBeforeCall(
      indexName,
      taskID,
      _callback
    );
    Type localVarReturnType = new TypeToken<GetTaskResponse>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for getTopUserIds
   *
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
  public okhttp3.Call getTopUserIdsCall(final ApiCallback _callback)
    throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath = "/1/clusters/mapping/top";

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
  private okhttp3.Call getTopUserIdsValidateBeforeCall(
    final ApiCallback _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getTopUserIdsCall(_callback);
    return localVarCall;
  }

  /**
   * Get top userID Get the top 10 userIDs with the highest number of records per cluster. The data
   * returned will usually be a few seconds behind real time, because userID usage may take up to a
   * few seconds to propagate to the different clusters. Upon success, the response is 200 OK and
   * contains the following array of userIDs and clusters.
   *
   * @return GetTopUserIdsResponse
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
  public GetTopUserIdsResponse getTopUserIds() throws ApiException {
    ApiResponse<GetTopUserIdsResponse> localVarResp = getTopUserIdsWithHttpInfo();
    return localVarResp.getData();
  }

  /**
   * Get top userID Get the top 10 userIDs with the highest number of records per cluster. The data
   * returned will usually be a few seconds behind real time, because userID usage may take up to a
   * few seconds to propagate to the different clusters. Upon success, the response is 200 OK and
   * contains the following array of userIDs and clusters.
   *
   * @return ApiResponse&lt;GetTopUserIdsResponse&gt;
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
  public ApiResponse<GetTopUserIdsResponse> getTopUserIdsWithHttpInfo()
    throws ApiException {
    okhttp3.Call localVarCall = getTopUserIdsValidateBeforeCall(null);
    Type localVarReturnType = new TypeToken<GetTopUserIdsResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Get top userID (asynchronously) Get the top 10 userIDs with the highest number of records per
   * cluster. The data returned will usually be a few seconds behind real time, because userID usage
   * may take up to a few seconds to propagate to the different clusters. Upon success, the response
   * is 200 OK and contains the following array of userIDs and clusters.
   *
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
  public okhttp3.Call getTopUserIdsAsync(
    final ApiCallback<GetTopUserIdsResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getTopUserIdsValidateBeforeCall(_callback);
    Type localVarReturnType = new TypeToken<GetTopUserIdsResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for getUserId
   *
   * @param userID userID to assign. (required)
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
  public okhttp3.Call getUserIdCall(Object userID, final ApiCallback _callback)
    throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/clusters/mapping/{userID}".replaceAll(
          "\\{" + "userID" + "\\}",
          this.escapeString(userID.toString())
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
  private okhttp3.Call getUserIdValidateBeforeCall(
    Object userID,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'userID' is set
    if (userID == null) {
      throw new ApiException(
        "Missing the required parameter 'userID' when calling getUserId(Async)"
      );
    }

    okhttp3.Call localVarCall = getUserIdCall(userID, _callback);
    return localVarCall;
  }

  /**
   * Get userID Returns the userID data stored in the mapping. The data returned will usually be a
   * few seconds behind real time, because userID usage may take up to a few seconds to propagate to
   * the different clusters. Upon success, the response is 200 OK and contains the following userID
   * data.
   *
   * @param userID userID to assign. (required)
   * @return UserId
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
  public UserId getUserId(Object userID) throws ApiException {
    ApiResponse<UserId> localVarResp = getUserIdWithHttpInfo(userID);
    return localVarResp.getData();
  }

  /**
   * Get userID Returns the userID data stored in the mapping. The data returned will usually be a
   * few seconds behind real time, because userID usage may take up to a few seconds to propagate to
   * the different clusters. Upon success, the response is 200 OK and contains the following userID
   * data.
   *
   * @param userID userID to assign. (required)
   * @return ApiResponse&lt;UserId&gt;
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
  public ApiResponse<UserId> getUserIdWithHttpInfo(Object userID)
    throws ApiException {
    okhttp3.Call localVarCall = getUserIdValidateBeforeCall(userID, null);
    Type localVarReturnType = new TypeToken<UserId>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Get userID (asynchronously) Returns the userID data stored in the mapping. The data returned
   * will usually be a few seconds behind real time, because userID usage may take up to a few
   * seconds to propagate to the different clusters. Upon success, the response is 200 OK and
   * contains the following userID data.
   *
   * @param userID userID to assign. (required)
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
  public okhttp3.Call getUserIdAsync(
    Object userID,
    final ApiCallback<UserId> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = getUserIdValidateBeforeCall(userID, _callback);
    Type localVarReturnType = new TypeToken<UserId>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for hasPendingMappings
   *
   * @param getClusters (optional)
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
  public okhttp3.Call hasPendingMappingsCall(
    Boolean getClusters,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath = "/1/clusters/mapping/pending";

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

    if (getClusters != null) {
      localVarQueryParams.addAll(
        this.parameterToPair("getClusters", getClusters)
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
  private okhttp3.Call hasPendingMappingsValidateBeforeCall(
    Boolean getClusters,
    final ApiCallback _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = hasPendingMappingsCall(getClusters, _callback);
    return localVarCall;
  }

  /**
   * Has pending mappings Get the status of your clusters’ migrations or user creations. Creating a
   * large batch of users or migrating your multi-cluster may take quite some time. This method lets
   * you retrieve the status of the migration, so you can know when it’s done. Upon success, the
   * response is 200 OK. A successful response indicates that the operation has been taken into
   * account, and the userIDs are directly usable.
   *
   * @param getClusters (optional)
   * @return HasPendingMappingsResponse
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
  public HasPendingMappingsResponse hasPendingMappings(Boolean getClusters)
    throws ApiException {
    ApiResponse<HasPendingMappingsResponse> localVarResp = hasPendingMappingsWithHttpInfo(
      getClusters
    );
    return localVarResp.getData();
  }

  /**
   * Has pending mappings Get the status of your clusters’ migrations or user creations. Creating a
   * large batch of users or migrating your multi-cluster may take quite some time. This method lets
   * you retrieve the status of the migration, so you can know when it’s done. Upon success, the
   * response is 200 OK. A successful response indicates that the operation has been taken into
   * account, and the userIDs are directly usable.
   *
   * @param getClusters (optional)
   * @return ApiResponse&lt;HasPendingMappingsResponse&gt;
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
  public ApiResponse<HasPendingMappingsResponse> hasPendingMappingsWithHttpInfo(
    Boolean getClusters
  ) throws ApiException {
    okhttp3.Call localVarCall = hasPendingMappingsValidateBeforeCall(
      getClusters,
      null
    );
    Type localVarReturnType = new TypeToken<HasPendingMappingsResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Has pending mappings (asynchronously) Get the status of your clusters’ migrations or user
   * creations. Creating a large batch of users or migrating your multi-cluster may take quite some
   * time. This method lets you retrieve the status of the migration, so you can know when it’s
   * done. Upon success, the response is 200 OK. A successful response indicates that the operation
   * has been taken into account, and the userIDs are directly usable.
   *
   * @param getClusters (optional)
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
  public okhttp3.Call hasPendingMappingsAsync(
    Boolean getClusters,
    final ApiCallback<HasPendingMappingsResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = hasPendingMappingsValidateBeforeCall(
      getClusters,
      _callback
    );
    Type localVarReturnType = new TypeToken<HasPendingMappingsResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for listApiKeys
   *
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
  public okhttp3.Call listApiKeysCall(final ApiCallback _callback)
    throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath = "/1/keys";

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
  private okhttp3.Call listApiKeysValidateBeforeCall(
    final ApiCallback _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = listApiKeysCall(_callback);
    return localVarCall;
  }

  /**
   * Get the full list of API Keys. List API keys, along with their associated rights.
   *
   * @return ListApiKeysResponse
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
  public ListApiKeysResponse listApiKeys() throws ApiException {
    ApiResponse<ListApiKeysResponse> localVarResp = listApiKeysWithHttpInfo();
    return localVarResp.getData();
  }

  /**
   * Get the full list of API Keys. List API keys, along with their associated rights.
   *
   * @return ApiResponse&lt;ListApiKeysResponse&gt;
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
  public ApiResponse<ListApiKeysResponse> listApiKeysWithHttpInfo()
    throws ApiException {
    okhttp3.Call localVarCall = listApiKeysValidateBeforeCall(null);
    Type localVarReturnType = new TypeToken<ListApiKeysResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Get the full list of API Keys. (asynchronously) List API keys, along with their associated
   * rights.
   *
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
  public okhttp3.Call listApiKeysAsync(
    final ApiCallback<ListApiKeysResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = listApiKeysValidateBeforeCall(_callback);
    Type localVarReturnType = new TypeToken<ListApiKeysResponse>() {}.getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for listClusters
   *
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
  public okhttp3.Call listClustersCall(final ApiCallback _callback)
    throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath = "/1/clusters";

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
  private okhttp3.Call listClustersValidateBeforeCall(
    final ApiCallback _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = listClustersCall(_callback);
    return localVarCall;
  }

  /**
   * List clusters List the clusters available in a multi-clusters setup for a single appID. Upon
   * success, the response is 200 OK and contains the following clusters.
   *
   * @return ListClustersResponse
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
  public ListClustersResponse listClusters() throws ApiException {
    ApiResponse<ListClustersResponse> localVarResp = listClustersWithHttpInfo();
    return localVarResp.getData();
  }

  /**
   * List clusters List the clusters available in a multi-clusters setup for a single appID. Upon
   * success, the response is 200 OK and contains the following clusters.
   *
   * @return ApiResponse&lt;ListClustersResponse&gt;
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
  public ApiResponse<ListClustersResponse> listClustersWithHttpInfo()
    throws ApiException {
    okhttp3.Call localVarCall = listClustersValidateBeforeCall(null);
    Type localVarReturnType = new TypeToken<ListClustersResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * List clusters (asynchronously) List the clusters available in a multi-clusters setup for a
   * single appID. Upon success, the response is 200 OK and contains the following clusters.
   *
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
  public okhttp3.Call listClustersAsync(
    final ApiCallback<ListClustersResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = listClustersValidateBeforeCall(_callback);
    Type localVarReturnType = new TypeToken<ListClustersResponse>() {}
      .getType();
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
   * Build call for listUserIds
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
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
  public okhttp3.Call listUserIdsCall(
    Integer page,
    Integer hitsPerPage,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath = "/1/clusters/mapping";

    List<Pair> localVarQueryParams = new ArrayList<Pair>();
    List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
    Map<String, String> localVarHeaderParams = new HashMap<String, String>();
    Map<String, String> localVarCookieParams = new HashMap<String, String>();
    Map<String, Object> localVarFormParams = new HashMap<String, Object>();

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
  private okhttp3.Call listUserIdsValidateBeforeCall(
    Integer page,
    Integer hitsPerPage,
    final ApiCallback _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = listUserIdsCall(page, hitsPerPage, _callback);
    return localVarCall;
  }

  /**
   * List userIDs List the userIDs assigned to a multi-clusters appID. The data returned will
   * usually be a few seconds behind real time, because userID usage may take up to a few seconds to
   * propagate to the different clusters. Upon success, the response is 200 OK and contains the
   * following userIDs data.
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
   * @param hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
   * @return ListUserIdsResponse
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
  public ListUserIdsResponse listUserIds(Integer page, Integer hitsPerPage)
    throws ApiException {
    ApiResponse<ListUserIdsResponse> localVarResp = listUserIdsWithHttpInfo(
      page,
      hitsPerPage
    );
    return localVarResp.getData();
  }

  /**
   * List userIDs List the userIDs assigned to a multi-clusters appID. The data returned will
   * usually be a few seconds behind real time, because userID usage may take up to a few seconds to
   * propagate to the different clusters. Upon success, the response is 200 OK and contains the
   * following userIDs data.
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
   * @param hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
   * @return ApiResponse&lt;ListUserIdsResponse&gt;
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
  public ApiResponse<ListUserIdsResponse> listUserIdsWithHttpInfo(
    Integer page,
    Integer hitsPerPage
  ) throws ApiException {
    okhttp3.Call localVarCall = listUserIdsValidateBeforeCall(
      page,
      hitsPerPage,
      null
    );
    Type localVarReturnType = new TypeToken<ListUserIdsResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * List userIDs (asynchronously) List the userIDs assigned to a multi-clusters appID. The data
   * returned will usually be a few seconds behind real time, because userID usage may take up to a
   * few seconds to propagate to the different clusters. Upon success, the response is 200 OK and
   * contains the following userIDs data.
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
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
  public okhttp3.Call listUserIdsAsync(
    Integer page,
    Integer hitsPerPage,
    final ApiCallback<ListUserIdsResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = listUserIdsValidateBeforeCall(
      page,
      hitsPerPage,
      _callback
    );
    Type localVarReturnType = new TypeToken<ListUserIdsResponse>() {}.getType();
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
   * Build call for removeUserId
   *
   * @param userID userID to assign. (required)
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
  public okhttp3.Call removeUserIdCall(
    Object userID,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/clusters/mapping/{userID}".replaceAll(
          "\\{" + "userID" + "\\}",
          this.escapeString(userID.toString())
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
  private okhttp3.Call removeUserIdValidateBeforeCall(
    Object userID,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'userID' is set
    if (userID == null) {
      throw new ApiException(
        "Missing the required parameter 'userID' when calling removeUserId(Async)"
      );
    }

    okhttp3.Call localVarCall = removeUserIdCall(userID, _callback);
    return localVarCall;
  }

  /**
   * Remove userID Remove a userID and its associated data from the multi-clusters. Upon success,
   * the response is 200 OK and a task is created to remove the userID data and mapping.
   *
   * @param userID userID to assign. (required)
   * @return RemoveUserIdResponse
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
  public RemoveUserIdResponse removeUserId(Object userID) throws ApiException {
    ApiResponse<RemoveUserIdResponse> localVarResp = removeUserIdWithHttpInfo(
      userID
    );
    return localVarResp.getData();
  }

  /**
   * Remove userID Remove a userID and its associated data from the multi-clusters. Upon success,
   * the response is 200 OK and a task is created to remove the userID data and mapping.
   *
   * @param userID userID to assign. (required)
   * @return ApiResponse&lt;RemoveUserIdResponse&gt;
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
  public ApiResponse<RemoveUserIdResponse> removeUserIdWithHttpInfo(
    Object userID
  ) throws ApiException {
    okhttp3.Call localVarCall = removeUserIdValidateBeforeCall(userID, null);
    Type localVarReturnType = new TypeToken<RemoveUserIdResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Remove userID (asynchronously) Remove a userID and its associated data from the multi-clusters.
   * Upon success, the response is 200 OK and a task is created to remove the userID data and
   * mapping.
   *
   * @param userID userID to assign. (required)
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
  public okhttp3.Call removeUserIdAsync(
    Object userID,
    final ApiCallback<RemoveUserIdResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = removeUserIdValidateBeforeCall(
      userID,
      _callback
    );
    Type localVarReturnType = new TypeToken<RemoveUserIdResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for replaceSources
   *
   * @param source The sources to allow. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call replaceSourcesCall(
    List<Source> source,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = source;

    // create path and map variables
    String localVarPath = "/1/security/sources";

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
  private okhttp3.Call replaceSourcesValidateBeforeCall(
    List<Source> source,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'source' is set
    if (source == null) {
      throw new ApiException(
        "Missing the required parameter 'source' when calling replaceSources(Async)"
      );
    }

    okhttp3.Call localVarCall = replaceSourcesCall(source, _callback);
    return localVarCall;
  }

  /**
   * Replace all allowed sources.
   *
   * @param source The sources to allow. (required)
   * @return ReplaceSourceResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public ReplaceSourceResponse replaceSources(List<Source> source)
    throws ApiException {
    ApiResponse<ReplaceSourceResponse> localVarResp = replaceSourcesWithHttpInfo(
      source
    );
    return localVarResp.getData();
  }

  /**
   * Replace all allowed sources.
   *
   * @param source The sources to allow. (required)
   * @return ApiResponse&lt;ReplaceSourceResponse&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public ApiResponse<ReplaceSourceResponse> replaceSourcesWithHttpInfo(
    List<Source> source
  ) throws ApiException {
    okhttp3.Call localVarCall = replaceSourcesValidateBeforeCall(source, null);
    Type localVarReturnType = new TypeToken<ReplaceSourceResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * (asynchronously) Replace all allowed sources.
   *
   * @param source The sources to allow. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   * @http.response.details
   *     <table summary="Response Details" border="1">
   * <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
   * <tr><td> 200 </td><td> OK </td><td>  -  </td></tr>
   * </table>
   */
  public okhttp3.Call replaceSourcesAsync(
    List<Source> source,
    final ApiCallback<ReplaceSourceResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = replaceSourcesValidateBeforeCall(
      source,
      _callback
    );
    Type localVarReturnType = new TypeToken<ReplaceSourceResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }

  /**
   * Build call for restoreApiKey
   *
   * @param key API Key string. (required)
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
  public okhttp3.Call restoreApiKeyCall(
    String key,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = null;

    // create path and map variables
    String localVarPath =
      "/1/keys/{key}/restore".replaceAll(
          "\\{" + "key" + "\\}",
          this.escapeString(key.toString())
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
  private okhttp3.Call restoreApiKeyValidateBeforeCall(
    String key,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new ApiException(
        "Missing the required parameter 'key' when calling restoreApiKey(Async)"
      );
    }

    okhttp3.Call localVarCall = restoreApiKeyCall(key, _callback);
    return localVarCall;
  }

  /**
   * Restore an API key. Restore a deleted API key, along with its associated rights.
   *
   * @param key API Key string. (required)
   * @return AddApiKeyResponse
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
  public AddApiKeyResponse restoreApiKey(String key) throws ApiException {
    ApiResponse<AddApiKeyResponse> localVarResp = restoreApiKeyWithHttpInfo(
      key
    );
    return localVarResp.getData();
  }

  /**
   * Restore an API key. Restore a deleted API key, along with its associated rights.
   *
   * @param key API Key string. (required)
   * @return ApiResponse&lt;AddApiKeyResponse&gt;
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
  public ApiResponse<AddApiKeyResponse> restoreApiKeyWithHttpInfo(String key)
    throws ApiException {
    okhttp3.Call localVarCall = restoreApiKeyValidateBeforeCall(key, null);
    Type localVarReturnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Restore an API key. (asynchronously) Restore a deleted API key, along with its associated
   * rights.
   *
   * @param key API Key string. (required)
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
  public okhttp3.Call restoreApiKeyAsync(
    String key,
    final ApiCallback<AddApiKeyResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = restoreApiKeyValidateBeforeCall(key, _callback);
    Type localVarReturnType = new TypeToken<AddApiKeyResponse>() {}.getType();
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
   * Build call for searchUserIds
   *
   * @param searchUserIdsObject (required)
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
  public okhttp3.Call searchUserIdsCall(
    SearchUserIdsObject searchUserIdsObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = searchUserIdsObject;

    // create path and map variables
    String localVarPath = "/1/clusters/mapping/search";

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
  private okhttp3.Call searchUserIdsValidateBeforeCall(
    SearchUserIdsObject searchUserIdsObject,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'searchUserIdsObject' is set
    if (searchUserIdsObject == null) {
      throw new ApiException(
        "Missing the required parameter 'searchUserIdsObject' when calling searchUserIds(Async)"
      );
    }

    okhttp3.Call localVarCall = searchUserIdsCall(
      searchUserIdsObject,
      _callback
    );
    return localVarCall;
  }

  /**
   * Search userID Search for userIDs. The data returned will usually be a few seconds behind real
   * time, because userID usage may take up to a few seconds propagate to the different clusters. To
   * keep updates moving quickly, the index of userIDs isn&#39;t built synchronously with the
   * mapping. Instead, the index is built once every 12h, at the same time as the update of userID
   * usage. For example, when you perform a modification like adding or moving a userID, the search
   * will report an outdated value until the next rebuild of the mapping, which takes place every
   * 12h. Upon success, the response is 200 OK and contains the following userIDs data.
   *
   * @param searchUserIdsObject (required)
   * @return SearchUserIdsResponse
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
  public SearchUserIdsResponse searchUserIds(
    SearchUserIdsObject searchUserIdsObject
  ) throws ApiException {
    ApiResponse<SearchUserIdsResponse> localVarResp = searchUserIdsWithHttpInfo(
      searchUserIdsObject
    );
    return localVarResp.getData();
  }

  /**
   * Search userID Search for userIDs. The data returned will usually be a few seconds behind real
   * time, because userID usage may take up to a few seconds propagate to the different clusters. To
   * keep updates moving quickly, the index of userIDs isn&#39;t built synchronously with the
   * mapping. Instead, the index is built once every 12h, at the same time as the update of userID
   * usage. For example, when you perform a modification like adding or moving a userID, the search
   * will report an outdated value until the next rebuild of the mapping, which takes place every
   * 12h. Upon success, the response is 200 OK and contains the following userIDs data.
   *
   * @param searchUserIdsObject (required)
   * @return ApiResponse&lt;SearchUserIdsResponse&gt;
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
  public ApiResponse<SearchUserIdsResponse> searchUserIdsWithHttpInfo(
    SearchUserIdsObject searchUserIdsObject
  ) throws ApiException {
    okhttp3.Call localVarCall = searchUserIdsValidateBeforeCall(
      searchUserIdsObject,
      null
    );
    Type localVarReturnType = new TypeToken<SearchUserIdsResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Search userID (asynchronously) Search for userIDs. The data returned will usually be a few
   * seconds behind real time, because userID usage may take up to a few seconds propagate to the
   * different clusters. To keep updates moving quickly, the index of userIDs isn&#39;t built
   * synchronously with the mapping. Instead, the index is built once every 12h, at the same time as
   * the update of userID usage. For example, when you perform a modification like adding or moving
   * a userID, the search will report an outdated value until the next rebuild of the mapping, which
   * takes place every 12h. Upon success, the response is 200 OK and contains the following userIDs
   * data.
   *
   * @param searchUserIdsObject (required)
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
  public okhttp3.Call searchUserIdsAsync(
    SearchUserIdsObject searchUserIdsObject,
    final ApiCallback<SearchUserIdsResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = searchUserIdsValidateBeforeCall(
      searchUserIdsObject,
      _callback
    );
    Type localVarReturnType = new TypeToken<SearchUserIdsResponse>() {}
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

  /**
   * Build call for updateApiKey
   *
   * @param key API Key string. (required)
   * @param apiKey (required)
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
  public okhttp3.Call updateApiKeyCall(
    String key,
    ApiKey apiKey,
    final ApiCallback _callback
  ) throws ApiException {
    Object localVarPostBody = apiKey;

    // create path and map variables
    String localVarPath =
      "/1/keys/{key}".replaceAll(
          "\\{" + "key" + "\\}",
          this.escapeString(key.toString())
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
  private okhttp3.Call updateApiKeyValidateBeforeCall(
    String key,
    ApiKey apiKey,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new ApiException(
        "Missing the required parameter 'key' when calling updateApiKey(Async)"
      );
    }

    // verify the required parameter 'apiKey' is set
    if (apiKey == null) {
      throw new ApiException(
        "Missing the required parameter 'apiKey' when calling updateApiKey(Async)"
      );
    }

    okhttp3.Call localVarCall = updateApiKeyCall(key, apiKey, _callback);
    return localVarCall;
  }

  /**
   * Update an API key. Replace every permission of an existing API key.
   *
   * @param key API Key string. (required)
   * @param apiKey (required)
   * @return UpdateApiKeyResponse
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
  public UpdateApiKeyResponse updateApiKey(String key, ApiKey apiKey)
    throws ApiException {
    ApiResponse<UpdateApiKeyResponse> localVarResp = updateApiKeyWithHttpInfo(
      key,
      apiKey
    );
    return localVarResp.getData();
  }

  /**
   * Update an API key. Replace every permission of an existing API key.
   *
   * @param key API Key string. (required)
   * @param apiKey (required)
   * @return ApiResponse&lt;UpdateApiKeyResponse&gt;
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
  public ApiResponse<UpdateApiKeyResponse> updateApiKeyWithHttpInfo(
    String key,
    ApiKey apiKey
  ) throws ApiException {
    okhttp3.Call localVarCall = updateApiKeyValidateBeforeCall(
      key,
      apiKey,
      null
    );
    Type localVarReturnType = new TypeToken<UpdateApiKeyResponse>() {}
      .getType();
    return this.execute(localVarCall, localVarReturnType);
  }

  /**
   * Update an API key. (asynchronously) Replace every permission of an existing API key.
   *
   * @param key API Key string. (required)
   * @param apiKey (required)
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
  public okhttp3.Call updateApiKeyAsync(
    String key,
    ApiKey apiKey,
    final ApiCallback<UpdateApiKeyResponse> _callback
  ) throws ApiException {
    okhttp3.Call localVarCall = updateApiKeyValidateBeforeCall(
      key,
      apiKey,
      _callback
    );
    Type localVarReturnType = new TypeToken<UpdateApiKeyResponse>() {}
      .getType();
    this.executeAsync(localVarCall, localVarReturnType, _callback);
    return localVarCall;
  }
}
