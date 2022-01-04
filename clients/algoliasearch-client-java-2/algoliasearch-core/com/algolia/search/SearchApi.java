package com.algolia.search;

import com.algolia.ApiCallback;
import com.algolia.ApiClient;
import com.algolia.ApiException;
import com.algolia.ApiResponse;
import com.algolia.Pair;
import com.algolia.model.AddApiKeyResponse;
import com.algolia.model.ApiKey;
import com.algolia.model.AssignUserIdObject;
import com.algolia.model.BatchAssignUserIdsObject;
import com.algolia.model.BatchDictionaryEntries;
import com.algolia.model.BatchObject;
import com.algolia.model.BatchResponse;
import com.algolia.model.BatchWriteObject;
import com.algolia.model.BrowseRequest;
import com.algolia.model.BrowseResponse;
import com.algolia.model.BuildInOperation;
import com.algolia.model.CreatedAtResponse;
import com.algolia.model.DeleteApiKeyResponse;
import com.algolia.model.DeleteSourceResponse;
import com.algolia.model.DeletedAtResponse;
import com.algolia.model.DictionarySettingsRequest;
import com.algolia.model.GetDictionarySettingsResponse;
import com.algolia.model.GetLogsResponse;
import com.algolia.model.GetObjectsObject;
import com.algolia.model.GetObjectsResponse;
import com.algolia.model.GetTaskResponse;
import com.algolia.model.GetTopUserIdsResponse;
import com.algolia.model.IndexSettings;
import com.algolia.model.KeyObject;
import com.algolia.model.Languages;
import com.algolia.model.ListApiKeysResponse;
import com.algolia.model.ListClustersResponse;
import com.algolia.model.ListIndicesResponse;
import com.algolia.model.ListUserIdsResponse;
import com.algolia.model.MultipleBatchResponse;
import com.algolia.model.MultipleQueriesObject;
import com.algolia.model.MultipleQueriesResponse;
import com.algolia.model.OperationIndexObject;
import com.algolia.model.RemoveUserIdResponse;
import com.algolia.model.ReplaceSourceResponse;
import com.algolia.model.Rule;
import com.algolia.model.SaveObjectResponse;
import com.algolia.model.SaveSynonymResponse;
import com.algolia.model.SearchDictionaryEntries;
import com.algolia.model.SearchForFacetValuesRequest;
import com.algolia.model.SearchForFacetValuesResponse;
import com.algolia.model.SearchParams;
import com.algolia.model.SearchResponse;
import com.algolia.model.SearchRulesParams;
import com.algolia.model.SearchRulesResponse;
import com.algolia.model.SearchSynonymsResponse;
import com.algolia.model.SearchUserIdsObject;
import com.algolia.model.SearchUserIdsResponse;
import com.algolia.model.Source;
import com.algolia.model.SynonymHit;
import com.algolia.model.UpdateApiKeyResponse;
import com.algolia.model.UpdatedAtResponse;
import com.algolia.model.UpdatedAtWithObjectIdResponse;
import com.algolia.model.UpdatedRuleResponse;
import com.algolia.model.UserId;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import okhttp3.Call;

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
   */
  private Call addApiKeyCall(ApiKey apiKey, final ApiCallback _callback)
    throws ApiException {
    Object body = apiKey;

    // create path and map variables
    String path = "/1/keys";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call addApiKeyValidateBeforeCall(
    ApiKey apiKey,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'apiKey' is set
    if (apiKey == null) {
      throw new ApiException(
        "Missing the required parameter 'apiKey' when calling addApiKey(Async)"
      );
    }

    return addApiKeyCall(apiKey, _callback);
  }

  /**
   * Create a new API key. Add a new API Key with specific permissions/restrictions.
   *
   * @param apiKey (required)
   * @return AddApiKeyResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public AddApiKeyResponse addApiKey(ApiKey apiKey) throws ApiException {
    Call call = addApiKeyValidateBeforeCall(apiKey, null);
    Type returnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    ApiResponse<AddApiKeyResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Create a new API key. (asynchronously) Add a new API Key with specific
   * permissions/restrictions.
   *
   * @param apiKey (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call addApiKeyAsync(
    ApiKey apiKey,
    final ApiCallback<AddApiKeyResponse> _callback
  ) throws ApiException {
    Call call = addApiKeyValidateBeforeCall(apiKey, _callback);
    Type returnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for addOrUpdateObject
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param requestBody The Algolia object. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call addOrUpdateObjectCall(
    String indexName,
    String objectID,
    Map<String, Object> requestBody,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = requestBody;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "PUT", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call addOrUpdateObjectValidateBeforeCall(
    String indexName,
    String objectID,
    Map<String, Object> requestBody,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling addOrUpdateObject(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new ApiException(
        "Missing the required parameter 'objectID' when calling addOrUpdateObject(Async)"
      );
    }

    // verify the required parameter 'requestBody' is set
    if (requestBody == null) {
      throw new ApiException(
        "Missing the required parameter 'requestBody' when calling addOrUpdateObject(Async)"
      );
    }

    return addOrUpdateObjectCall(indexName, objectID, requestBody, _callback);
  }

  /**
   * Add or replace an object with a given object ID. Add or replace an object with a given object
   * ID. If the object does not exist, it will be created. If it already exists, it will be
   * replaced.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param requestBody The Algolia object. (required)
   * @return UpdatedAtWithObjectIdResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtWithObjectIdResponse addOrUpdateObject(
    String indexName,
    String objectID,
    Map<String, Object> requestBody
  ) throws ApiException {
    Call call = addOrUpdateObjectValidateBeforeCall(
      indexName,
      objectID,
      requestBody,
      null
    );
    Type returnType = new TypeToken<UpdatedAtWithObjectIdResponse>() {}
      .getType();
    ApiResponse<UpdatedAtWithObjectIdResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Add or replace an object with a given object ID. (asynchronously) Add or replace an object with
   * a given object ID. If the object does not exist, it will be created. If it already exists, it
   * will be replaced.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param requestBody The Algolia object. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call addOrUpdateObjectAsync(
    String indexName,
    String objectID,
    Map<String, Object> requestBody,
    final ApiCallback<UpdatedAtWithObjectIdResponse> _callback
  ) throws ApiException {
    Call call = addOrUpdateObjectValidateBeforeCall(
      indexName,
      objectID,
      requestBody,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtWithObjectIdResponse>() {}
      .getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for appendSource
   *
   * @param source The source to add. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call appendSourceCall(Source source, final ApiCallback _callback)
    throws ApiException {
    Object body = source;

    // create path and map variables
    String path = "/1/security/sources/append";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call appendSourceValidateBeforeCall(
    Source source,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'source' is set
    if (source == null) {
      throw new ApiException(
        "Missing the required parameter 'source' when calling appendSource(Async)"
      );
    }

    return appendSourceCall(source, _callback);
  }

  /**
   * Add a single source to the list of allowed sources.
   *
   * @param source The source to add. (required)
   * @return CreatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public CreatedAtResponse appendSource(Source source) throws ApiException {
    Call call = appendSourceValidateBeforeCall(source, null);
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    ApiResponse<CreatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Add a single source to the list of allowed sources.
   *
   * @param source The source to add. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call appendSourceAsync(
    Source source,
    final ApiCallback<CreatedAtResponse> _callback
  ) throws ApiException {
    Call call = appendSourceValidateBeforeCall(source, _callback);
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for assignUserId
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param assignUserIdObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call assignUserIdCall(
    Object xAlgoliaUserID,
    AssignUserIdObject assignUserIdObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = assignUserIdObject;

    // create path and map variables
    String path = "/1/clusters/mapping";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (xAlgoliaUserID != null) {
      queryParams.addAll(
        this.parameterToPair("X-Algolia-User-ID", xAlgoliaUserID)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call assignUserIdValidateBeforeCall(
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

    return assignUserIdCall(xAlgoliaUserID, assignUserIdObject, _callback);
  }

  /**
   * Assign or Move userID Assign or Move a userID to a cluster. The time it takes to migrate (move)
   * a user is proportional to the amount of data linked to the userID. Upon success, the response
   * is 200 OK. A successful response indicates that the operation has been taken into account, and
   * the userID is directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param assignUserIdObject (required)
   * @return CreatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public CreatedAtResponse assignUserId(
    Object xAlgoliaUserID,
    AssignUserIdObject assignUserIdObject
  ) throws ApiException {
    Call call = assignUserIdValidateBeforeCall(
      xAlgoliaUserID,
      assignUserIdObject,
      null
    );
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    ApiResponse<CreatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call assignUserIdAsync(
    Object xAlgoliaUserID,
    AssignUserIdObject assignUserIdObject,
    final ApiCallback<CreatedAtResponse> _callback
  ) throws ApiException {
    Call call = assignUserIdValidateBeforeCall(
      xAlgoliaUserID,
      assignUserIdObject,
      _callback
    );
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for batch
   *
   * @param indexName The index in which to perform the request. (required)
   * @param batchWriteObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call batchCall(
    String indexName,
    BatchWriteObject batchWriteObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = batchWriteObject;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/batch".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call batchValidateBeforeCall(
    String indexName,
    BatchWriteObject batchWriteObject,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling batch(Async)"
      );
    }

    // verify the required parameter 'batchWriteObject' is set
    if (batchWriteObject == null) {
      throw new ApiException(
        "Missing the required parameter 'batchWriteObject' when calling batch(Async)"
      );
    }

    return batchCall(indexName, batchWriteObject, _callback);
  }

  /**
   * Performs multiple write operations in a single API call.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param batchWriteObject (required)
   * @return BatchResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public BatchResponse batch(
    String indexName,
    BatchWriteObject batchWriteObject
  ) throws ApiException {
    Call call = batchValidateBeforeCall(indexName, batchWriteObject, null);
    Type returnType = new TypeToken<BatchResponse>() {}.getType();
    ApiResponse<BatchResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Performs multiple write operations in a single API call.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param batchWriteObject (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call batchAsync(
    String indexName,
    BatchWriteObject batchWriteObject,
    final ApiCallback<BatchResponse> _callback
  ) throws ApiException {
    Call call = batchValidateBeforeCall(indexName, batchWriteObject, _callback);
    Type returnType = new TypeToken<BatchResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for batchAssignUserIds
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param batchAssignUserIdsObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call batchAssignUserIdsCall(
    Object xAlgoliaUserID,
    BatchAssignUserIdsObject batchAssignUserIdsObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = batchAssignUserIdsObject;

    // create path and map variables
    String path = "/1/clusters/mapping/batch";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (xAlgoliaUserID != null) {
      queryParams.addAll(
        this.parameterToPair("X-Algolia-User-ID", xAlgoliaUserID)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call batchAssignUserIdsValidateBeforeCall(
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

    return batchAssignUserIdsCall(
      xAlgoliaUserID,
      batchAssignUserIdsObject,
      _callback
    );
  }

  /**
   * Batch assign userIDs Assign multiple userIDs to a cluster. Upon success, the response is 200
   * OK. A successful response indicates that the operation has been taken into account, and the
   * userIDs are directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param batchAssignUserIdsObject (required)
   * @return CreatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public CreatedAtResponse batchAssignUserIds(
    Object xAlgoliaUserID,
    BatchAssignUserIdsObject batchAssignUserIdsObject
  ) throws ApiException {
    Call call = batchAssignUserIdsValidateBeforeCall(
      xAlgoliaUserID,
      batchAssignUserIdsObject,
      null
    );
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    ApiResponse<CreatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call batchAssignUserIdsAsync(
    Object xAlgoliaUserID,
    BatchAssignUserIdsObject batchAssignUserIdsObject,
    final ApiCallback<CreatedAtResponse> _callback
  ) throws ApiException {
    Call call = batchAssignUserIdsValidateBeforeCall(
      xAlgoliaUserID,
      batchAssignUserIdsObject,
      _callback
    );
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for batchDictionaryEntries
   *
   * @param dictionaryName The dictionary to search in. (required)
   * @param batchDictionaryEntries (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call batchDictionaryEntriesCall(
    String dictionaryName,
    BatchDictionaryEntries batchDictionaryEntries,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = batchDictionaryEntries;

    // create path and map variables
    String path =
      "/1/dictionaries/{dictionaryName}/batch".replaceAll(
          "\\{" + "dictionaryName" + "\\}",
          this.escapeString(dictionaryName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call batchDictionaryEntriesValidateBeforeCall(
    String dictionaryName,
    BatchDictionaryEntries batchDictionaryEntries,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'dictionaryName' is set
    if (dictionaryName == null) {
      throw new ApiException(
        "Missing the required parameter 'dictionaryName' when calling" +
        " batchDictionaryEntries(Async)"
      );
    }

    // verify the required parameter 'batchDictionaryEntries' is set
    if (batchDictionaryEntries == null) {
      throw new ApiException(
        "Missing the required parameter 'batchDictionaryEntries' when calling" +
        " batchDictionaryEntries(Async)"
      );
    }

    return batchDictionaryEntriesCall(
      dictionaryName,
      batchDictionaryEntries,
      _callback
    );
  }

  /**
   * Send a batch of dictionary entries. Send a batch of dictionary entries.
   *
   * @param dictionaryName The dictionary to search in. (required)
   * @param batchDictionaryEntries (required)
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse batchDictionaryEntries(
    String dictionaryName,
    BatchDictionaryEntries batchDictionaryEntries
  ) throws ApiException {
    Call call = batchDictionaryEntriesValidateBeforeCall(
      dictionaryName,
      batchDictionaryEntries,
      null
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Send a batch of dictionary entries. (asynchronously) Send a batch of dictionary entries.
   *
   * @param dictionaryName The dictionary to search in. (required)
   * @param batchDictionaryEntries (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call batchDictionaryEntriesAsync(
    String dictionaryName,
    BatchDictionaryEntries batchDictionaryEntries,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = batchDictionaryEntriesValidateBeforeCall(
      dictionaryName,
      batchDictionaryEntries,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for batchRules
   *
   * @param indexName The index in which to perform the request. (required)
   * @param rule (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param clearExistingRules When true, existing Rules are cleared before adding this batch. When
   *     false, existing Rules are kept. (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call batchRulesCall(
    String indexName,
    List<Rule> rule,
    Boolean forwardToReplicas,
    Boolean clearExistingRules,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = rule;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/rules/batch".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (forwardToReplicas != null) {
      queryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    if (clearExistingRules != null) {
      queryParams.addAll(
        this.parameterToPair("clearExistingRules", clearExistingRules)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call batchRulesValidateBeforeCall(
    String indexName,
    List<Rule> rule,
    Boolean forwardToReplicas,
    Boolean clearExistingRules,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling batchRules(Async)"
      );
    }

    // verify the required parameter 'rule' is set
    if (rule == null) {
      throw new ApiException(
        "Missing the required parameter 'rule' when calling batchRules(Async)"
      );
    }

    return batchRulesCall(
      indexName,
      rule,
      forwardToReplicas,
      clearExistingRules,
      _callback
    );
  }

  /**
   * Batch Rules. Create or update a batch of Rules.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param rule (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param clearExistingRules When true, existing Rules are cleared before adding this batch. When
   *     false, existing Rules are kept. (optional)
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse batchRules(
    String indexName,
    List<Rule> rule,
    Boolean forwardToReplicas,
    Boolean clearExistingRules
  ) throws ApiException {
    Call call = batchRulesValidateBeforeCall(
      indexName,
      rule,
      forwardToReplicas,
      clearExistingRules,
      null
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Batch Rules. (asynchronously) Create or update a batch of Rules.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param rule (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param clearExistingRules When true, existing Rules are cleared before adding this batch. When
   *     false, existing Rules are kept. (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call batchRulesAsync(
    String indexName,
    List<Rule> rule,
    Boolean forwardToReplicas,
    Boolean clearExistingRules,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = batchRulesValidateBeforeCall(
      indexName,
      rule,
      forwardToReplicas,
      clearExistingRules,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for browse
   *
   * @param indexName The index in which to perform the request. (required)
   * @param browseRequest (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call browseCall(
    String indexName,
    BrowseRequest browseRequest,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = browseRequest;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/browse".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call browseValidateBeforeCall(
    String indexName,
    BrowseRequest browseRequest,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling browse(Async)"
      );
    }

    return browseCall(indexName, browseRequest, _callback);
  }

  /**
   * Retrieve all index content. This method allows you to retrieve all index content. It can
   * retrieve up to 1,000 records per call and supports full text search and filters. For
   * performance reasons, some features are not supported, including `distinct`, sorting by `typos`,
   * `words` or `geo distance`. When there is more content to be browsed, the response contains a
   * cursor field. This cursor has to be passed to the subsequent call to browse in order to get the
   * next page of results. When the end of the index has been reached, the cursor field is absent
   * from the response.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param browseRequest (optional)
   * @return BrowseResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public BrowseResponse browse(String indexName, BrowseRequest browseRequest)
    throws ApiException {
    Call call = browseValidateBeforeCall(indexName, browseRequest, null);
    Type returnType = new TypeToken<BrowseResponse>() {}.getType();
    ApiResponse<BrowseResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Retrieve all index content. (asynchronously) This method allows you to retrieve all index
   * content. It can retrieve up to 1,000 records per call and supports full text search and
   * filters. For performance reasons, some features are not supported, including
   * &#x60;distinct&#x60;, sorting by &#x60;typos&#x60;, &#x60;words&#x60; or &#x60;geo
   * distance&#x60;. When there is more content to be browsed, the response contains a cursor field.
   * This cursor has to be passed to the subsequent call to browse in order to get the next page of
   * results. When the end of the index has been reached, the cursor field is absent from the
   * response.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param browseRequest (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call browseAsync(
    String indexName,
    BrowseRequest browseRequest,
    final ApiCallback<BrowseResponse> _callback
  ) throws ApiException {
    Call call = browseValidateBeforeCall(indexName, browseRequest, _callback);
    Type returnType = new TypeToken<BrowseResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
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
   */
  private Call clearAllSynonymsCall(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/synonyms/clear".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (forwardToReplicas != null) {
      queryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call clearAllSynonymsValidateBeforeCall(
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

    return clearAllSynonymsCall(indexName, forwardToReplicas, _callback);
  }

  /**
   * Clear all synonyms. Remove all synonyms from an index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse clearAllSynonyms(
    String indexName,
    Boolean forwardToReplicas
  ) throws ApiException {
    Call call = clearAllSynonymsValidateBeforeCall(
      indexName,
      forwardToReplicas,
      null
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call clearAllSynonymsAsync(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = clearAllSynonymsValidateBeforeCall(
      indexName,
      forwardToReplicas,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for clearObjects
   *
   * @param indexName The index in which to perform the request. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call clearObjectsCall(String indexName, final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/clear".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call clearObjectsValidateBeforeCall(
    String indexName,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling clearObjects(Async)"
      );
    }

    return clearObjectsCall(indexName, _callback);
  }

  /**
   * clear all objects from an index. Delete an index's content, but leave settings and
   * index-specific API keys untouched.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse clearObjects(String indexName) throws ApiException {
    Call call = clearObjectsValidateBeforeCall(indexName, null);
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * clear all objects from an index. (asynchronously) Delete an index&#39;s content, but leave
   * settings and index-specific API keys untouched.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call clearObjectsAsync(
    String indexName,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = clearObjectsValidateBeforeCall(indexName, _callback);
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for clearRules
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call clearRulesCall(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/rules/clear".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (forwardToReplicas != null) {
      queryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call clearRulesValidateBeforeCall(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling clearRules(Async)"
      );
    }

    return clearRulesCall(indexName, forwardToReplicas, _callback);
  }

  /**
   * Clear Rules. Delete all Rules in the index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse clearRules(
    String indexName,
    Boolean forwardToReplicas
  ) throws ApiException {
    Call call = clearRulesValidateBeforeCall(
      indexName,
      forwardToReplicas,
      null
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Clear Rules. (asynchronously) Delete all Rules in the index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call clearRulesAsync(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = clearRulesValidateBeforeCall(
      indexName,
      forwardToReplicas,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for deleteApiKey
   *
   * @param key API Key string. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call deleteApiKeyCall(String key, final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/keys/{key}".replaceAll(
          "\\{" + "key" + "\\}",
          this.escapeString(key.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        path,
        "DELETE",
        queryParams,
        body,
        headers,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private Call deleteApiKeyValidateBeforeCall(
    String key,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new ApiException(
        "Missing the required parameter 'key' when calling deleteApiKey(Async)"
      );
    }

    return deleteApiKeyCall(key, _callback);
  }

  /**
   * Delete an API key. Delete an existing API Key.
   *
   * @param key API Key string. (required)
   * @return DeleteApiKeyResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public DeleteApiKeyResponse deleteApiKey(String key) throws ApiException {
    Call call = deleteApiKeyValidateBeforeCall(key, null);
    Type returnType = new TypeToken<DeleteApiKeyResponse>() {}.getType();
    ApiResponse<DeleteApiKeyResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Delete an API key. (asynchronously) Delete an existing API Key.
   *
   * @param key API Key string. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call deleteApiKeyAsync(
    String key,
    final ApiCallback<DeleteApiKeyResponse> _callback
  ) throws ApiException {
    Call call = deleteApiKeyValidateBeforeCall(key, _callback);
    Type returnType = new TypeToken<DeleteApiKeyResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for deleteBy
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call deleteByCall(
    String indexName,
    SearchParams searchParams,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = searchParams;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/deleteByQuery".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call deleteByValidateBeforeCall(
    String indexName,
    SearchParams searchParams,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling deleteBy(Async)"
      );
    }

    // verify the required parameter 'searchParams' is set
    if (searchParams == null) {
      throw new ApiException(
        "Missing the required parameter 'searchParams' when calling deleteBy(Async)"
      );
    }

    return deleteByCall(indexName, searchParams, _callback);
  }

  /**
   * Delete all records matching the query. Remove all objects matching a filter (including geo
   * filters). This method enables you to delete one or more objects based on filters (numeric,
   * facet, tag or geo queries). It doesn't accept empty filters or a query.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @return DeletedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public DeletedAtResponse deleteBy(
    String indexName,
    SearchParams searchParams
  ) throws ApiException {
    Call call = deleteByValidateBeforeCall(indexName, searchParams, null);
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    ApiResponse<DeletedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Delete all records matching the query. (asynchronously) Remove all objects matching a filter
   * (including geo filters). This method enables you to delete one or more objects based on filters
   * (numeric, facet, tag or geo queries). It doesn&#39;t accept empty filters or a query.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call deleteByAsync(
    String indexName,
    SearchParams searchParams,
    final ApiCallback<DeletedAtResponse> _callback
  ) throws ApiException {
    Call call = deleteByValidateBeforeCall(indexName, searchParams, _callback);
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for deleteIndex
   *
   * @param indexName The index in which to perform the request. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call deleteIndexCall(String indexName, final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        path,
        "DELETE",
        queryParams,
        body,
        headers,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private Call deleteIndexValidateBeforeCall(
    String indexName,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling deleteIndex(Async)"
      );
    }

    return deleteIndexCall(indexName, _callback);
  }

  /**
   * Delete index. Delete an existing index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return DeletedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public DeletedAtResponse deleteIndex(String indexName) throws ApiException {
    Call call = deleteIndexValidateBeforeCall(indexName, null);
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    ApiResponse<DeletedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Delete index. (asynchronously) Delete an existing index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call deleteIndexAsync(
    String indexName,
    final ApiCallback<DeletedAtResponse> _callback
  ) throws ApiException {
    Call call = deleteIndexValidateBeforeCall(indexName, _callback);
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for deleteObject
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call deleteObjectCall(
    String indexName,
    String objectID,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        path,
        "DELETE",
        queryParams,
        body,
        headers,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private Call deleteObjectValidateBeforeCall(
    String indexName,
    String objectID,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling deleteObject(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new ApiException(
        "Missing the required parameter 'objectID' when calling deleteObject(Async)"
      );
    }

    return deleteObjectCall(indexName, objectID, _callback);
  }

  /**
   * Delete object. Delete an existing object.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @return DeletedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public DeletedAtResponse deleteObject(String indexName, String objectID)
    throws ApiException {
    Call call = deleteObjectValidateBeforeCall(indexName, objectID, null);
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    ApiResponse<DeletedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Delete object. (asynchronously) Delete an existing object.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call deleteObjectAsync(
    String indexName,
    String objectID,
    final ApiCallback<DeletedAtResponse> _callback
  ) throws ApiException {
    Call call = deleteObjectValidateBeforeCall(indexName, objectID, _callback);
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for deleteRule
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call deleteRuleCall(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/rules/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (forwardToReplicas != null) {
      queryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        path,
        "DELETE",
        queryParams,
        body,
        headers,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private Call deleteRuleValidateBeforeCall(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling deleteRule(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new ApiException(
        "Missing the required parameter 'objectID' when calling deleteRule(Async)"
      );
    }

    return deleteRuleCall(indexName, objectID, forwardToReplicas, _callback);
  }

  /**
   * Delete a rule. Delete the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse deleteRule(
    String indexName,
    String objectID,
    Boolean forwardToReplicas
  ) throws ApiException {
    Call call = deleteRuleValidateBeforeCall(
      indexName,
      objectID,
      forwardToReplicas,
      null
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Delete a rule. (asynchronously) Delete the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call deleteRuleAsync(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = deleteRuleValidateBeforeCall(
      indexName,
      objectID,
      forwardToReplicas,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for deleteSource
   *
   * @param source The IP range of the source. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call deleteSourceCall(String source, final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/security/sources/{source}".replaceAll(
          "\\{" + "source" + "\\}",
          this.escapeString(source.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        path,
        "DELETE",
        queryParams,
        body,
        headers,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private Call deleteSourceValidateBeforeCall(
    String source,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'source' is set
    if (source == null) {
      throw new ApiException(
        "Missing the required parameter 'source' when calling deleteSource(Async)"
      );
    }

    return deleteSourceCall(source, _callback);
  }

  /**
   * Remove a single source from the list of allowed sources.
   *
   * @param source The IP range of the source. (required)
   * @return DeleteSourceResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public DeleteSourceResponse deleteSource(String source) throws ApiException {
    Call call = deleteSourceValidateBeforeCall(source, null);
    Type returnType = new TypeToken<DeleteSourceResponse>() {}.getType();
    ApiResponse<DeleteSourceResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Remove a single source from the list of allowed sources.
   *
   * @param source The IP range of the source. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call deleteSourceAsync(
    String source,
    final ApiCallback<DeleteSourceResponse> _callback
  ) throws ApiException {
    Call call = deleteSourceValidateBeforeCall(source, _callback);
    Type returnType = new TypeToken<DeleteSourceResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
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
   */
  private Call deleteSynonymCall(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/synonyms/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (forwardToReplicas != null) {
      queryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        path,
        "DELETE",
        queryParams,
        body,
        headers,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private Call deleteSynonymValidateBeforeCall(
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

    return deleteSynonymCall(indexName, objectID, forwardToReplicas, _callback);
  }

  /**
   * Delete synonym. Delete a single synonyms set, identified by the given objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return DeletedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public DeletedAtResponse deleteSynonym(
    String indexName,
    String objectID,
    Boolean forwardToReplicas
  ) throws ApiException {
    Call call = deleteSynonymValidateBeforeCall(
      indexName,
      objectID,
      forwardToReplicas,
      null
    );
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    ApiResponse<DeletedAtResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call deleteSynonymAsync(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback<DeletedAtResponse> _callback
  ) throws ApiException {
    Call call = deleteSynonymValidateBeforeCall(
      indexName,
      objectID,
      forwardToReplicas,
      _callback
    );
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getApiKey
   *
   * @param key API Key string. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getApiKeyCall(String key, final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/keys/{key}".replaceAll(
          "\\{" + "key" + "\\}",
          this.escapeString(key.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getApiKeyValidateBeforeCall(
    String key,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new ApiException(
        "Missing the required parameter 'key' when calling getApiKey(Async)"
      );
    }

    return getApiKeyCall(key, _callback);
  }

  /**
   * Get an API key. Get the permissions of an API key.
   *
   * @param key API Key string. (required)
   * @return KeyObject
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public KeyObject getApiKey(String key) throws ApiException {
    Call call = getApiKeyValidateBeforeCall(key, null);
    Type returnType = new TypeToken<KeyObject>() {}.getType();
    ApiResponse<KeyObject> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Get an API key. (asynchronously) Get the permissions of an API key.
   *
   * @param key API Key string. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call getApiKeyAsync(
    String key,
    final ApiCallback<KeyObject> _callback
  ) throws ApiException {
    Call call = getApiKeyValidateBeforeCall(key, _callback);
    Type returnType = new TypeToken<KeyObject>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getDictionaryLanguages
   *
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getDictionaryLanguagesCall(final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path = "/1/dictionaries/*/languages";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getDictionaryLanguagesValidateBeforeCall(
    final ApiCallback _callback
  ) throws ApiException {
    return getDictionaryLanguagesCall(_callback);
  }

  /**
   * List dictionaries supported per language. List dictionaries supported per language.
   *
   * @return Map&lt;String, Languages&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public Map<String, Languages> getDictionaryLanguages() throws ApiException {
    Call call = getDictionaryLanguagesValidateBeforeCall(null);
    Type returnType = new TypeToken<Map<String, Languages>>() {}.getType();
    ApiResponse<Map<String, Languages>> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * List dictionaries supported per language. (asynchronously) List dictionaries supported per
   * language.
   *
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call getDictionaryLanguagesAsync(
    final ApiCallback<Map<String, Languages>> _callback
  ) throws ApiException {
    Call call = getDictionaryLanguagesValidateBeforeCall(_callback);
    Type returnType = new TypeToken<Map<String, Languages>>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getDictionarySettings
   *
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getDictionarySettingsCall(final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path = "/1/dictionaries/*/settings";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getDictionarySettingsValidateBeforeCall(
    final ApiCallback _callback
  ) throws ApiException {
    return getDictionarySettingsCall(_callback);
  }

  /**
   * Retrieve dictionaries settings. The API stores languages whose standard entries are disabled.
   * Fetch settings does not return false values. Retrieve dictionaries settings.
   *
   * @return GetDictionarySettingsResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public GetDictionarySettingsResponse getDictionarySettings()
    throws ApiException {
    Call call = getDictionarySettingsValidateBeforeCall(null);
    Type returnType = new TypeToken<GetDictionarySettingsResponse>() {}
      .getType();
    ApiResponse<GetDictionarySettingsResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Retrieve dictionaries settings. The API stores languages whose standard entries are disabled.
   * Fetch settings does not return false values. (asynchronously) Retrieve dictionaries settings.
   *
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call getDictionarySettingsAsync(
    final ApiCallback<GetDictionarySettingsResponse> _callback
  ) throws ApiException {
    Call call = getDictionarySettingsValidateBeforeCall(_callback);
    Type returnType = new TypeToken<GetDictionarySettingsResponse>() {}
      .getType();
    this.executeAsync(call, returnType, _callback);
    return call;
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
   */
  private Call getLogsCall(
    Integer offset,
    Integer length,
    String indexName,
    String type,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path = "/1/logs";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (offset != null) {
      queryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (length != null) {
      queryParams.addAll(this.parameterToPair("length", length));
    }

    if (indexName != null) {
      queryParams.addAll(this.parameterToPair("indexName", indexName));
    }

    if (type != null) {
      queryParams.addAll(this.parameterToPair("type", type));
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getLogsValidateBeforeCall(
    Integer offset,
    Integer length,
    String indexName,
    String type,
    final ApiCallback _callback
  ) throws ApiException {
    return getLogsCall(offset, length, indexName, type, _callback);
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
   */
  public GetLogsResponse getLogs(
    Integer offset,
    Integer length,
    String indexName,
    String type
  ) throws ApiException {
    Call call = getLogsValidateBeforeCall(
      offset,
      length,
      indexName,
      type,
      null
    );
    Type returnType = new TypeToken<GetLogsResponse>() {}.getType();
    ApiResponse<GetLogsResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call getLogsAsync(
    Integer offset,
    Integer length,
    String indexName,
    String type,
    final ApiCallback<GetLogsResponse> _callback
  ) throws ApiException {
    Call call = getLogsValidateBeforeCall(
      offset,
      length,
      indexName,
      type,
      _callback
    );
    Type returnType = new TypeToken<GetLogsResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getObject
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param attributesToRetrieve (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getObjectCall(
    String indexName,
    String objectID,
    List<String> attributesToRetrieve,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (attributesToRetrieve != null) {
      queryParams.addAll(
        this.parameterToPair("attributesToRetrieve", attributesToRetrieve)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getObjectValidateBeforeCall(
    String indexName,
    String objectID,
    List<String> attributesToRetrieve,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling getObject(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new ApiException(
        "Missing the required parameter 'objectID' when calling getObject(Async)"
      );
    }

    return getObjectCall(indexName, objectID, attributesToRetrieve, _callback);
  }

  /**
   * Retrieve one object from the index. Retrieve one object from the index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param attributesToRetrieve (optional)
   * @return Map&lt;String, String&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public Map<String, String> getObject(
    String indexName,
    String objectID,
    List<String> attributesToRetrieve
  ) throws ApiException {
    Call call = getObjectValidateBeforeCall(
      indexName,
      objectID,
      attributesToRetrieve,
      null
    );
    Type returnType = new TypeToken<Map<String, String>>() {}.getType();
    ApiResponse<Map<String, String>> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Retrieve one object from the index. (asynchronously) Retrieve one object from the index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param attributesToRetrieve (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call getObjectAsync(
    String indexName,
    String objectID,
    List<String> attributesToRetrieve,
    final ApiCallback<Map<String, String>> _callback
  ) throws ApiException {
    Call call = getObjectValidateBeforeCall(
      indexName,
      objectID,
      attributesToRetrieve,
      _callback
    );
    Type returnType = new TypeToken<Map<String, String>>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getObjects
   *
   * @param getObjectsObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getObjectsCall(
    GetObjectsObject getObjectsObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = getObjectsObject;

    // create path and map variables
    String path = "/1/indexes/*/objects";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getObjectsValidateBeforeCall(
    GetObjectsObject getObjectsObject,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'getObjectsObject' is set
    if (getObjectsObject == null) {
      throw new ApiException(
        "Missing the required parameter 'getObjectsObject' when calling getObjects(Async)"
      );
    }

    return getObjectsCall(getObjectsObject, _callback);
  }

  /**
   * Retrieve one or more objects. Retrieve one or more objects, potentially from different indices,
   * in a single API call.
   *
   * @param getObjectsObject (required)
   * @return GetObjectsResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public GetObjectsResponse getObjects(GetObjectsObject getObjectsObject)
    throws ApiException {
    Call call = getObjectsValidateBeforeCall(getObjectsObject, null);
    Type returnType = new TypeToken<GetObjectsResponse>() {}.getType();
    ApiResponse<GetObjectsResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Retrieve one or more objects. (asynchronously) Retrieve one or more objects, potentially from
   * different indices, in a single API call.
   *
   * @param getObjectsObject (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call getObjectsAsync(
    GetObjectsObject getObjectsObject,
    final ApiCallback<GetObjectsResponse> _callback
  ) throws ApiException {
    Call call = getObjectsValidateBeforeCall(getObjectsObject, _callback);
    Type returnType = new TypeToken<GetObjectsResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getRule
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getRuleCall(
    String indexName,
    String objectID,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/rules/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getRuleValidateBeforeCall(
    String indexName,
    String objectID,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling getRule(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new ApiException(
        "Missing the required parameter 'objectID' when calling getRule(Async)"
      );
    }

    return getRuleCall(indexName, objectID, _callback);
  }

  /**
   * Get a rule. Retrieve the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @return Rule
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public Rule getRule(String indexName, String objectID) throws ApiException {
    Call call = getRuleValidateBeforeCall(indexName, objectID, null);
    Type returnType = new TypeToken<Rule>() {}.getType();
    ApiResponse<Rule> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Get a rule. (asynchronously) Retrieve the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call getRuleAsync(
    String indexName,
    String objectID,
    final ApiCallback<Rule> _callback
  ) throws ApiException {
    Call call = getRuleValidateBeforeCall(indexName, objectID, _callback);
    Type returnType = new TypeToken<Rule>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getSettings
   *
   * @param indexName The index in which to perform the request. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getSettingsCall(String indexName, final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/settings".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getSettingsValidateBeforeCall(
    String indexName,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling getSettings(Async)"
      );
    }

    return getSettingsCall(indexName, _callback);
  }

  /**
   * Retrieve settings of a given indexName.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return IndexSettings
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public IndexSettings getSettings(String indexName) throws ApiException {
    Call call = getSettingsValidateBeforeCall(indexName, null);
    Type returnType = new TypeToken<IndexSettings>() {}.getType();
    ApiResponse<IndexSettings> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Retrieve settings of a given indexName.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call getSettingsAsync(
    String indexName,
    final ApiCallback<IndexSettings> _callback
  ) throws ApiException {
    Call call = getSettingsValidateBeforeCall(indexName, _callback);
    Type returnType = new TypeToken<IndexSettings>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getSources
   *
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getSourcesCall(final ApiCallback _callback) throws ApiException {
    Object body = null;

    // create path and map variables
    String path = "/1/security/sources";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getSourcesValidateBeforeCall(final ApiCallback _callback)
    throws ApiException {
    return getSourcesCall(_callback);
  }

  /**
   * List all allowed sources.
   *
   * @return List&lt;Source&gt;
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public List<Source> getSources() throws ApiException {
    Call call = getSourcesValidateBeforeCall(null);
    Type returnType = new TypeToken<List<Source>>() {}.getType();
    ApiResponse<List<Source>> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) List all allowed sources.
   *
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call getSourcesAsync(final ApiCallback<List<Source>> _callback)
    throws ApiException {
    Call call = getSourcesValidateBeforeCall(_callback);
    Type returnType = new TypeToken<List<Source>>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getSynonym
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getSynonymCall(
    String indexName,
    String objectID,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/synonyms/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getSynonymValidateBeforeCall(
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

    return getSynonymCall(indexName, objectID, _callback);
  }

  /**
   * Get synonym. Fetch a synonym object identified by its objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @return SynonymHit
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public SynonymHit getSynonym(String indexName, String objectID)
    throws ApiException {
    Call call = getSynonymValidateBeforeCall(indexName, objectID, null);
    Type returnType = new TypeToken<SynonymHit>() {}.getType();
    ApiResponse<SynonymHit> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Get synonym. (asynchronously) Fetch a synonym object identified by its objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call getSynonymAsync(
    String indexName,
    String objectID,
    final ApiCallback<SynonymHit> _callback
  ) throws ApiException {
    Call call = getSynonymValidateBeforeCall(indexName, objectID, _callback);
    Type returnType = new TypeToken<SynonymHit>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getTask
   *
   * @param indexName The index in which to perform the request. (required)
   * @param taskID Unique identifier of an task. Numeric value (up to 64bits) (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getTaskCall(
    String indexName,
    Integer taskID,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/task/{taskID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "taskID" + "\\}",
          this.escapeString(taskID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getTaskValidateBeforeCall(
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

    return getTaskCall(indexName, taskID, _callback);
  }

  /**
   * Check the current status of a given task.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param taskID Unique identifier of an task. Numeric value (up to 64bits) (required)
   * @return GetTaskResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public GetTaskResponse getTask(String indexName, Integer taskID)
    throws ApiException {
    Call call = getTaskValidateBeforeCall(indexName, taskID, null);
    Type returnType = new TypeToken<GetTaskResponse>() {}.getType();
    ApiResponse<GetTaskResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Check the current status of a given task.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param taskID Unique identifier of an task. Numeric value (up to 64bits) (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call getTaskAsync(
    String indexName,
    Integer taskID,
    final ApiCallback<GetTaskResponse> _callback
  ) throws ApiException {
    Call call = getTaskValidateBeforeCall(indexName, taskID, _callback);
    Type returnType = new TypeToken<GetTaskResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getTopUserIds
   *
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getTopUserIdsCall(final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path = "/1/clusters/mapping/top";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getTopUserIdsValidateBeforeCall(final ApiCallback _callback)
    throws ApiException {
    return getTopUserIdsCall(_callback);
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
   */
  public GetTopUserIdsResponse getTopUserIds() throws ApiException {
    Call call = getTopUserIdsValidateBeforeCall(null);
    Type returnType = new TypeToken<GetTopUserIdsResponse>() {}.getType();
    ApiResponse<GetTopUserIdsResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call getTopUserIdsAsync(
    final ApiCallback<GetTopUserIdsResponse> _callback
  ) throws ApiException {
    Call call = getTopUserIdsValidateBeforeCall(_callback);
    Type returnType = new TypeToken<GetTopUserIdsResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for getUserId
   *
   * @param userID userID to assign. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call getUserIdCall(Object userID, final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/clusters/mapping/{userID}".replaceAll(
          "\\{" + "userID" + "\\}",
          this.escapeString(userID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call getUserIdValidateBeforeCall(
    Object userID,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'userID' is set
    if (userID == null) {
      throw new ApiException(
        "Missing the required parameter 'userID' when calling getUserId(Async)"
      );
    }

    return getUserIdCall(userID, _callback);
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
   */
  public UserId getUserId(Object userID) throws ApiException {
    Call call = getUserIdValidateBeforeCall(userID, null);
    Type returnType = new TypeToken<UserId>() {}.getType();
    ApiResponse<UserId> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call getUserIdAsync(
    Object userID,
    final ApiCallback<UserId> _callback
  ) throws ApiException {
    Call call = getUserIdValidateBeforeCall(userID, _callback);
    Type returnType = new TypeToken<UserId>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for hasPendingMappings
   *
   * @param getClusters (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call hasPendingMappingsCall(
    Boolean getClusters,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path = "/1/clusters/mapping/pending";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (getClusters != null) {
      queryParams.addAll(this.parameterToPair("getClusters", getClusters));
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call hasPendingMappingsValidateBeforeCall(
    Boolean getClusters,
    final ApiCallback _callback
  ) throws ApiException {
    return hasPendingMappingsCall(getClusters, _callback);
  }

  /**
   * Has pending mappings Get the status of your clusters' migrations or user creations. Creating a
   * large batch of users or migrating your multi-cluster may take quite some time. This method lets
   * you retrieve the status of the migration, so you can know when it's done. Upon success, the
   * response is 200 OK. A successful response indicates that the operation has been taken into
   * account, and the userIDs are directly usable.
   *
   * @param getClusters (optional)
   * @return CreatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public CreatedAtResponse hasPendingMappings(Boolean getClusters)
    throws ApiException {
    Call call = hasPendingMappingsValidateBeforeCall(getClusters, null);
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    ApiResponse<CreatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Has pending mappings (asynchronously) Get the status of your clusters&#39; migrations or user
   * creations. Creating a large batch of users or migrating your multi-cluster may take quite some
   * time. This method lets you retrieve the status of the migration, so you can know when it&#39;s
   * done. Upon success, the response is 200 OK. A successful response indicates that the operation
   * has been taken into account, and the userIDs are directly usable.
   *
   * @param getClusters (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call hasPendingMappingsAsync(
    Boolean getClusters,
    final ApiCallback<CreatedAtResponse> _callback
  ) throws ApiException {
    Call call = hasPendingMappingsValidateBeforeCall(getClusters, _callback);
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for listApiKeys
   *
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call listApiKeysCall(final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path = "/1/keys";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call listApiKeysValidateBeforeCall(final ApiCallback _callback)
    throws ApiException {
    return listApiKeysCall(_callback);
  }

  /**
   * Get the full list of API Keys. List API keys, along with their associated rights.
   *
   * @return ListApiKeysResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public ListApiKeysResponse listApiKeys() throws ApiException {
    Call call = listApiKeysValidateBeforeCall(null);
    Type returnType = new TypeToken<ListApiKeysResponse>() {}.getType();
    ApiResponse<ListApiKeysResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Get the full list of API Keys. (asynchronously) List API keys, along with their associated
   * rights.
   *
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call listApiKeysAsync(
    final ApiCallback<ListApiKeysResponse> _callback
  ) throws ApiException {
    Call call = listApiKeysValidateBeforeCall(_callback);
    Type returnType = new TypeToken<ListApiKeysResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for listClusters
   *
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call listClustersCall(final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path = "/1/clusters";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call listClustersValidateBeforeCall(final ApiCallback _callback)
    throws ApiException {
    return listClustersCall(_callback);
  }

  /**
   * List clusters List the clusters available in a multi-clusters setup for a single appID. Upon
   * success, the response is 200 OK and contains the following clusters.
   *
   * @return ListClustersResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public ListClustersResponse listClusters() throws ApiException {
    Call call = listClustersValidateBeforeCall(null);
    Type returnType = new TypeToken<ListClustersResponse>() {}.getType();
    ApiResponse<ListClustersResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * List clusters (asynchronously) List the clusters available in a multi-clusters setup for a
   * single appID. Upon success, the response is 200 OK and contains the following clusters.
   *
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call listClustersAsync(
    final ApiCallback<ListClustersResponse> _callback
  ) throws ApiException {
    Call call = listClustersValidateBeforeCall(_callback);
    Type returnType = new TypeToken<ListClustersResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
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
   */
  private Call listIndicesCall(Integer page, final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path = "/1/indexes";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (page != null) {
      queryParams.addAll(this.parameterToPair("Page", page));
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call listIndicesValidateBeforeCall(
    Integer page,
    final ApiCallback _callback
  ) throws ApiException {
    return listIndicesCall(page, _callback);
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
   */
  public ListIndicesResponse listIndices(Integer page) throws ApiException {
    Call call = listIndicesValidateBeforeCall(page, null);
    Type returnType = new TypeToken<ListIndicesResponse>() {}.getType();
    ApiResponse<ListIndicesResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call listIndicesAsync(
    Integer page,
    final ApiCallback<ListIndicesResponse> _callback
  ) throws ApiException {
    Call call = listIndicesValidateBeforeCall(page, _callback);
    Type returnType = new TypeToken<ListIndicesResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
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
   */
  private Call listUserIdsCall(
    Integer page,
    Integer hitsPerPage,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path = "/1/clusters/mapping";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (page != null) {
      queryParams.addAll(this.parameterToPair("Page", page));
    }

    if (hitsPerPage != null) {
      queryParams.addAll(this.parameterToPair("hitsPerPage", hitsPerPage));
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "GET", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call listUserIdsValidateBeforeCall(
    Integer page,
    Integer hitsPerPage,
    final ApiCallback _callback
  ) throws ApiException {
    return listUserIdsCall(page, hitsPerPage, _callback);
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
   */
  public ListUserIdsResponse listUserIds(Integer page, Integer hitsPerPage)
    throws ApiException {
    Call call = listUserIdsValidateBeforeCall(page, hitsPerPage, null);
    Type returnType = new TypeToken<ListUserIdsResponse>() {}.getType();
    ApiResponse<ListUserIdsResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call listUserIdsAsync(
    Integer page,
    Integer hitsPerPage,
    final ApiCallback<ListUserIdsResponse> _callback
  ) throws ApiException {
    Call call = listUserIdsValidateBeforeCall(page, hitsPerPage, _callback);
    Type returnType = new TypeToken<ListUserIdsResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for multipleBatch
   *
   * @param batchObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call multipleBatchCall(
    BatchObject batchObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = batchObject;

    // create path and map variables
    String path = "/1/indexes/*/batch";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call multipleBatchValidateBeforeCall(
    BatchObject batchObject,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'batchObject' is set
    if (batchObject == null) {
      throw new ApiException(
        "Missing the required parameter 'batchObject' when calling multipleBatch(Async)"
      );
    }

    return multipleBatchCall(batchObject, _callback);
  }

  /**
   * Perform multiple write operations, potentially targeting multiple indices, in a single API
   * call.
   *
   * @param batchObject (required)
   * @return MultipleBatchResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public MultipleBatchResponse multipleBatch(BatchObject batchObject)
    throws ApiException {
    Call call = multipleBatchValidateBeforeCall(batchObject, null);
    Type returnType = new TypeToken<MultipleBatchResponse>() {}.getType();
    ApiResponse<MultipleBatchResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Perform multiple write operations, potentially targeting multiple indices, in
   * a single API call.
   *
   * @param batchObject (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call multipleBatchAsync(
    BatchObject batchObject,
    final ApiCallback<MultipleBatchResponse> _callback
  ) throws ApiException {
    Call call = multipleBatchValidateBeforeCall(batchObject, _callback);
    Type returnType = new TypeToken<MultipleBatchResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for multipleQueries
   *
   * @param multipleQueriesObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call multipleQueriesCall(
    MultipleQueriesObject multipleQueriesObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = multipleQueriesObject;

    // create path and map variables
    String path = "/1/indexes/*/queries";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call multipleQueriesValidateBeforeCall(
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

    return multipleQueriesCall(multipleQueriesObject, _callback);
  }

  /**
   * Get search results for the given requests.
   *
   * @param multipleQueriesObject (required)
   * @return MultipleQueriesResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public MultipleQueriesResponse multipleQueries(
    MultipleQueriesObject multipleQueriesObject
  ) throws ApiException {
    Call call = multipleQueriesValidateBeforeCall(multipleQueriesObject, null);
    Type returnType = new TypeToken<MultipleQueriesResponse>() {}.getType();
    ApiResponse<MultipleQueriesResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Get search results for the given requests.
   *
   * @param multipleQueriesObject (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call multipleQueriesAsync(
    MultipleQueriesObject multipleQueriesObject,
    final ApiCallback<MultipleQueriesResponse> _callback
  ) throws ApiException {
    Call call = multipleQueriesValidateBeforeCall(
      multipleQueriesObject,
      _callback
    );
    Type returnType = new TypeToken<MultipleQueriesResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for operationIndex
   *
   * @param indexName The index in which to perform the request. (required)
   * @param operationIndexObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call operationIndexCall(
    String indexName,
    OperationIndexObject operationIndexObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = operationIndexObject;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/operation".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call operationIndexValidateBeforeCall(
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

    return operationIndexCall(indexName, operationIndexObject, _callback);
  }

  /**
   * Copy/move index. Peforms a copy or a move operation on a index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param operationIndexObject (required)
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse operationIndex(
    String indexName,
    OperationIndexObject operationIndexObject
  ) throws ApiException {
    Call call = operationIndexValidateBeforeCall(
      indexName,
      operationIndexObject,
      null
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Copy/move index. (asynchronously) Peforms a copy or a move operation on a index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param operationIndexObject (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call operationIndexAsync(
    String indexName,
    OperationIndexObject operationIndexObject,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = operationIndexValidateBeforeCall(
      indexName,
      operationIndexObject,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for partialUpdateObject
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param buildInOperation The Algolia object. (required)
   * @param createIfNotExists Creates the record if it does not exist yet. (optional, default to
   *     true)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call partialUpdateObjectCall(
    String indexName,
    String objectID,
    List<Map<String, BuildInOperation>> buildInOperation,
    Boolean createIfNotExists,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = buildInOperation;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/{objectID}/partial".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (createIfNotExists != null) {
      queryParams.addAll(
        this.parameterToPair("createIfNotExists", createIfNotExists)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call partialUpdateObjectValidateBeforeCall(
    String indexName,
    String objectID,
    List<Map<String, BuildInOperation>> buildInOperation,
    Boolean createIfNotExists,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling partialUpdateObject(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new ApiException(
        "Missing the required parameter 'objectID' when calling partialUpdateObject(Async)"
      );
    }

    // verify the required parameter 'buildInOperation' is set
    if (buildInOperation == null) {
      throw new ApiException(
        "Missing the required parameter 'buildInOperation' when calling" +
        " partialUpdateObject(Async)"
      );
    }

    return partialUpdateObjectCall(
      indexName,
      objectID,
      buildInOperation,
      createIfNotExists,
      _callback
    );
  }

  /**
   * Partially update an object. Update one or more attributes of an existing object. This method
   * lets you update only a part of an existing object, either by adding new attributes or updating
   * existing ones. You can partially update several objects in a single method call. If the index
   * targeted by this operation doesn't exist yet, it's automatically created.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param buildInOperation The Algolia object. (required)
   * @param createIfNotExists Creates the record if it does not exist yet. (optional, default to
   *     true)
   * @return UpdatedAtWithObjectIdResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtWithObjectIdResponse partialUpdateObject(
    String indexName,
    String objectID,
    List<Map<String, BuildInOperation>> buildInOperation,
    Boolean createIfNotExists
  ) throws ApiException {
    Call call = partialUpdateObjectValidateBeforeCall(
      indexName,
      objectID,
      buildInOperation,
      createIfNotExists,
      null
    );
    Type returnType = new TypeToken<UpdatedAtWithObjectIdResponse>() {}
      .getType();
    ApiResponse<UpdatedAtWithObjectIdResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Partially update an object. (asynchronously) Update one or more attributes of an existing
   * object. This method lets you update only a part of an existing object, either by adding new
   * attributes or updating existing ones. You can partially update several objects in a single
   * method call. If the index targeted by this operation doesn&#39;t exist yet, it&#39;s
   * automatically created.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param buildInOperation The Algolia object. (required)
   * @param createIfNotExists Creates the record if it does not exist yet. (optional, default to
   *     true)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call partialUpdateObjectAsync(
    String indexName,
    String objectID,
    List<Map<String, BuildInOperation>> buildInOperation,
    Boolean createIfNotExists,
    final ApiCallback<UpdatedAtWithObjectIdResponse> _callback
  ) throws ApiException {
    Call call = partialUpdateObjectValidateBeforeCall(
      indexName,
      objectID,
      buildInOperation,
      createIfNotExists,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtWithObjectIdResponse>() {}
      .getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for removeUserId
   *
   * @param userID userID to assign. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call removeUserIdCall(Object userID, final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/clusters/mapping/{userID}".replaceAll(
          "\\{" + "userID" + "\\}",
          this.escapeString(userID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        path,
        "DELETE",
        queryParams,
        body,
        headers,
        _callback
      );
  }

  @SuppressWarnings("rawtypes")
  private Call removeUserIdValidateBeforeCall(
    Object userID,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'userID' is set
    if (userID == null) {
      throw new ApiException(
        "Missing the required parameter 'userID' when calling removeUserId(Async)"
      );
    }

    return removeUserIdCall(userID, _callback);
  }

  /**
   * Remove userID Remove a userID and its associated data from the multi-clusters. Upon success,
   * the response is 200 OK and a task is created to remove the userID data and mapping.
   *
   * @param userID userID to assign. (required)
   * @return RemoveUserIdResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public RemoveUserIdResponse removeUserId(Object userID) throws ApiException {
    Call call = removeUserIdValidateBeforeCall(userID, null);
    Type returnType = new TypeToken<RemoveUserIdResponse>() {}.getType();
    ApiResponse<RemoveUserIdResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call removeUserIdAsync(
    Object userID,
    final ApiCallback<RemoveUserIdResponse> _callback
  ) throws ApiException {
    Call call = removeUserIdValidateBeforeCall(userID, _callback);
    Type returnType = new TypeToken<RemoveUserIdResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for replaceSources
   *
   * @param source The sources to allow. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call replaceSourcesCall(
    List<Source> source,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = source;

    // create path and map variables
    String path = "/1/security/sources";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "PUT", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call replaceSourcesValidateBeforeCall(
    List<Source> source,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'source' is set
    if (source == null) {
      throw new ApiException(
        "Missing the required parameter 'source' when calling replaceSources(Async)"
      );
    }

    return replaceSourcesCall(source, _callback);
  }

  /**
   * Replace all allowed sources.
   *
   * @param source The sources to allow. (required)
   * @return ReplaceSourceResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public ReplaceSourceResponse replaceSources(List<Source> source)
    throws ApiException {
    Call call = replaceSourcesValidateBeforeCall(source, null);
    Type returnType = new TypeToken<ReplaceSourceResponse>() {}.getType();
    ApiResponse<ReplaceSourceResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Replace all allowed sources.
   *
   * @param source The sources to allow. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call replaceSourcesAsync(
    List<Source> source,
    final ApiCallback<ReplaceSourceResponse> _callback
  ) throws ApiException {
    Call call = replaceSourcesValidateBeforeCall(source, _callback);
    Type returnType = new TypeToken<ReplaceSourceResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for restoreApiKey
   *
   * @param key API Key string. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call restoreApiKeyCall(String key, final ApiCallback _callback)
    throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/keys/{key}/restore".replaceAll(
          "\\{" + "key" + "\\}",
          this.escapeString(key.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call restoreApiKeyValidateBeforeCall(
    String key,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new ApiException(
        "Missing the required parameter 'key' when calling restoreApiKey(Async)"
      );
    }

    return restoreApiKeyCall(key, _callback);
  }

  /**
   * Restore an API key. Restore a deleted API key, along with its associated rights.
   *
   * @param key API Key string. (required)
   * @return AddApiKeyResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public AddApiKeyResponse restoreApiKey(String key) throws ApiException {
    Call call = restoreApiKeyValidateBeforeCall(key, null);
    Type returnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    ApiResponse<AddApiKeyResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Restore an API key. (asynchronously) Restore a deleted API key, along with its associated
   * rights.
   *
   * @param key API Key string. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call restoreApiKeyAsync(
    String key,
    final ApiCallback<AddApiKeyResponse> _callback
  ) throws ApiException {
    Call call = restoreApiKeyValidateBeforeCall(key, _callback);
    Type returnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for saveObject
   *
   * @param indexName The index in which to perform the request. (required)
   * @param requestBody The Algolia object. (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call saveObjectCall(
    String indexName,
    Map<String, Object> requestBody,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = requestBody;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call saveObjectValidateBeforeCall(
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

    return saveObjectCall(indexName, requestBody, _callback);
  }

  /**
   * Add an object to the index, automatically assigning it an object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param requestBody The Algolia object. (required)
   * @return SaveObjectResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public SaveObjectResponse saveObject(
    String indexName,
    Map<String, Object> requestBody
  ) throws ApiException {
    Call call = saveObjectValidateBeforeCall(indexName, requestBody, null);
    Type returnType = new TypeToken<SaveObjectResponse>() {}.getType();
    ApiResponse<SaveObjectResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Add an object to the index, automatically assigning it an object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param requestBody The Algolia object. (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call saveObjectAsync(
    String indexName,
    Map<String, Object> requestBody,
    final ApiCallback<SaveObjectResponse> _callback
  ) throws ApiException {
    Call call = saveObjectValidateBeforeCall(indexName, requestBody, _callback);
    Type returnType = new TypeToken<SaveObjectResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for saveRule
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param rule (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call saveRuleCall(
    String indexName,
    String objectID,
    Rule rule,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = rule;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/rules/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (forwardToReplicas != null) {
      queryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "PUT", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call saveRuleValidateBeforeCall(
    String indexName,
    String objectID,
    Rule rule,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling saveRule(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new ApiException(
        "Missing the required parameter 'objectID' when calling saveRule(Async)"
      );
    }

    // verify the required parameter 'rule' is set
    if (rule == null) {
      throw new ApiException(
        "Missing the required parameter 'rule' when calling saveRule(Async)"
      );
    }

    return saveRuleCall(
      indexName,
      objectID,
      rule,
      forwardToReplicas,
      _callback
    );
  }

  /**
   * Save/Update a rule. Create or update the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param rule (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return UpdatedRuleResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedRuleResponse saveRule(
    String indexName,
    String objectID,
    Rule rule,
    Boolean forwardToReplicas
  ) throws ApiException {
    Call call = saveRuleValidateBeforeCall(
      indexName,
      objectID,
      rule,
      forwardToReplicas,
      null
    );
    Type returnType = new TypeToken<UpdatedRuleResponse>() {}.getType();
    ApiResponse<UpdatedRuleResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Save/Update a rule. (asynchronously) Create or update the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param rule (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call saveRuleAsync(
    String indexName,
    String objectID,
    Rule rule,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedRuleResponse> _callback
  ) throws ApiException {
    Call call = saveRuleValidateBeforeCall(
      indexName,
      objectID,
      rule,
      forwardToReplicas,
      _callback
    );
    Type returnType = new TypeToken<UpdatedRuleResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
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
   */
  private Call saveSynonymCall(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = synonymHit;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/synonyms/{objectID}".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "objectID" + "\\}",
          this.escapeString(objectID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (forwardToReplicas != null) {
      queryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "PUT", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call saveSynonymValidateBeforeCall(
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

    return saveSynonymCall(
      indexName,
      objectID,
      synonymHit,
      forwardToReplicas,
      _callback
    );
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
   */
  public SaveSynonymResponse saveSynonym(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas
  ) throws ApiException {
    Call call = saveSynonymValidateBeforeCall(
      indexName,
      objectID,
      synonymHit,
      forwardToReplicas,
      null
    );
    Type returnType = new TypeToken<SaveSynonymResponse>() {}.getType();
    ApiResponse<SaveSynonymResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call saveSynonymAsync(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas,
    final ApiCallback<SaveSynonymResponse> _callback
  ) throws ApiException {
    Call call = saveSynonymValidateBeforeCall(
      indexName,
      objectID,
      synonymHit,
      forwardToReplicas,
      _callback
    );
    Type returnType = new TypeToken<SaveSynonymResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
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
   */
  private Call saveSynonymsCall(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = synonymHit;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/synonyms/batch".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (forwardToReplicas != null) {
      queryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    if (replaceExistingSynonyms != null) {
      queryParams.addAll(
        this.parameterToPair("replaceExistingSynonyms", replaceExistingSynonyms)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call saveSynonymsValidateBeforeCall(
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

    return saveSynonymsCall(
      indexName,
      synonymHit,
      forwardToReplicas,
      replaceExistingSynonyms,
      _callback
    );
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
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse saveSynonyms(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms
  ) throws ApiException {
    Call call = saveSynonymsValidateBeforeCall(
      indexName,
      synonymHit,
      forwardToReplicas,
      replaceExistingSynonyms,
      null
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call saveSynonymsAsync(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = saveSynonymsValidateBeforeCall(
      indexName,
      synonymHit,
      forwardToReplicas,
      replaceExistingSynonyms,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for search
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call searchCall(
    String indexName,
    SearchParams searchParams,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = searchParams;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/query".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call searchValidateBeforeCall(
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

    return searchCall(indexName, searchParams, _callback);
  }

  /**
   * Get search results.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @return SearchResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public SearchResponse search(String indexName, SearchParams searchParams)
    throws ApiException {
    Call call = searchValidateBeforeCall(indexName, searchParams, null);
    Type returnType = new TypeToken<SearchResponse>() {}.getType();
    ApiResponse<SearchResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Get search results.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call searchAsync(
    String indexName,
    SearchParams searchParams,
    final ApiCallback<SearchResponse> _callback
  ) throws ApiException {
    Call call = searchValidateBeforeCall(indexName, searchParams, _callback);
    Type returnType = new TypeToken<SearchResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for searchDictionaryEntries
   *
   * @param dictionaryName The dictionary to search in. (required)
   * @param searchDictionaryEntries (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call searchDictionaryEntriesCall(
    String dictionaryName,
    SearchDictionaryEntries searchDictionaryEntries,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = searchDictionaryEntries;

    // create path and map variables
    String path =
      "/1/dictionaries/{dictionaryName}/search".replaceAll(
          "\\{" + "dictionaryName" + "\\}",
          this.escapeString(dictionaryName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call searchDictionaryEntriesValidateBeforeCall(
    String dictionaryName,
    SearchDictionaryEntries searchDictionaryEntries,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'dictionaryName' is set
    if (dictionaryName == null) {
      throw new ApiException(
        "Missing the required parameter 'dictionaryName' when calling" +
        " searchDictionaryEntries(Async)"
      );
    }

    // verify the required parameter 'searchDictionaryEntries' is set
    if (searchDictionaryEntries == null) {
      throw new ApiException(
        "Missing the required parameter 'searchDictionaryEntries' when calling" +
        " searchDictionaryEntries(Async)"
      );
    }

    return searchDictionaryEntriesCall(
      dictionaryName,
      searchDictionaryEntries,
      _callback
    );
  }

  /**
   * Search the dictionary entries. Search the dictionary entries.
   *
   * @param dictionaryName The dictionary to search in. (required)
   * @param searchDictionaryEntries (required)
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse searchDictionaryEntries(
    String dictionaryName,
    SearchDictionaryEntries searchDictionaryEntries
  ) throws ApiException {
    Call call = searchDictionaryEntriesValidateBeforeCall(
      dictionaryName,
      searchDictionaryEntries,
      null
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Search the dictionary entries. (asynchronously) Search the dictionary entries.
   *
   * @param dictionaryName The dictionary to search in. (required)
   * @param searchDictionaryEntries (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call searchDictionaryEntriesAsync(
    String dictionaryName,
    SearchDictionaryEntries searchDictionaryEntries,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = searchDictionaryEntriesValidateBeforeCall(
      dictionaryName,
      searchDictionaryEntries,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for searchForFacetValues
   *
   * @param indexName The index in which to perform the request. (required)
   * @param facetName The facet name. (required)
   * @param searchForFacetValuesRequest (optional)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call searchForFacetValuesCall(
    String indexName,
    String facetName,
    SearchForFacetValuesRequest searchForFacetValuesRequest,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = searchForFacetValuesRequest;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/facets/{facetName}/query".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll(
          "\\{" + "facetName" + "\\}",
          this.escapeString(facetName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call searchForFacetValuesValidateBeforeCall(
    String indexName,
    String facetName,
    SearchForFacetValuesRequest searchForFacetValuesRequest,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling searchForFacetValues(Async)"
      );
    }

    // verify the required parameter 'facetName' is set
    if (facetName == null) {
      throw new ApiException(
        "Missing the required parameter 'facetName' when calling searchForFacetValues(Async)"
      );
    }

    return searchForFacetValuesCall(
      indexName,
      facetName,
      searchForFacetValuesRequest,
      _callback
    );
  }

  /**
   * Search for values of a given facet Search for values of a given facet, optionally restricting
   * the returned values to those contained in objects matching other search criteria.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param facetName The facet name. (required)
   * @param searchForFacetValuesRequest (optional)
   * @return SearchForFacetValuesResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public SearchForFacetValuesResponse searchForFacetValues(
    String indexName,
    String facetName,
    SearchForFacetValuesRequest searchForFacetValuesRequest
  ) throws ApiException {
    Call call = searchForFacetValuesValidateBeforeCall(
      indexName,
      facetName,
      searchForFacetValuesRequest,
      null
    );
    Type returnType = new TypeToken<SearchForFacetValuesResponse>() {}
      .getType();
    ApiResponse<SearchForFacetValuesResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Search for values of a given facet (asynchronously) Search for values of a given facet,
   * optionally restricting the returned values to those contained in objects matching other search
   * criteria.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param facetName The facet name. (required)
   * @param searchForFacetValuesRequest (optional)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call searchForFacetValuesAsync(
    String indexName,
    String facetName,
    SearchForFacetValuesRequest searchForFacetValuesRequest,
    final ApiCallback<SearchForFacetValuesResponse> _callback
  ) throws ApiException {
    Call call = searchForFacetValuesValidateBeforeCall(
      indexName,
      facetName,
      searchForFacetValuesRequest,
      _callback
    );
    Type returnType = new TypeToken<SearchForFacetValuesResponse>() {}
      .getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for searchRules
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchRulesParams (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call searchRulesCall(
    String indexName,
    SearchRulesParams searchRulesParams,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = searchRulesParams;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/rules/search".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call searchRulesValidateBeforeCall(
    String indexName,
    SearchRulesParams searchRulesParams,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new ApiException(
        "Missing the required parameter 'indexName' when calling searchRules(Async)"
      );
    }

    // verify the required parameter 'searchRulesParams' is set
    if (searchRulesParams == null) {
      throw new ApiException(
        "Missing the required parameter 'searchRulesParams' when calling searchRules(Async)"
      );
    }

    return searchRulesCall(indexName, searchRulesParams, _callback);
  }

  /**
   * Search for rules. Search for rules matching various criteria.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchRulesParams (required)
   * @return SearchRulesResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public SearchRulesResponse searchRules(
    String indexName,
    SearchRulesParams searchRulesParams
  ) throws ApiException {
    Call call = searchRulesValidateBeforeCall(
      indexName,
      searchRulesParams,
      null
    );
    Type returnType = new TypeToken<SearchRulesResponse>() {}.getType();
    ApiResponse<SearchRulesResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Search for rules. (asynchronously) Search for rules matching various criteria.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchRulesParams (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call searchRulesAsync(
    String indexName,
    SearchRulesParams searchRulesParams,
    final ApiCallback<SearchRulesResponse> _callback
  ) throws ApiException {
    Call call = searchRulesValidateBeforeCall(
      indexName,
      searchRulesParams,
      _callback
    );
    Type returnType = new TypeToken<SearchRulesResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
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
   */
  private Call searchSynonymsCall(
    String indexName,
    String query,
    String type,
    Integer page,
    Integer hitsPerPage,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = null;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/synonyms/search".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (query != null) {
      queryParams.addAll(this.parameterToPair("query", query));
    }

    if (type != null) {
      queryParams.addAll(this.parameterToPair("type", type));
    }

    if (page != null) {
      queryParams.addAll(this.parameterToPair("Page", page));
    }

    if (hitsPerPage != null) {
      queryParams.addAll(this.parameterToPair("hitsPerPage", hitsPerPage));
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call searchSynonymsValidateBeforeCall(
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

    return searchSynonymsCall(
      indexName,
      query,
      type,
      page,
      hitsPerPage,
      _callback
    );
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
   */
  public SearchSynonymsResponse searchSynonyms(
    String indexName,
    String query,
    String type,
    Integer page,
    Integer hitsPerPage
  ) throws ApiException {
    Call call = searchSynonymsValidateBeforeCall(
      indexName,
      query,
      type,
      page,
      hitsPerPage,
      null
    );
    Type returnType = new TypeToken<SearchSynonymsResponse>() {}.getType();
    ApiResponse<SearchSynonymsResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call searchSynonymsAsync(
    String indexName,
    String query,
    String type,
    Integer page,
    Integer hitsPerPage,
    final ApiCallback<SearchSynonymsResponse> _callback
  ) throws ApiException {
    Call call = searchSynonymsValidateBeforeCall(
      indexName,
      query,
      type,
      page,
      hitsPerPage,
      _callback
    );
    Type returnType = new TypeToken<SearchSynonymsResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for searchUserIds
   *
   * @param searchUserIdsObject (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call searchUserIdsCall(
    SearchUserIdsObject searchUserIdsObject,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = searchUserIdsObject;

    // create path and map variables
    String path = "/1/clusters/mapping/search";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "POST", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call searchUserIdsValidateBeforeCall(
    SearchUserIdsObject searchUserIdsObject,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'searchUserIdsObject' is set
    if (searchUserIdsObject == null) {
      throw new ApiException(
        "Missing the required parameter 'searchUserIdsObject' when calling searchUserIds(Async)"
      );
    }

    return searchUserIdsCall(searchUserIdsObject, _callback);
  }

  /**
   * Search userID Search for userIDs. The data returned will usually be a few seconds behind real
   * time, because userID usage may take up to a few seconds propagate to the different clusters. To
   * keep updates moving quickly, the index of userIDs isn't built synchronously with the mapping.
   * Instead, the index is built once every 12h, at the same time as the update of userID usage. For
   * example, when you perform a modification like adding or moving a userID, the search will report
   * an outdated value until the next rebuild of the mapping, which takes place every 12h. Upon
   * success, the response is 200 OK and contains the following userIDs data.
   *
   * @param searchUserIdsObject (required)
   * @return SearchUserIdsResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public SearchUserIdsResponse searchUserIds(
    SearchUserIdsObject searchUserIdsObject
  ) throws ApiException {
    Call call = searchUserIdsValidateBeforeCall(searchUserIdsObject, null);
    Type returnType = new TypeToken<SearchUserIdsResponse>() {}.getType();
    ApiResponse<SearchUserIdsResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call searchUserIdsAsync(
    SearchUserIdsObject searchUserIdsObject,
    final ApiCallback<SearchUserIdsResponse> _callback
  ) throws ApiException {
    Call call = searchUserIdsValidateBeforeCall(searchUserIdsObject, _callback);
    Type returnType = new TypeToken<SearchUserIdsResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for setDictionarySettings
   *
   * @param dictionarySettingsRequest (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call setDictionarySettingsCall(
    DictionarySettingsRequest dictionarySettingsRequest,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = dictionarySettingsRequest;

    // create path and map variables
    String path = "/1/dictionaries/*/settings";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "PUT", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call setDictionarySettingsValidateBeforeCall(
    DictionarySettingsRequest dictionarySettingsRequest,
    final ApiCallback _callback
  ) throws ApiException {
    // verify the required parameter 'dictionarySettingsRequest' is set
    if (dictionarySettingsRequest == null) {
      throw new ApiException(
        "Missing the required parameter 'dictionarySettingsRequest' when calling" +
        " setDictionarySettings(Async)"
      );
    }

    return setDictionarySettingsCall(dictionarySettingsRequest, _callback);
  }

  /**
   * Set dictionary settings. Set dictionary settings.
   *
   * @param dictionarySettingsRequest (required)
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse setDictionarySettings(
    DictionarySettingsRequest dictionarySettingsRequest
  ) throws ApiException {
    Call call = setDictionarySettingsValidateBeforeCall(
      dictionarySettingsRequest,
      null
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Set dictionary settings. (asynchronously) Set dictionary settings.
   *
   * @param dictionarySettingsRequest (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call setDictionarySettingsAsync(
    DictionarySettingsRequest dictionarySettingsRequest,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = setDictionarySettingsValidateBeforeCall(
      dictionarySettingsRequest,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
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
   */
  private Call setSettingsCall(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = indexSettings;

    // create path and map variables
    String path =
      "/1/indexes/{indexName}/settings".replaceAll(
          "\\{" + "indexName" + "\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (forwardToReplicas != null) {
      queryParams.addAll(
        this.parameterToPair("forwardToReplicas", forwardToReplicas)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "PUT", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call setSettingsValidateBeforeCall(
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

    return setSettingsCall(
      indexName,
      indexSettings,
      forwardToReplicas,
      _callback
    );
  }

  /**
   * Update settings of a given indexName. Only specified settings are overridden; unspecified
   * settings are left unchanged. Specifying null for a setting resets it to its default value.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param indexSettings (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return UpdatedAtResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdatedAtResponse setSettings(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas
  ) throws ApiException {
    Call call = setSettingsValidateBeforeCall(
      indexName,
      indexSettings,
      forwardToReplicas,
      null
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
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
   */
  public Call setSettingsAsync(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> _callback
  ) throws ApiException {
    Call call = setSettingsValidateBeforeCall(
      indexName,
      indexSettings,
      forwardToReplicas,
      _callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }

  /**
   * Build call for updateApiKey
   *
   * @param key API Key string. (required)
   * @param apiKey (required)
   * @param _callback Callback for upload/download progress
   * @return Call to execute
   * @throws ApiException If fail to serialize the request body object
   */
  private Call updateApiKeyCall(
    String key,
    ApiKey apiKey,
    final ApiCallback _callback
  ) throws ApiException {
    Object body = apiKey;

    // create path and map variables
    String path =
      "/1/keys/{key}".replaceAll(
          "\\{" + "key" + "\\}",
          this.escapeString(key.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(path, "PUT", queryParams, body, headers, _callback);
  }

  @SuppressWarnings("rawtypes")
  private Call updateApiKeyValidateBeforeCall(
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

    return updateApiKeyCall(key, apiKey, _callback);
  }

  /**
   * Update an API key. Replace every permission of an existing API key.
   *
   * @param key API Key string. (required)
   * @param apiKey (required)
   * @return UpdateApiKeyResponse
   * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the
   *     response body
   */
  public UpdateApiKeyResponse updateApiKey(String key, ApiKey apiKey)
    throws ApiException {
    Call call = updateApiKeyValidateBeforeCall(key, apiKey, null);
    Type returnType = new TypeToken<UpdateApiKeyResponse>() {}.getType();
    ApiResponse<UpdateApiKeyResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * Update an API key. (asynchronously) Replace every permission of an existing API key.
   *
   * @param key API Key string. (required)
   * @param apiKey (required)
   * @param _callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws ApiException If fail to process the API call, e.g. serializing the request body object
   */
  public Call updateApiKeyAsync(
    String key,
    ApiKey apiKey,
    final ApiCallback<UpdateApiKeyResponse> _callback
  ) throws ApiException {
    Call call = updateApiKeyValidateBeforeCall(key, apiKey, _callback);
    Type returnType = new TypeToken<UpdateApiKeyResponse>() {}.getType();
    this.executeAsync(call, returnType, _callback);
    return call;
  }
}
