package com.algolia.search;

import com.algolia.ApiCallback;
import com.algolia.ApiClient;
import com.algolia.ApiResponse;
import com.algolia.Pair;
import com.algolia.exceptions.*;
import com.algolia.model.search.*;
import com.algolia.utils.*;
import com.algolia.utils.echo.*;
import com.algolia.utils.retry.CallType;
import com.algolia.utils.retry.StatefulHost;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import okhttp3.Call;

public class SearchApi extends ApiClient {

  public SearchApi(String appId, String apiKey) {
    super(appId, apiKey, new HttpRequester(getDefaultHosts(appId)));
  }

  public SearchApi(String appId, String apiKey, Requester requester) {
    super(appId, apiKey, requester);
  }

  private static List<StatefulHost> getDefaultHosts(String appId) {
    List<StatefulHost> hosts = new ArrayList<StatefulHost>();
    hosts.add(
      new StatefulHost(
        appId + "-dsn.algolia.net",
        "https",
        EnumSet.of(CallType.READ)
      )
    );
    hosts.add(
      new StatefulHost(
        appId + ".algolia.net",
        "https",
        EnumSet.of(CallType.WRITE)
      )
    );

    List<StatefulHost> commonHosts = new ArrayList<StatefulHost>();
    hosts.add(
      new StatefulHost(
        appId + "-1.algolianet.net",
        "https",
        EnumSet.of(CallType.READ, CallType.WRITE)
      )
    );
    hosts.add(
      new StatefulHost(
        appId + "-2.algolianet.net",
        "https",
        EnumSet.of(CallType.READ, CallType.WRITE)
      )
    );
    hosts.add(
      new StatefulHost(
        appId + "-3.algolianet.net",
        "https",
        EnumSet.of(CallType.READ, CallType.WRITE)
      )
    );

    Collections.shuffle(commonHosts, new Random());

    return Stream
      .concat(hosts.stream(), commonHosts.stream())
      .collect(Collectors.toList());
  }

  /**
   * Build call for addApiKey
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call addApiKeyCall(
    ApiKey apiKey,
    final ApiCallback<AddApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = apiKey;

    // create path and map variables
    String requestPath = "/1/keys";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call addApiKeyValidateBeforeCall(
    ApiKey apiKey,
    final ApiCallback<AddApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'apiKey' is set
    if (apiKey == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'apiKey' when calling addApiKey(Async)"
      );
    }

    return addApiKeyCall(apiKey, callback);
  }

  /**
   * Add a new API Key with specific permissions/restrictions.
   *
   * @param apiKey (required)
   * @return AddApiKeyResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public AddApiKeyResponse addApiKey(ApiKey apiKey)
    throws AlgoliaRuntimeException {
    Call req = addApiKeyValidateBeforeCall(apiKey, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.AddApiKey(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    ApiResponse<AddApiKeyResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Add a new API Key with specific permissions/restrictions.
   *
   * @param apiKey (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call addApiKeyAsync(
    ApiKey apiKey,
    final ApiCallback<AddApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = addApiKeyValidateBeforeCall(apiKey, callback);
    Type returnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for addOrUpdateObject
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call addOrUpdateObjectCall(
    String indexName,
    String objectID,
    Object body,
    final ApiCallback<UpdatedAtWithObjectIdResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = body;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/{objectID}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{objectID\\}", this.escapeString(objectID.toString()));

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "PUT",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call addOrUpdateObjectValidateBeforeCall(
    String indexName,
    String objectID,
    Object body,
    final ApiCallback<UpdatedAtWithObjectIdResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling addOrUpdateObject(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'objectID' when calling addOrUpdateObject(Async)"
      );
    }

    // verify the required parameter 'body' is set
    if (body == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'body' when calling addOrUpdateObject(Async)"
      );
    }

    return addOrUpdateObjectCall(indexName, objectID, body, callback);
  }

  /**
   * Add or replace an object with a given object ID. If the object does not exist, it will be
   * created. If it already exists, it will be replaced.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param body The Algolia object. (required)
   * @return UpdatedAtWithObjectIdResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtWithObjectIdResponse addOrUpdateObject(
    String indexName,
    String objectID,
    Object body
  ) throws AlgoliaRuntimeException {
    Call req = addOrUpdateObjectValidateBeforeCall(
      indexName,
      objectID,
      body,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.AddOrUpdateObject(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtWithObjectIdResponse>() {}
      .getType();
    ApiResponse<UpdatedAtWithObjectIdResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Add or replace an object with a given object ID. If the object does not exist,
   * it will be created. If it already exists, it will be replaced.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param body The Algolia object. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call addOrUpdateObjectAsync(
    String indexName,
    String objectID,
    Object body,
    final ApiCallback<UpdatedAtWithObjectIdResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = addOrUpdateObjectValidateBeforeCall(
      indexName,
      objectID,
      body,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtWithObjectIdResponse>() {}
      .getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for appendSource
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call appendSourceCall(
    Source source,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = source;

    // create path and map variables
    String requestPath = "/1/security/sources/append";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call appendSourceValidateBeforeCall(
    Source source,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'source' is set
    if (source == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'source' when calling appendSource(Async)"
      );
    }

    return appendSourceCall(source, callback);
  }

  /**
   * Add a single source to the list of allowed sources.
   *
   * @param source The source to add. (required)
   * @return CreatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public CreatedAtResponse appendSource(Source source)
    throws AlgoliaRuntimeException {
    Call req = appendSourceValidateBeforeCall(source, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.AppendSource(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    ApiResponse<CreatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Add a single source to the list of allowed sources.
   *
   * @param source The source to add. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call appendSourceAsync(
    Source source,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = appendSourceValidateBeforeCall(source, callback);
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for assignUserId
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call assignUserIdCall(
    String xAlgoliaUserID,
    AssignUserIdParams assignUserIdParams,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = assignUserIdParams;

    // create path and map variables
    String requestPath = "/1/clusters/mapping";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (xAlgoliaUserID != null) {
      queryParams.addAll(
        this.parameterToPair("X-Algolia-User-ID", xAlgoliaUserID)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call assignUserIdValidateBeforeCall(
    String xAlgoliaUserID,
    AssignUserIdParams assignUserIdParams,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'xAlgoliaUserID' is set
    if (xAlgoliaUserID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'xAlgoliaUserID' when calling assignUserId(Async)"
      );
    }

    // verify the required parameter 'assignUserIdParams' is set
    if (assignUserIdParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'assignUserIdParams' when calling assignUserId(Async)"
      );
    }

    return assignUserIdCall(xAlgoliaUserID, assignUserIdParams, callback);
  }

  /**
   * Assign or Move a userID to a cluster. The time it takes to migrate (move) a user is
   * proportional to the amount of data linked to the userID. Upon success, the response is 200 OK.
   * A successful response indicates that the operation has been taken into account, and the userID
   * is directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param assignUserIdParams (required)
   * @return CreatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public CreatedAtResponse assignUserId(
    String xAlgoliaUserID,
    AssignUserIdParams assignUserIdParams
  ) throws AlgoliaRuntimeException {
    Call req = assignUserIdValidateBeforeCall(
      xAlgoliaUserID,
      assignUserIdParams,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.AssignUserId(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    ApiResponse<CreatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Assign or Move a userID to a cluster. The time it takes to migrate (move) a
   * user is proportional to the amount of data linked to the userID. Upon success, the response is
   * 200 OK. A successful response indicates that the operation has been taken into account, and the
   * userID is directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param assignUserIdParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call assignUserIdAsync(
    String xAlgoliaUserID,
    AssignUserIdParams assignUserIdParams,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = assignUserIdValidateBeforeCall(
      xAlgoliaUserID,
      assignUserIdParams,
      callback
    );
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for batch
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call batchCall(
    String indexName,
    BatchWriteParams batchWriteParams,
    final ApiCallback<BatchResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = batchWriteParams;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/batch".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call batchValidateBeforeCall(
    String indexName,
    BatchWriteParams batchWriteParams,
    final ApiCallback<BatchResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling batch(Async)"
      );
    }

    // verify the required parameter 'batchWriteParams' is set
    if (batchWriteParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'batchWriteParams' when calling batch(Async)"
      );
    }

    return batchCall(indexName, batchWriteParams, callback);
  }

  /**
   * Performs multiple write operations in a single API call.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param batchWriteParams (required)
   * @return BatchResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public BatchResponse batch(
    String indexName,
    BatchWriteParams batchWriteParams
  ) throws AlgoliaRuntimeException {
    Call req = batchValidateBeforeCall(indexName, batchWriteParams, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.Batch(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<BatchResponse>() {}.getType();
    ApiResponse<BatchResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Performs multiple write operations in a single API call.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param batchWriteParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call batchAsync(
    String indexName,
    BatchWriteParams batchWriteParams,
    final ApiCallback<BatchResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = batchValidateBeforeCall(indexName, batchWriteParams, callback);
    Type returnType = new TypeToken<BatchResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for batchAssignUserIds
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call batchAssignUserIdsCall(
    String xAlgoliaUserID,
    BatchAssignUserIdsParams batchAssignUserIdsParams,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = batchAssignUserIdsParams;

    // create path and map variables
    String requestPath = "/1/clusters/mapping/batch";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (xAlgoliaUserID != null) {
      queryParams.addAll(
        this.parameterToPair("X-Algolia-User-ID", xAlgoliaUserID)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call batchAssignUserIdsValidateBeforeCall(
    String xAlgoliaUserID,
    BatchAssignUserIdsParams batchAssignUserIdsParams,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'xAlgoliaUserID' is set
    if (xAlgoliaUserID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'xAlgoliaUserID' when calling batchAssignUserIds(Async)"
      );
    }

    // verify the required parameter 'batchAssignUserIdsParams' is set
    if (batchAssignUserIdsParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'batchAssignUserIdsParams' when calling" +
        " batchAssignUserIds(Async)"
      );
    }

    return batchAssignUserIdsCall(
      xAlgoliaUserID,
      batchAssignUserIdsParams,
      callback
    );
  }

  /**
   * Assign multiple userIDs to a cluster. Upon success, the response is 200 OK. A successful
   * response indicates that the operation has been taken into account, and the userIDs are directly
   * usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param batchAssignUserIdsParams (required)
   * @return CreatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public CreatedAtResponse batchAssignUserIds(
    String xAlgoliaUserID,
    BatchAssignUserIdsParams batchAssignUserIdsParams
  ) throws AlgoliaRuntimeException {
    Call req = batchAssignUserIdsValidateBeforeCall(
      xAlgoliaUserID,
      batchAssignUserIdsParams,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.BatchAssignUserIds(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    ApiResponse<CreatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Assign multiple userIDs to a cluster. Upon success, the response is 200 OK. A
   * successful response indicates that the operation has been taken into account, and the userIDs
   * are directly usable.
   *
   * @param xAlgoliaUserID userID to assign. (required)
   * @param batchAssignUserIdsParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call batchAssignUserIdsAsync(
    String xAlgoliaUserID,
    BatchAssignUserIdsParams batchAssignUserIdsParams,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = batchAssignUserIdsValidateBeforeCall(
      xAlgoliaUserID,
      batchAssignUserIdsParams,
      callback
    );
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for batchDictionaryEntries
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call batchDictionaryEntriesCall(
    DictionaryType dictionaryName,
    BatchDictionaryEntriesParams batchDictionaryEntriesParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = batchDictionaryEntriesParams;

    // create path and map variables
    String requestPath =
      "/1/dictionaries/{dictionaryName}/batch".replaceAll(
          "\\{dictionaryName\\}",
          this.escapeString(dictionaryName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call batchDictionaryEntriesValidateBeforeCall(
    DictionaryType dictionaryName,
    BatchDictionaryEntriesParams batchDictionaryEntriesParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'dictionaryName' is set
    if (dictionaryName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'dictionaryName' when calling" +
        " batchDictionaryEntries(Async)"
      );
    }

    // verify the required parameter 'batchDictionaryEntriesParams' is set
    if (batchDictionaryEntriesParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'batchDictionaryEntriesParams' when calling" +
        " batchDictionaryEntries(Async)"
      );
    }

    return batchDictionaryEntriesCall(
      dictionaryName,
      batchDictionaryEntriesParams,
      callback
    );
  }

  /**
   * Send a batch of dictionary entries.
   *
   * @param dictionaryName The dictionary to search in. (required)
   * @param batchDictionaryEntriesParams (required)
   * @return UpdatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse batchDictionaryEntries(
    DictionaryType dictionaryName,
    BatchDictionaryEntriesParams batchDictionaryEntriesParams
  ) throws AlgoliaRuntimeException {
    Call req = batchDictionaryEntriesValidateBeforeCall(
      dictionaryName,
      batchDictionaryEntriesParams,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.BatchDictionaryEntries(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Send a batch of dictionary entries.
   *
   * @param dictionaryName The dictionary to search in. (required)
   * @param batchDictionaryEntriesParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call batchDictionaryEntriesAsync(
    DictionaryType dictionaryName,
    BatchDictionaryEntriesParams batchDictionaryEntriesParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = batchDictionaryEntriesValidateBeforeCall(
      dictionaryName,
      batchDictionaryEntriesParams,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for batchRules
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call batchRulesCall(
    String indexName,
    List<Rule> rule,
    Boolean forwardToReplicas,
    Boolean clearExistingRules,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = rule;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/rules/batch".replaceAll(
          "\\{indexName\\}",
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

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call batchRulesValidateBeforeCall(
    String indexName,
    List<Rule> rule,
    Boolean forwardToReplicas,
    Boolean clearExistingRules,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling batchRules(Async)"
      );
    }

    // verify the required parameter 'rule' is set
    if (rule == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'rule' when calling batchRules(Async)"
      );
    }

    return batchRulesCall(
      indexName,
      rule,
      forwardToReplicas,
      clearExistingRules,
      callback
    );
  }

  /**
   * Create or update a batch of Rules.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param rule (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param clearExistingRules When true, existing Rules are cleared before adding this batch. When
   *     false, existing Rules are kept. (optional)
   * @return UpdatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse batchRules(
    String indexName,
    List<Rule> rule,
    Boolean forwardToReplicas,
    Boolean clearExistingRules
  ) throws AlgoliaRuntimeException {
    Call req = batchRulesValidateBeforeCall(
      indexName,
      rule,
      forwardToReplicas,
      clearExistingRules,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.BatchRules(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public UpdatedAtResponse batchRules(String indexName, List<Rule> rule)
    throws AlgoliaRuntimeException {
    return this.batchRules(indexName, rule, null, null);
  }

  /**
   * (asynchronously) Create or update a batch of Rules.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param rule (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param clearExistingRules When true, existing Rules are cleared before adding this batch. When
   *     false, existing Rules are kept. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call batchRulesAsync(
    String indexName,
    List<Rule> rule,
    Boolean forwardToReplicas,
    Boolean clearExistingRules,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = batchRulesValidateBeforeCall(
      indexName,
      rule,
      forwardToReplicas,
      clearExistingRules,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for browse
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call browseCall(
    String indexName,
    BrowseRequest browseRequest,
    final ApiCallback<BrowseResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = browseRequest;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/browse".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call browseValidateBeforeCall(
    String indexName,
    BrowseRequest browseRequest,
    final ApiCallback<BrowseResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling browse(Async)"
      );
    }

    return browseCall(indexName, browseRequest, callback);
  }

  /**
   * This method allows you to retrieve all index content. It can retrieve up to 1,000 records per
   * call and supports full text search and filters. For performance reasons, some features are not
   * supported, including `distinct`, sorting by `typos`, `words` or `geo distance`. When there is
   * more content to be browsed, the response contains a cursor field. This cursor has to be passed
   * to the subsequent call to browse in order to get the next page of results. When the end of the
   * index has been reached, the cursor field is absent from the response.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param browseRequest (optional)
   * @return BrowseResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public BrowseResponse browse(String indexName, BrowseRequest browseRequest)
    throws AlgoliaRuntimeException {
    Call req = browseValidateBeforeCall(indexName, browseRequest, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.Browse(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<BrowseResponse>() {}.getType();
    ApiResponse<BrowseResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public BrowseResponse browse(String indexName)
    throws AlgoliaRuntimeException {
    return this.browse(indexName, null);
  }

  /**
   * (asynchronously) This method allows you to retrieve all index content. It can retrieve up to
   * 1,000 records per call and supports full text search and filters. For performance reasons, some
   * features are not supported, including &#x60;distinct&#x60;, sorting by &#x60;typos&#x60;,
   * &#x60;words&#x60; or &#x60;geo distance&#x60;. When there is more content to be browsed, the
   * response contains a cursor field. This cursor has to be passed to the subsequent call to browse
   * in order to get the next page of results. When the end of the index has been reached, the
   * cursor field is absent from the response.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param browseRequest (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call browseAsync(
    String indexName,
    BrowseRequest browseRequest,
    final ApiCallback<BrowseResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = browseValidateBeforeCall(indexName, browseRequest, callback);
    Type returnType = new TypeToken<BrowseResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for clearAllSynonyms
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call clearAllSynonymsCall(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/synonyms/clear".replaceAll(
          "\\{indexName\\}",
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

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call clearAllSynonymsValidateBeforeCall(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling clearAllSynonyms(Async)"
      );
    }

    return clearAllSynonymsCall(indexName, forwardToReplicas, callback);
  }

  /**
   * Remove all synonyms from an index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return UpdatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse clearAllSynonyms(
    String indexName,
    Boolean forwardToReplicas
  ) throws AlgoliaRuntimeException {
    Call req = clearAllSynonymsValidateBeforeCall(
      indexName,
      forwardToReplicas,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.ClearAllSynonyms(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public UpdatedAtResponse clearAllSynonyms(String indexName)
    throws AlgoliaRuntimeException {
    return this.clearAllSynonyms(indexName, null);
  }

  /**
   * (asynchronously) Remove all synonyms from an index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call clearAllSynonymsAsync(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = clearAllSynonymsValidateBeforeCall(
      indexName,
      forwardToReplicas,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for clearObjects
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call clearObjectsCall(
    String indexName,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/clear".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call clearObjectsValidateBeforeCall(
    String indexName,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling clearObjects(Async)"
      );
    }

    return clearObjectsCall(indexName, callback);
  }

  /**
   * Delete an index's content, but leave settings and index-specific API keys untouched.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return UpdatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse clearObjects(String indexName)
    throws AlgoliaRuntimeException {
    Call req = clearObjectsValidateBeforeCall(indexName, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.ClearObjects(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Delete an index&#39;s content, but leave settings and index-specific API keys
   * untouched.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call clearObjectsAsync(
    String indexName,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = clearObjectsValidateBeforeCall(indexName, callback);
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for clearRules
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call clearRulesCall(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/rules/clear".replaceAll(
          "\\{indexName\\}",
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

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call clearRulesValidateBeforeCall(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling clearRules(Async)"
      );
    }

    return clearRulesCall(indexName, forwardToReplicas, callback);
  }

  /**
   * Delete all Rules in the index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return UpdatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse clearRules(
    String indexName,
    Boolean forwardToReplicas
  ) throws AlgoliaRuntimeException {
    Call req = clearRulesValidateBeforeCall(indexName, forwardToReplicas, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.ClearRules(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public UpdatedAtResponse clearRules(String indexName)
    throws AlgoliaRuntimeException {
    return this.clearRules(indexName, null);
  }

  /**
   * (asynchronously) Delete all Rules in the index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call clearRulesAsync(
    String indexName,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = clearRulesValidateBeforeCall(
      indexName,
      forwardToReplicas,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for del
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call delCall(
    String path,
    Map<String, Object> parameters,
    Object body,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = body;

    // create path and map variables
    String requestPath = "/1{path}".replaceAll("\\{path\\}", path.toString());

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (parameters != null) {
      for (Map.Entry<String, Object> parameter : parameters.entrySet()) {
        queryParams.addAll(
          this.parameterToPair(
              parameter.getKey(),
              parameter.getValue().toString()
            )
        );
      }
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "DELETE",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call delValidateBeforeCall(
    String path,
    Map<String, Object> parameters,
    Object body,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'path' is set
    if (path == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'path' when calling del(Async)"
      );
    }

    return delCall(path, parameters, body, callback);
  }

  /**
   * This method allow you to send requests to the Algolia REST API.
   *
   * @param path The path of the API endpoint to target, anything after the /1 needs to be
   *     specified. (required)
   * @param parameters Query parameters to be applied to the current query. (optional)
   * @param body The parameters to send with the custom request. (optional)
   * @return Object
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public Object del(String path, Map<String, Object> parameters, Object body)
    throws AlgoliaRuntimeException {
    Call req = delValidateBeforeCall(path, parameters, body, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.Del(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<Object>() {}.getType();
    ApiResponse<Object> res = this.execute(call, returnType);
    return res.getData();
  }

  public Object del(String path) throws AlgoliaRuntimeException {
    return this.del(path, new HashMap<>(), null);
  }

  /**
   * (asynchronously) This method allow you to send requests to the Algolia REST API.
   *
   * @param path The path of the API endpoint to target, anything after the /1 needs to be
   *     specified. (required)
   * @param parameters Query parameters to be applied to the current query. (optional)
   * @param body The parameters to send with the custom request. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call delAsync(
    String path,
    Map<String, Object> parameters,
    Object body,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    Call call = delValidateBeforeCall(path, parameters, body, callback);
    Type returnType = new TypeToken<Object>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for deleteApiKey
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call deleteApiKeyCall(
    String key,
    final ApiCallback<DeleteApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/keys/{key}".replaceAll(
          "\\{key\\}",
          this.escapeString(key.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "DELETE",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call deleteApiKeyValidateBeforeCall(
    String key,
    final ApiCallback<DeleteApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'key' when calling deleteApiKey(Async)"
      );
    }

    return deleteApiKeyCall(key, callback);
  }

  /**
   * Delete an existing API Key.
   *
   * @param key API Key string. (required)
   * @return DeleteApiKeyResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public DeleteApiKeyResponse deleteApiKey(String key)
    throws AlgoliaRuntimeException {
    Call req = deleteApiKeyValidateBeforeCall(key, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.DeleteApiKey(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<DeleteApiKeyResponse>() {}.getType();
    ApiResponse<DeleteApiKeyResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Delete an existing API Key.
   *
   * @param key API Key string. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call deleteApiKeyAsync(
    String key,
    final ApiCallback<DeleteApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = deleteApiKeyValidateBeforeCall(key, callback);
    Type returnType = new TypeToken<DeleteApiKeyResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for deleteBy
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call deleteByCall(
    String indexName,
    SearchParams searchParams,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = searchParams;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/deleteByQuery".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call deleteByValidateBeforeCall(
    String indexName,
    SearchParams searchParams,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling deleteBy(Async)"
      );
    }

    // verify the required parameter 'searchParams' is set
    if (searchParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'searchParams' when calling deleteBy(Async)"
      );
    }

    return deleteByCall(indexName, searchParams, callback);
  }

  /**
   * Remove all objects matching a filter (including geo filters). This method enables you to delete
   * one or more objects based on filters (numeric, facet, tag or geo queries). It doesn't accept
   * empty filters or a query.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @return DeletedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public DeletedAtResponse deleteBy(
    String indexName,
    SearchParams searchParams
  ) throws AlgoliaRuntimeException {
    Call req = deleteByValidateBeforeCall(indexName, searchParams, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.DeleteBy(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    ApiResponse<DeletedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Remove all objects matching a filter (including geo filters). This method
   * enables you to delete one or more objects based on filters (numeric, facet, tag or geo
   * queries). It doesn&#39;t accept empty filters or a query.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call deleteByAsync(
    String indexName,
    SearchParams searchParams,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = deleteByValidateBeforeCall(indexName, searchParams, callback);
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for deleteIndex
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call deleteIndexCall(
    String indexName,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "DELETE",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call deleteIndexValidateBeforeCall(
    String indexName,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling deleteIndex(Async)"
      );
    }

    return deleteIndexCall(indexName, callback);
  }

  /**
   * Delete an existing index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return DeletedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public DeletedAtResponse deleteIndex(String indexName)
    throws AlgoliaRuntimeException {
    Call req = deleteIndexValidateBeforeCall(indexName, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.DeleteIndex(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    ApiResponse<DeletedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Delete an existing index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call deleteIndexAsync(
    String indexName,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = deleteIndexValidateBeforeCall(indexName, callback);
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for deleteObject
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call deleteObjectCall(
    String indexName,
    String objectID,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/{objectID}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{objectID\\}", this.escapeString(objectID.toString()));

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "DELETE",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call deleteObjectValidateBeforeCall(
    String indexName,
    String objectID,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling deleteObject(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'objectID' when calling deleteObject(Async)"
      );
    }

    return deleteObjectCall(indexName, objectID, callback);
  }

  /**
   * Delete an existing object.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @return DeletedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public DeletedAtResponse deleteObject(String indexName, String objectID)
    throws AlgoliaRuntimeException {
    Call req = deleteObjectValidateBeforeCall(indexName, objectID, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.DeleteObject(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    ApiResponse<DeletedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Delete an existing object.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call deleteObjectAsync(
    String indexName,
    String objectID,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = deleteObjectValidateBeforeCall(indexName, objectID, callback);
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for deleteRule
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call deleteRuleCall(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/rules/{objectID}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{objectID\\}", this.escapeString(objectID.toString()));

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
        requestPath,
        "DELETE",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call deleteRuleValidateBeforeCall(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling deleteRule(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'objectID' when calling deleteRule(Async)"
      );
    }

    return deleteRuleCall(indexName, objectID, forwardToReplicas, callback);
  }

  /**
   * Delete the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return UpdatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse deleteRule(
    String indexName,
    String objectID,
    Boolean forwardToReplicas
  ) throws AlgoliaRuntimeException {
    Call req = deleteRuleValidateBeforeCall(
      indexName,
      objectID,
      forwardToReplicas,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.DeleteRule(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public UpdatedAtResponse deleteRule(String indexName, String objectID)
    throws AlgoliaRuntimeException {
    return this.deleteRule(indexName, objectID, null);
  }

  /**
   * (asynchronously) Delete the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call deleteRuleAsync(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = deleteRuleValidateBeforeCall(
      indexName,
      objectID,
      forwardToReplicas,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for deleteSource
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call deleteSourceCall(
    String source,
    final ApiCallback<DeleteSourceResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/security/sources/{source}".replaceAll(
          "\\{source\\}",
          this.escapeString(source.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "DELETE",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call deleteSourceValidateBeforeCall(
    String source,
    final ApiCallback<DeleteSourceResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'source' is set
    if (source == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'source' when calling deleteSource(Async)"
      );
    }

    return deleteSourceCall(source, callback);
  }

  /**
   * Remove a single source from the list of allowed sources.
   *
   * @param source The IP range of the source. (required)
   * @return DeleteSourceResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public DeleteSourceResponse deleteSource(String source)
    throws AlgoliaRuntimeException {
    Call req = deleteSourceValidateBeforeCall(source, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.DeleteSource(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<DeleteSourceResponse>() {}.getType();
    ApiResponse<DeleteSourceResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Remove a single source from the list of allowed sources.
   *
   * @param source The IP range of the source. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call deleteSourceAsync(
    String source,
    final ApiCallback<DeleteSourceResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = deleteSourceValidateBeforeCall(source, callback);
    Type returnType = new TypeToken<DeleteSourceResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for deleteSynonym
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call deleteSynonymCall(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/synonyms/{objectID}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{objectID\\}", this.escapeString(objectID.toString()));

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
        requestPath,
        "DELETE",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call deleteSynonymValidateBeforeCall(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling deleteSynonym(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'objectID' when calling deleteSynonym(Async)"
      );
    }

    return deleteSynonymCall(indexName, objectID, forwardToReplicas, callback);
  }

  /**
   * Delete a single synonyms set, identified by the given objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return DeletedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public DeletedAtResponse deleteSynonym(
    String indexName,
    String objectID,
    Boolean forwardToReplicas
  ) throws AlgoliaRuntimeException {
    Call req = deleteSynonymValidateBeforeCall(
      indexName,
      objectID,
      forwardToReplicas,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.DeleteSynonym(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    ApiResponse<DeletedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public DeletedAtResponse deleteSynonym(String indexName, String objectID)
    throws AlgoliaRuntimeException {
    return this.deleteSynonym(indexName, objectID, null);
  }

  /**
   * (asynchronously) Delete a single synonyms set, identified by the given objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call deleteSynonymAsync(
    String indexName,
    String objectID,
    Boolean forwardToReplicas,
    final ApiCallback<DeletedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = deleteSynonymValidateBeforeCall(
      indexName,
      objectID,
      forwardToReplicas,
      callback
    );
    Type returnType = new TypeToken<DeletedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for get
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getCall(
    String path,
    Map<String, Object> parameters,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1{path}".replaceAll("\\{path\\}", path.toString());

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (parameters != null) {
      for (Map.Entry<String, Object> parameter : parameters.entrySet()) {
        queryParams.addAll(
          this.parameterToPair(
              parameter.getKey(),
              parameter.getValue().toString()
            )
        );
      }
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getValidateBeforeCall(
    String path,
    Map<String, Object> parameters,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'path' is set
    if (path == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'path' when calling get(Async)"
      );
    }

    return getCall(path, parameters, callback);
  }

  /**
   * This method allow you to send requests to the Algolia REST API.
   *
   * @param path The path of the API endpoint to target, anything after the /1 needs to be
   *     specified. (required)
   * @param parameters Query parameters to be applied to the current query. (optional)
   * @return Object
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public Object get(String path, Map<String, Object> parameters)
    throws AlgoliaRuntimeException {
    Call req = getValidateBeforeCall(path, parameters, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.Get(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<Object>() {}.getType();
    ApiResponse<Object> res = this.execute(call, returnType);
    return res.getData();
  }

  public Object get(String path) throws AlgoliaRuntimeException {
    return this.get(path, new HashMap<>());
  }

  /**
   * (asynchronously) This method allow you to send requests to the Algolia REST API.
   *
   * @param path The path of the API endpoint to target, anything after the /1 needs to be
   *     specified. (required)
   * @param parameters Query parameters to be applied to the current query. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getAsync(
    String path,
    Map<String, Object> parameters,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    Call call = getValidateBeforeCall(path, parameters, callback);
    Type returnType = new TypeToken<Object>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getApiKey
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getApiKeyCall(String key, final ApiCallback<Key> callback)
    throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/keys/{key}".replaceAll(
          "\\{key\\}",
          this.escapeString(key.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getApiKeyValidateBeforeCall(
    String key,
    final ApiCallback<Key> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'key' when calling getApiKey(Async)"
      );
    }

    return getApiKeyCall(key, callback);
  }

  /**
   * Get the permissions of an API key.
   *
   * @param key API Key string. (required)
   * @return Key
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public Key getApiKey(String key) throws AlgoliaRuntimeException {
    Call req = getApiKeyValidateBeforeCall(key, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetApiKey(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<Key>() {}.getType();
    ApiResponse<Key> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Get the permissions of an API key.
   *
   * @param key API Key string. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getApiKeyAsync(String key, final ApiCallback<Key> callback)
    throws AlgoliaRuntimeException {
    Call call = getApiKeyValidateBeforeCall(key, callback);
    Type returnType = new TypeToken<Key>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getDictionaryLanguages
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getDictionaryLanguagesCall(
    final ApiCallback<Map<String, Languages>> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/dictionaries/*/languages";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getDictionaryLanguagesValidateBeforeCall(
    final ApiCallback<Map<String, Languages>> callback
  ) throws AlgoliaRuntimeException {
    return getDictionaryLanguagesCall(callback);
  }

  /**
   * List dictionaries supported per language.
   *
   * @return Map&lt;String, Languages&gt;
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public Map<String, Languages> getDictionaryLanguages()
    throws AlgoliaRuntimeException {
    Call req = getDictionaryLanguagesValidateBeforeCall(null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetDictionaryLanguages(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<Map<String, Languages>>() {}.getType();
    ApiResponse<Map<String, Languages>> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) List dictionaries supported per language.
   *
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getDictionaryLanguagesAsync(
    final ApiCallback<Map<String, Languages>> callback
  ) throws AlgoliaRuntimeException {
    Call call = getDictionaryLanguagesValidateBeforeCall(callback);
    Type returnType = new TypeToken<Map<String, Languages>>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getDictionarySettings
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getDictionarySettingsCall(
    final ApiCallback<GetDictionarySettingsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/dictionaries/*/settings";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getDictionarySettingsValidateBeforeCall(
    final ApiCallback<GetDictionarySettingsResponse> callback
  ) throws AlgoliaRuntimeException {
    return getDictionarySettingsCall(callback);
  }

  /**
   * Retrieve dictionaries settings.
   *
   * @return GetDictionarySettingsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetDictionarySettingsResponse getDictionarySettings()
    throws AlgoliaRuntimeException {
    Call req = getDictionarySettingsValidateBeforeCall(null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetDictionarySettings(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetDictionarySettingsResponse>() {}
      .getType();
    ApiResponse<GetDictionarySettingsResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Retrieve dictionaries settings.
   *
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getDictionarySettingsAsync(
    final ApiCallback<GetDictionarySettingsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getDictionarySettingsValidateBeforeCall(callback);
    Type returnType = new TypeToken<GetDictionarySettingsResponse>() {}
      .getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getLogs
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getLogsCall(
    Integer offset,
    Integer length,
    String indexName,
    LogType type,
    final ApiCallback<GetLogsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/logs";

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

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getLogsValidateBeforeCall(
    Integer offset,
    Integer length,
    String indexName,
    LogType type,
    final ApiCallback<GetLogsResponse> callback
  ) throws AlgoliaRuntimeException {
    return getLogsCall(offset, length, indexName, type, callback);
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
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetLogsResponse getLogs(
    Integer offset,
    Integer length,
    String indexName,
    LogType type
  ) throws AlgoliaRuntimeException {
    Call req = getLogsValidateBeforeCall(offset, length, indexName, type, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetLogs(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetLogsResponse>() {}.getType();
    ApiResponse<GetLogsResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public GetLogsResponse getLogs() throws AlgoliaRuntimeException {
    return this.getLogs(0, 10, null, LogType.ALL);
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
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getLogsAsync(
    Integer offset,
    Integer length,
    String indexName,
    LogType type,
    final ApiCallback<GetLogsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getLogsValidateBeforeCall(
      offset,
      length,
      indexName,
      type,
      callback
    );
    Type returnType = new TypeToken<GetLogsResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getObject
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getObjectCall(
    String indexName,
    String objectID,
    List<String> attributesToRetrieve,
    final ApiCallback<Map<String, String>> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/{objectID}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{objectID\\}", this.escapeString(objectID.toString()));

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (attributesToRetrieve != null) {
      queryParams.addAll(
        this.parameterToPair("attributesToRetrieve", attributesToRetrieve)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getObjectValidateBeforeCall(
    String indexName,
    String objectID,
    List<String> attributesToRetrieve,
    final ApiCallback<Map<String, String>> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling getObject(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'objectID' when calling getObject(Async)"
      );
    }

    return getObjectCall(indexName, objectID, attributesToRetrieve, callback);
  }

  /**
   * Retrieve one object from the index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param attributesToRetrieve List of attributes to retrieve. If not specified, all retrievable
   *     attributes are returned. (optional)
   * @return Map&lt;String, String&gt;
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public Map<String, String> getObject(
    String indexName,
    String objectID,
    List<String> attributesToRetrieve
  ) throws AlgoliaRuntimeException {
    Call req = getObjectValidateBeforeCall(
      indexName,
      objectID,
      attributesToRetrieve,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetObject(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<Map<String, String>>() {}.getType();
    ApiResponse<Map<String, String>> res = this.execute(call, returnType);
    return res.getData();
  }

  public Map<String, String> getObject(String indexName, String objectID)
    throws AlgoliaRuntimeException {
    return this.getObject(indexName, objectID, new ArrayList<>());
  }

  /**
   * (asynchronously) Retrieve one object from the index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param attributesToRetrieve List of attributes to retrieve. If not specified, all retrievable
   *     attributes are returned. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getObjectAsync(
    String indexName,
    String objectID,
    List<String> attributesToRetrieve,
    final ApiCallback<Map<String, String>> callback
  ) throws AlgoliaRuntimeException {
    Call call = getObjectValidateBeforeCall(
      indexName,
      objectID,
      attributesToRetrieve,
      callback
    );
    Type returnType = new TypeToken<Map<String, String>>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getObjects
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getObjectsCall(
    GetObjectsParams getObjectsParams,
    final ApiCallback<GetObjectsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = getObjectsParams;

    // create path and map variables
    String requestPath = "/1/indexes/*/objects";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getObjectsValidateBeforeCall(
    GetObjectsParams getObjectsParams,
    final ApiCallback<GetObjectsResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'getObjectsParams' is set
    if (getObjectsParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'getObjectsParams' when calling getObjects(Async)"
      );
    }

    return getObjectsCall(getObjectsParams, callback);
  }

  /**
   * Retrieve one or more objects, potentially from different indices, in a single API call.
   *
   * @param getObjectsParams (required)
   * @return GetObjectsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetObjectsResponse getObjects(GetObjectsParams getObjectsParams)
    throws AlgoliaRuntimeException {
    Call req = getObjectsValidateBeforeCall(getObjectsParams, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetObjects(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetObjectsResponse>() {}.getType();
    ApiResponse<GetObjectsResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Retrieve one or more objects, potentially from different indices, in a single
   * API call.
   *
   * @param getObjectsParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getObjectsAsync(
    GetObjectsParams getObjectsParams,
    final ApiCallback<GetObjectsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getObjectsValidateBeforeCall(getObjectsParams, callback);
    Type returnType = new TypeToken<GetObjectsResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getRule
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getRuleCall(
    String indexName,
    String objectID,
    final ApiCallback<Rule> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/rules/{objectID}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{objectID\\}", this.escapeString(objectID.toString()));

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getRuleValidateBeforeCall(
    String indexName,
    String objectID,
    final ApiCallback<Rule> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling getRule(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'objectID' when calling getRule(Async)"
      );
    }

    return getRuleCall(indexName, objectID, callback);
  }

  /**
   * Retrieve the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @return Rule
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public Rule getRule(String indexName, String objectID)
    throws AlgoliaRuntimeException {
    Call req = getRuleValidateBeforeCall(indexName, objectID, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetRule(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<Rule>() {}.getType();
    ApiResponse<Rule> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Retrieve the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getRuleAsync(
    String indexName,
    String objectID,
    final ApiCallback<Rule> callback
  ) throws AlgoliaRuntimeException {
    Call call = getRuleValidateBeforeCall(indexName, objectID, callback);
    Type returnType = new TypeToken<Rule>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getSettings
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getSettingsCall(
    String indexName,
    final ApiCallback<IndexSettings> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/settings".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getSettingsValidateBeforeCall(
    String indexName,
    final ApiCallback<IndexSettings> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling getSettings(Async)"
      );
    }

    return getSettingsCall(indexName, callback);
  }

  /**
   * Retrieve settings of a given indexName.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return IndexSettings
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public IndexSettings getSettings(String indexName)
    throws AlgoliaRuntimeException {
    Call req = getSettingsValidateBeforeCall(indexName, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetSettings(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<IndexSettings>() {}.getType();
    ApiResponse<IndexSettings> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Retrieve settings of a given indexName.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getSettingsAsync(
    String indexName,
    final ApiCallback<IndexSettings> callback
  ) throws AlgoliaRuntimeException {
    Call call = getSettingsValidateBeforeCall(indexName, callback);
    Type returnType = new TypeToken<IndexSettings>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getSources
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getSourcesCall(final ApiCallback<List<Source>> callback)
    throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/security/sources";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getSourcesValidateBeforeCall(
    final ApiCallback<List<Source>> callback
  ) throws AlgoliaRuntimeException {
    return getSourcesCall(callback);
  }

  /**
   * List all allowed sources.
   *
   * @return List&lt;Source&gt;
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public List<Source> getSources() throws AlgoliaRuntimeException {
    Call req = getSourcesValidateBeforeCall(null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetSources(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<List<Source>>() {}.getType();
    ApiResponse<List<Source>> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) List all allowed sources.
   *
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getSourcesAsync(final ApiCallback<List<Source>> callback)
    throws AlgoliaRuntimeException {
    Call call = getSourcesValidateBeforeCall(callback);
    Type returnType = new TypeToken<List<Source>>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getSynonym
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getSynonymCall(
    String indexName,
    String objectID,
    final ApiCallback<SynonymHit> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/synonyms/{objectID}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{objectID\\}", this.escapeString(objectID.toString()));

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getSynonymValidateBeforeCall(
    String indexName,
    String objectID,
    final ApiCallback<SynonymHit> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling getSynonym(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'objectID' when calling getSynonym(Async)"
      );
    }

    return getSynonymCall(indexName, objectID, callback);
  }

  /**
   * Fetch a synonym object identified by its objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @return SynonymHit
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SynonymHit getSynonym(String indexName, String objectID)
    throws AlgoliaRuntimeException {
    Call req = getSynonymValidateBeforeCall(indexName, objectID, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetSynonym(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SynonymHit>() {}.getType();
    ApiResponse<SynonymHit> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Fetch a synonym object identified by its objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getSynonymAsync(
    String indexName,
    String objectID,
    final ApiCallback<SynonymHit> callback
  ) throws AlgoliaRuntimeException {
    Call call = getSynonymValidateBeforeCall(indexName, objectID, callback);
    Type returnType = new TypeToken<SynonymHit>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getTask
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getTaskCall(
    String indexName,
    Integer taskID,
    final ApiCallback<GetTaskResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/task/{taskID}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{taskID\\}", this.escapeString(taskID.toString()));

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getTaskValidateBeforeCall(
    String indexName,
    Integer taskID,
    final ApiCallback<GetTaskResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling getTask(Async)"
      );
    }

    // verify the required parameter 'taskID' is set
    if (taskID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'taskID' when calling getTask(Async)"
      );
    }

    return getTaskCall(indexName, taskID, callback);
  }

  /**
   * Check the current status of a given task.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param taskID Unique identifier of an task. Numeric value (up to 64bits). (required)
   * @return GetTaskResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetTaskResponse getTask(String indexName, Integer taskID)
    throws AlgoliaRuntimeException {
    Call req = getTaskValidateBeforeCall(indexName, taskID, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetTask(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetTaskResponse>() {}.getType();
    ApiResponse<GetTaskResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Check the current status of a given task.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param taskID Unique identifier of an task. Numeric value (up to 64bits). (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getTaskAsync(
    String indexName,
    Integer taskID,
    final ApiCallback<GetTaskResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getTaskValidateBeforeCall(indexName, taskID, callback);
    Type returnType = new TypeToken<GetTaskResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getTopUserIds
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getTopUserIdsCall(
    final ApiCallback<GetTopUserIdsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/clusters/mapping/top";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getTopUserIdsValidateBeforeCall(
    final ApiCallback<GetTopUserIdsResponse> callback
  ) throws AlgoliaRuntimeException {
    return getTopUserIdsCall(callback);
  }

  /**
   * Get the top 10 userIDs with the highest number of records per cluster. The data returned will
   * usually be a few seconds behind real time, because userID usage may take up to a few seconds to
   * propagate to the different clusters. Upon success, the response is 200 OK and contains the
   * following array of userIDs and clusters.
   *
   * @return GetTopUserIdsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetTopUserIdsResponse getTopUserIds() throws AlgoliaRuntimeException {
    Call req = getTopUserIdsValidateBeforeCall(null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetTopUserIds(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetTopUserIdsResponse>() {}.getType();
    ApiResponse<GetTopUserIdsResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Get the top 10 userIDs with the highest number of records per cluster. The
   * data returned will usually be a few seconds behind real time, because userID usage may take up
   * to a few seconds to propagate to the different clusters. Upon success, the response is 200 OK
   * and contains the following array of userIDs and clusters.
   *
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getTopUserIdsAsync(
    final ApiCallback<GetTopUserIdsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getTopUserIdsValidateBeforeCall(callback);
    Type returnType = new TypeToken<GetTopUserIdsResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getUserId
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getUserIdCall(String userID, final ApiCallback<UserId> callback)
    throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/clusters/mapping/{userID}".replaceAll(
          "\\{userID\\}",
          this.escapeString(userID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call getUserIdValidateBeforeCall(
    String userID,
    final ApiCallback<UserId> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'userID' is set
    if (userID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'userID' when calling getUserId(Async)"
      );
    }

    return getUserIdCall(userID, callback);
  }

  /**
   * Returns the userID data stored in the mapping. The data returned will usually be a few seconds
   * behind real time, because userID usage may take up to a few seconds to propagate to the
   * different clusters. Upon success, the response is 200 OK and contains the following userID
   * data.
   *
   * @param userID userID to assign. (required)
   * @return UserId
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UserId getUserId(String userID) throws AlgoliaRuntimeException {
    Call req = getUserIdValidateBeforeCall(userID, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.GetUserId(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UserId>() {}.getType();
    ApiResponse<UserId> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Returns the userID data stored in the mapping. The data returned will usually
   * be a few seconds behind real time, because userID usage may take up to a few seconds to
   * propagate to the different clusters. Upon success, the response is 200 OK and contains the
   * following userID data.
   *
   * @param userID userID to assign. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getUserIdAsync(String userID, final ApiCallback<UserId> callback)
    throws AlgoliaRuntimeException {
    Call call = getUserIdValidateBeforeCall(userID, callback);
    Type returnType = new TypeToken<UserId>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for hasPendingMappings
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call hasPendingMappingsCall(
    Boolean getClusters,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/clusters/mapping/pending";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (getClusters != null) {
      queryParams.addAll(this.parameterToPair("getClusters", getClusters));
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call hasPendingMappingsValidateBeforeCall(
    Boolean getClusters,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    return hasPendingMappingsCall(getClusters, callback);
  }

  /**
   * Get the status of your clusters' migrations or user creations. Creating a large batch of users
   * or migrating your multi-cluster may take quite some time. This method lets you retrieve the
   * status of the migration, so you can know when it's done. Upon success, the response is 200 OK.
   * A successful response indicates that the operation has been taken into account, and the userIDs
   * are directly usable.
   *
   * @param getClusters Whether to get clusters or not. (optional)
   * @return CreatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public CreatedAtResponse hasPendingMappings(Boolean getClusters)
    throws AlgoliaRuntimeException {
    Call req = hasPendingMappingsValidateBeforeCall(getClusters, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.HasPendingMappings(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    ApiResponse<CreatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public CreatedAtResponse hasPendingMappings() throws AlgoliaRuntimeException {
    return this.hasPendingMappings(null);
  }

  /**
   * (asynchronously) Get the status of your clusters&#39; migrations or user creations. Creating a
   * large batch of users or migrating your multi-cluster may take quite some time. This method lets
   * you retrieve the status of the migration, so you can know when it&#39;s done. Upon success, the
   * response is 200 OK. A successful response indicates that the operation has been taken into
   * account, and the userIDs are directly usable.
   *
   * @param getClusters Whether to get clusters or not. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call hasPendingMappingsAsync(
    Boolean getClusters,
    final ApiCallback<CreatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = hasPendingMappingsValidateBeforeCall(getClusters, callback);
    Type returnType = new TypeToken<CreatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for listApiKeys
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call listApiKeysCall(final ApiCallback<ListApiKeysResponse> callback)
    throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/keys";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call listApiKeysValidateBeforeCall(
    final ApiCallback<ListApiKeysResponse> callback
  ) throws AlgoliaRuntimeException {
    return listApiKeysCall(callback);
  }

  /**
   * List API keys, along with their associated rights.
   *
   * @return ListApiKeysResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public ListApiKeysResponse listApiKeys() throws AlgoliaRuntimeException {
    Call req = listApiKeysValidateBeforeCall(null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.ListApiKeys(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<ListApiKeysResponse>() {}.getType();
    ApiResponse<ListApiKeysResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) List API keys, along with their associated rights.
   *
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call listApiKeysAsync(final ApiCallback<ListApiKeysResponse> callback)
    throws AlgoliaRuntimeException {
    Call call = listApiKeysValidateBeforeCall(callback);
    Type returnType = new TypeToken<ListApiKeysResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for listClusters
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call listClustersCall(
    final ApiCallback<ListClustersResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/clusters";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call listClustersValidateBeforeCall(
    final ApiCallback<ListClustersResponse> callback
  ) throws AlgoliaRuntimeException {
    return listClustersCall(callback);
  }

  /**
   * List the clusters available in a multi-clusters setup for a single appID. Upon success, the
   * response is 200 OK and contains the following clusters.
   *
   * @return ListClustersResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public ListClustersResponse listClusters() throws AlgoliaRuntimeException {
    Call req = listClustersValidateBeforeCall(null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.ListClusters(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<ListClustersResponse>() {}.getType();
    ApiResponse<ListClustersResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) List the clusters available in a multi-clusters setup for a single appID. Upon
   * success, the response is 200 OK and contains the following clusters.
   *
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call listClustersAsync(
    final ApiCallback<ListClustersResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = listClustersValidateBeforeCall(callback);
    Type returnType = new TypeToken<ListClustersResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for listIndices
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call listIndicesCall(
    Integer page,
    final ApiCallback<ListIndicesResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/indexes";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (page != null) {
      queryParams.addAll(this.parameterToPair("page", page));
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call listIndicesValidateBeforeCall(
    Integer page,
    final ApiCallback<ListIndicesResponse> callback
  ) throws AlgoliaRuntimeException {
    return listIndicesCall(page, callback);
  }

  /**
   * List existing indexes from an application.
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
   * @return ListIndicesResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public ListIndicesResponse listIndices(Integer page)
    throws AlgoliaRuntimeException {
    Call req = listIndicesValidateBeforeCall(page, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.ListIndices(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<ListIndicesResponse>() {}.getType();
    ApiResponse<ListIndicesResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public ListIndicesResponse listIndices() throws AlgoliaRuntimeException {
    return this.listIndices(null);
  }

  /**
   * (asynchronously) List existing indexes from an application.
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call listIndicesAsync(
    Integer page,
    final ApiCallback<ListIndicesResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = listIndicesValidateBeforeCall(page, callback);
    Type returnType = new TypeToken<ListIndicesResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for listUserIds
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call listUserIdsCall(
    Integer page,
    Integer hitsPerPage,
    final ApiCallback<ListUserIdsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/clusters/mapping";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (page != null) {
      queryParams.addAll(this.parameterToPair("page", page));
    }

    if (hitsPerPage != null) {
      queryParams.addAll(this.parameterToPair("hitsPerPage", hitsPerPage));
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "GET",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call listUserIdsValidateBeforeCall(
    Integer page,
    Integer hitsPerPage,
    final ApiCallback<ListUserIdsResponse> callback
  ) throws AlgoliaRuntimeException {
    return listUserIdsCall(page, hitsPerPage, callback);
  }

  /**
   * List the userIDs assigned to a multi-clusters appID. The data returned will usually be a few
   * seconds behind real time, because userID usage may take up to a few seconds to propagate to the
   * different clusters. Upon success, the response is 200 OK and contains the following userIDs
   * data.
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
   * @param hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
   * @return ListUserIdsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public ListUserIdsResponse listUserIds(Integer page, Integer hitsPerPage)
    throws AlgoliaRuntimeException {
    Call req = listUserIdsValidateBeforeCall(page, hitsPerPage, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.ListUserIds(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<ListUserIdsResponse>() {}.getType();
    ApiResponse<ListUserIdsResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public ListUserIdsResponse listUserIds() throws AlgoliaRuntimeException {
    return this.listUserIds(null, 100);
  }

  /**
   * (asynchronously) List the userIDs assigned to a multi-clusters appID. The data returned will
   * usually be a few seconds behind real time, because userID usage may take up to a few seconds to
   * propagate to the different clusters. Upon success, the response is 200 OK and contains the
   * following userIDs data.
   *
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional)
   * @param hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call listUserIdsAsync(
    Integer page,
    Integer hitsPerPage,
    final ApiCallback<ListUserIdsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = listUserIdsValidateBeforeCall(page, hitsPerPage, callback);
    Type returnType = new TypeToken<ListUserIdsResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for multipleBatch
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call multipleBatchCall(
    BatchParams batchParams,
    final ApiCallback<MultipleBatchResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = batchParams;

    // create path and map variables
    String requestPath = "/1/indexes/*/batch";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call multipleBatchValidateBeforeCall(
    BatchParams batchParams,
    final ApiCallback<MultipleBatchResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'batchParams' is set
    if (batchParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'batchParams' when calling multipleBatch(Async)"
      );
    }

    return multipleBatchCall(batchParams, callback);
  }

  /**
   * Perform multiple write operations, potentially targeting multiple indices, in a single API
   * call.
   *
   * @param batchParams (required)
   * @return MultipleBatchResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public MultipleBatchResponse multipleBatch(BatchParams batchParams)
    throws AlgoliaRuntimeException {
    Call req = multipleBatchValidateBeforeCall(batchParams, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.MultipleBatch(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<MultipleBatchResponse>() {}.getType();
    ApiResponse<MultipleBatchResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Perform multiple write operations, potentially targeting multiple indices, in
   * a single API call.
   *
   * @param batchParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call multipleBatchAsync(
    BatchParams batchParams,
    final ApiCallback<MultipleBatchResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = multipleBatchValidateBeforeCall(batchParams, callback);
    Type returnType = new TypeToken<MultipleBatchResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for multipleQueries
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call multipleQueriesCall(
    MultipleQueriesParams multipleQueriesParams,
    final ApiCallback<MultipleQueriesResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = multipleQueriesParams;

    // create path and map variables
    String requestPath = "/1/indexes/*/queries";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call multipleQueriesValidateBeforeCall(
    MultipleQueriesParams multipleQueriesParams,
    final ApiCallback<MultipleQueriesResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'multipleQueriesParams' is set
    if (multipleQueriesParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'multipleQueriesParams' when calling" +
        " multipleQueries(Async)"
      );
    }

    return multipleQueriesCall(multipleQueriesParams, callback);
  }

  /**
   * Get search results for the given requests.
   *
   * @param multipleQueriesParams (required)
   * @return MultipleQueriesResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public MultipleQueriesResponse multipleQueries(
    MultipleQueriesParams multipleQueriesParams
  ) throws AlgoliaRuntimeException {
    Call req = multipleQueriesValidateBeforeCall(multipleQueriesParams, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.MultipleQueries(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<MultipleQueriesResponse>() {}.getType();
    ApiResponse<MultipleQueriesResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Get search results for the given requests.
   *
   * @param multipleQueriesParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call multipleQueriesAsync(
    MultipleQueriesParams multipleQueriesParams,
    final ApiCallback<MultipleQueriesResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = multipleQueriesValidateBeforeCall(
      multipleQueriesParams,
      callback
    );
    Type returnType = new TypeToken<MultipleQueriesResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for operationIndex
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call operationIndexCall(
    String indexName,
    OperationIndexParams operationIndexParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = operationIndexParams;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/operation".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call operationIndexValidateBeforeCall(
    String indexName,
    OperationIndexParams operationIndexParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling operationIndex(Async)"
      );
    }

    // verify the required parameter 'operationIndexParams' is set
    if (operationIndexParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'operationIndexParams' when calling" +
        " operationIndex(Async)"
      );
    }

    return operationIndexCall(indexName, operationIndexParams, callback);
  }

  /**
   * Peforms a copy or a move operation on a index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param operationIndexParams (required)
   * @return UpdatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse operationIndex(
    String indexName,
    OperationIndexParams operationIndexParams
  ) throws AlgoliaRuntimeException {
    Call req = operationIndexValidateBeforeCall(
      indexName,
      operationIndexParams,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.OperationIndex(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Peforms a copy or a move operation on a index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param operationIndexParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call operationIndexAsync(
    String indexName,
    OperationIndexParams operationIndexParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = operationIndexValidateBeforeCall(
      indexName,
      operationIndexParams,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for partialUpdateObject
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call partialUpdateObjectCall(
    String indexName,
    String objectID,
    List<Map<String, AttributeOrBuiltInOperation>> attributeOrBuiltInOperation,
    Boolean createIfNotExists,
    final ApiCallback<UpdatedAtWithObjectIdResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = attributeOrBuiltInOperation;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/{objectID}/partial".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{objectID\\}", this.escapeString(objectID.toString()));

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (createIfNotExists != null) {
      queryParams.addAll(
        this.parameterToPair("createIfNotExists", createIfNotExists)
      );
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call partialUpdateObjectValidateBeforeCall(
    String indexName,
    String objectID,
    List<Map<String, AttributeOrBuiltInOperation>> attributeOrBuiltInOperation,
    Boolean createIfNotExists,
    final ApiCallback<UpdatedAtWithObjectIdResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling partialUpdateObject(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'objectID' when calling partialUpdateObject(Async)"
      );
    }

    // verify the required parameter 'attributeOrBuiltInOperation' is set
    if (attributeOrBuiltInOperation == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'attributeOrBuiltInOperation' when calling" +
        " partialUpdateObject(Async)"
      );
    }

    return partialUpdateObjectCall(
      indexName,
      objectID,
      attributeOrBuiltInOperation,
      createIfNotExists,
      callback
    );
  }

  /**
   * Update one or more attributes of an existing object. This method lets you update only a part of
   * an existing object, either by adding new attributes or updating existing ones. You can
   * partially update several objects in a single method call. If the index targeted by this
   * operation doesn't exist yet, it's automatically created.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param attributeOrBuiltInOperation List of attributes to update. (required)
   * @param createIfNotExists Creates the record if it does not exist yet. (optional, default to
   *     true)
   * @return UpdatedAtWithObjectIdResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtWithObjectIdResponse partialUpdateObject(
    String indexName,
    String objectID,
    List<Map<String, AttributeOrBuiltInOperation>> attributeOrBuiltInOperation,
    Boolean createIfNotExists
  ) throws AlgoliaRuntimeException {
    Call req = partialUpdateObjectValidateBeforeCall(
      indexName,
      objectID,
      attributeOrBuiltInOperation,
      createIfNotExists,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.PartialUpdateObject(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtWithObjectIdResponse>() {}
      .getType();
    ApiResponse<UpdatedAtWithObjectIdResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  public UpdatedAtWithObjectIdResponse partialUpdateObject(
    String indexName,
    String objectID,
    List<Map<String, AttributeOrBuiltInOperation>> attributeOrBuiltInOperation
  ) throws AlgoliaRuntimeException {
    return this.partialUpdateObject(
        indexName,
        objectID,
        attributeOrBuiltInOperation,
        true
      );
  }

  /**
   * (asynchronously) Update one or more attributes of an existing object. This method lets you
   * update only a part of an existing object, either by adding new attributes or updating existing
   * ones. You can partially update several objects in a single method call. If the index targeted
   * by this operation doesn&#39;t exist yet, it&#39;s automatically created.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param attributeOrBuiltInOperation List of attributes to update. (required)
   * @param createIfNotExists Creates the record if it does not exist yet. (optional, default to
   *     true)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call partialUpdateObjectAsync(
    String indexName,
    String objectID,
    List<Map<String, AttributeOrBuiltInOperation>> attributeOrBuiltInOperation,
    Boolean createIfNotExists,
    final ApiCallback<UpdatedAtWithObjectIdResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = partialUpdateObjectValidateBeforeCall(
      indexName,
      objectID,
      attributeOrBuiltInOperation,
      createIfNotExists,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtWithObjectIdResponse>() {}
      .getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for post
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call postCall(
    String path,
    Map<String, Object> parameters,
    Object body,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = body;

    // create path and map variables
    String requestPath = "/1{path}".replaceAll("\\{path\\}", path.toString());

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (parameters != null) {
      for (Map.Entry<String, Object> parameter : parameters.entrySet()) {
        queryParams.addAll(
          this.parameterToPair(
              parameter.getKey(),
              parameter.getValue().toString()
            )
        );
      }
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call postValidateBeforeCall(
    String path,
    Map<String, Object> parameters,
    Object body,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'path' is set
    if (path == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'path' when calling post(Async)"
      );
    }

    return postCall(path, parameters, body, callback);
  }

  /**
   * This method allow you to send requests to the Algolia REST API.
   *
   * @param path The path of the API endpoint to target, anything after the /1 needs to be
   *     specified. (required)
   * @param parameters Query parameters to be applied to the current query. (optional)
   * @param body The parameters to send with the custom request. (optional)
   * @return Object
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public Object post(String path, Map<String, Object> parameters, Object body)
    throws AlgoliaRuntimeException {
    Call req = postValidateBeforeCall(path, parameters, body, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.Post(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<Object>() {}.getType();
    ApiResponse<Object> res = this.execute(call, returnType);
    return res.getData();
  }

  public Object post(String path) throws AlgoliaRuntimeException {
    return this.post(path, new HashMap<>(), null);
  }

  /**
   * (asynchronously) This method allow you to send requests to the Algolia REST API.
   *
   * @param path The path of the API endpoint to target, anything after the /1 needs to be
   *     specified. (required)
   * @param parameters Query parameters to be applied to the current query. (optional)
   * @param body The parameters to send with the custom request. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call postAsync(
    String path,
    Map<String, Object> parameters,
    Object body,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    Call call = postValidateBeforeCall(path, parameters, body, callback);
    Type returnType = new TypeToken<Object>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for put
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call putCall(
    String path,
    Map<String, Object> parameters,
    Object body,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = body;

    // create path and map variables
    String requestPath = "/1{path}".replaceAll("\\{path\\}", path.toString());

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (parameters != null) {
      for (Map.Entry<String, Object> parameter : parameters.entrySet()) {
        queryParams.addAll(
          this.parameterToPair(
              parameter.getKey(),
              parameter.getValue().toString()
            )
        );
      }
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "PUT",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call putValidateBeforeCall(
    String path,
    Map<String, Object> parameters,
    Object body,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'path' is set
    if (path == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'path' when calling put(Async)"
      );
    }

    return putCall(path, parameters, body, callback);
  }

  /**
   * This method allow you to send requests to the Algolia REST API.
   *
   * @param path The path of the API endpoint to target, anything after the /1 needs to be
   *     specified. (required)
   * @param parameters Query parameters to be applied to the current query. (optional)
   * @param body The parameters to send with the custom request. (optional)
   * @return Object
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public Object put(String path, Map<String, Object> parameters, Object body)
    throws AlgoliaRuntimeException {
    Call req = putValidateBeforeCall(path, parameters, body, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.Put(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<Object>() {}.getType();
    ApiResponse<Object> res = this.execute(call, returnType);
    return res.getData();
  }

  public Object put(String path) throws AlgoliaRuntimeException {
    return this.put(path, new HashMap<>(), null);
  }

  /**
   * (asynchronously) This method allow you to send requests to the Algolia REST API.
   *
   * @param path The path of the API endpoint to target, anything after the /1 needs to be
   *     specified. (required)
   * @param parameters Query parameters to be applied to the current query. (optional)
   * @param body The parameters to send with the custom request. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call putAsync(
    String path,
    Map<String, Object> parameters,
    Object body,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    Call call = putValidateBeforeCall(path, parameters, body, callback);
    Type returnType = new TypeToken<Object>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for removeUserId
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call removeUserIdCall(
    String userID,
    final ApiCallback<RemoveUserIdResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/clusters/mapping/{userID}".replaceAll(
          "\\{userID\\}",
          this.escapeString(userID.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "DELETE",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call removeUserIdValidateBeforeCall(
    String userID,
    final ApiCallback<RemoveUserIdResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'userID' is set
    if (userID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'userID' when calling removeUserId(Async)"
      );
    }

    return removeUserIdCall(userID, callback);
  }

  /**
   * Remove a userID and its associated data from the multi-clusters. Upon success, the response is
   * 200 OK and a task is created to remove the userID data and mapping.
   *
   * @param userID userID to assign. (required)
   * @return RemoveUserIdResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public RemoveUserIdResponse removeUserId(String userID)
    throws AlgoliaRuntimeException {
    Call req = removeUserIdValidateBeforeCall(userID, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.RemoveUserId(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<RemoveUserIdResponse>() {}.getType();
    ApiResponse<RemoveUserIdResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Remove a userID and its associated data from the multi-clusters. Upon success,
   * the response is 200 OK and a task is created to remove the userID data and mapping.
   *
   * @param userID userID to assign. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call removeUserIdAsync(
    String userID,
    final ApiCallback<RemoveUserIdResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = removeUserIdValidateBeforeCall(userID, callback);
    Type returnType = new TypeToken<RemoveUserIdResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for replaceSources
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call replaceSourcesCall(
    List<Source> source,
    final ApiCallback<ReplaceSourceResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = source;

    // create path and map variables
    String requestPath = "/1/security/sources";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "PUT",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call replaceSourcesValidateBeforeCall(
    List<Source> source,
    final ApiCallback<ReplaceSourceResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'source' is set
    if (source == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'source' when calling replaceSources(Async)"
      );
    }

    return replaceSourcesCall(source, callback);
  }

  /**
   * Replace all allowed sources.
   *
   * @param source The sources to allow. (required)
   * @return ReplaceSourceResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public ReplaceSourceResponse replaceSources(List<Source> source)
    throws AlgoliaRuntimeException {
    Call req = replaceSourcesValidateBeforeCall(source, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.ReplaceSources(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<ReplaceSourceResponse>() {}.getType();
    ApiResponse<ReplaceSourceResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Replace all allowed sources.
   *
   * @param source The sources to allow. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call replaceSourcesAsync(
    List<Source> source,
    final ApiCallback<ReplaceSourceResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = replaceSourcesValidateBeforeCall(source, callback);
    Type returnType = new TypeToken<ReplaceSourceResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for restoreApiKey
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call restoreApiKeyCall(
    String key,
    final ApiCallback<AddApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/keys/{key}/restore".replaceAll(
          "\\{key\\}",
          this.escapeString(key.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call restoreApiKeyValidateBeforeCall(
    String key,
    final ApiCallback<AddApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'key' when calling restoreApiKey(Async)"
      );
    }

    return restoreApiKeyCall(key, callback);
  }

  /**
   * Restore a deleted API key, along with its associated rights.
   *
   * @param key API Key string. (required)
   * @return AddApiKeyResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public AddApiKeyResponse restoreApiKey(String key)
    throws AlgoliaRuntimeException {
    Call req = restoreApiKeyValidateBeforeCall(key, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.RestoreApiKey(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    ApiResponse<AddApiKeyResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Restore a deleted API key, along with its associated rights.
   *
   * @param key API Key string. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call restoreApiKeyAsync(
    String key,
    final ApiCallback<AddApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = restoreApiKeyValidateBeforeCall(key, callback);
    Type returnType = new TypeToken<AddApiKeyResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for saveObject
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call saveObjectCall(
    String indexName,
    Object body,
    final ApiCallback<SaveObjectResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = body;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call saveObjectValidateBeforeCall(
    String indexName,
    Object body,
    final ApiCallback<SaveObjectResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling saveObject(Async)"
      );
    }

    // verify the required parameter 'body' is set
    if (body == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'body' when calling saveObject(Async)"
      );
    }

    return saveObjectCall(indexName, body, callback);
  }

  /**
   * Add an object to the index, automatically assigning it an object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param body The Algolia record. (required)
   * @return SaveObjectResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SaveObjectResponse saveObject(String indexName, Object body)
    throws AlgoliaRuntimeException {
    Call req = saveObjectValidateBeforeCall(indexName, body, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SaveObject(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SaveObjectResponse>() {}.getType();
    ApiResponse<SaveObjectResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Add an object to the index, automatically assigning it an object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param body The Algolia record. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call saveObjectAsync(
    String indexName,
    Object body,
    final ApiCallback<SaveObjectResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = saveObjectValidateBeforeCall(indexName, body, callback);
    Type returnType = new TypeToken<SaveObjectResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for saveRule
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call saveRuleCall(
    String indexName,
    String objectID,
    Rule rule,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedRuleResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = rule;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/rules/{objectID}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{objectID\\}", this.escapeString(objectID.toString()));

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
        requestPath,
        "PUT",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call saveRuleValidateBeforeCall(
    String indexName,
    String objectID,
    Rule rule,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedRuleResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling saveRule(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'objectID' when calling saveRule(Async)"
      );
    }

    // verify the required parameter 'rule' is set
    if (rule == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'rule' when calling saveRule(Async)"
      );
    }

    return saveRuleCall(indexName, objectID, rule, forwardToReplicas, callback);
  }

  /**
   * Create or update the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param rule (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return UpdatedRuleResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedRuleResponse saveRule(
    String indexName,
    String objectID,
    Rule rule,
    Boolean forwardToReplicas
  ) throws AlgoliaRuntimeException {
    Call req = saveRuleValidateBeforeCall(
      indexName,
      objectID,
      rule,
      forwardToReplicas,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SaveRule(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedRuleResponse>() {}.getType();
    ApiResponse<UpdatedRuleResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public UpdatedRuleResponse saveRule(
    String indexName,
    String objectID,
    Rule rule
  ) throws AlgoliaRuntimeException {
    return this.saveRule(indexName, objectID, rule, null);
  }

  /**
   * (asynchronously) Create or update the Rule with the specified objectID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param rule (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call saveRuleAsync(
    String indexName,
    String objectID,
    Rule rule,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedRuleResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = saveRuleValidateBeforeCall(
      indexName,
      objectID,
      rule,
      forwardToReplicas,
      callback
    );
    Type returnType = new TypeToken<UpdatedRuleResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for saveSynonym
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call saveSynonymCall(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas,
    final ApiCallback<SaveSynonymResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = synonymHit;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/synonyms/{objectID}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{objectID\\}", this.escapeString(objectID.toString()));

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
        requestPath,
        "PUT",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call saveSynonymValidateBeforeCall(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas,
    final ApiCallback<SaveSynonymResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling saveSynonym(Async)"
      );
    }

    // verify the required parameter 'objectID' is set
    if (objectID == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'objectID' when calling saveSynonym(Async)"
      );
    }

    // verify the required parameter 'synonymHit' is set
    if (synonymHit == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'synonymHit' when calling saveSynonym(Async)"
      );
    }

    return saveSynonymCall(
      indexName,
      objectID,
      synonymHit,
      forwardToReplicas,
      callback
    );
  }

  /**
   * Create a new synonym object or update the existing synonym object with the given object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @return SaveSynonymResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SaveSynonymResponse saveSynonym(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas
  ) throws AlgoliaRuntimeException {
    Call req = saveSynonymValidateBeforeCall(
      indexName,
      objectID,
      synonymHit,
      forwardToReplicas,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SaveSynonym(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SaveSynonymResponse>() {}.getType();
    ApiResponse<SaveSynonymResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public SaveSynonymResponse saveSynonym(
    String indexName,
    String objectID,
    SynonymHit synonymHit
  ) throws AlgoliaRuntimeException {
    return this.saveSynonym(indexName, objectID, synonymHit, null);
  }

  /**
   * (asynchronously) Create a new synonym object or update the existing synonym object with the
   * given object ID.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param objectID Unique identifier of an object. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call saveSynonymAsync(
    String indexName,
    String objectID,
    SynonymHit synonymHit,
    Boolean forwardToReplicas,
    final ApiCallback<SaveSynonymResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = saveSynonymValidateBeforeCall(
      indexName,
      objectID,
      synonymHit,
      forwardToReplicas,
      callback
    );
    Type returnType = new TypeToken<SaveSynonymResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for saveSynonyms
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call saveSynonymsCall(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = synonymHit;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/synonyms/batch".replaceAll(
          "\\{indexName\\}",
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

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call saveSynonymsValidateBeforeCall(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling saveSynonyms(Async)"
      );
    }

    // verify the required parameter 'synonymHit' is set
    if (synonymHit == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'synonymHit' when calling saveSynonyms(Async)"
      );
    }

    return saveSynonymsCall(
      indexName,
      synonymHit,
      forwardToReplicas,
      replaceExistingSynonyms,
      callback
    );
  }

  /**
   * Create/update multiple synonym objects at once, potentially replacing the entire list of
   * synonyms if replaceExistingSynonyms is true.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param replaceExistingSynonyms Replace all synonyms of the index with the ones sent with this
   *     request. (optional)
   * @return UpdatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse saveSynonyms(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms
  ) throws AlgoliaRuntimeException {
    Call req = saveSynonymsValidateBeforeCall(
      indexName,
      synonymHit,
      forwardToReplicas,
      replaceExistingSynonyms,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SaveSynonyms(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public UpdatedAtResponse saveSynonyms(
    String indexName,
    List<SynonymHit> synonymHit
  ) throws AlgoliaRuntimeException {
    return this.saveSynonyms(indexName, synonymHit, null, null);
  }

  /**
   * (asynchronously) Create/update multiple synonym objects at once, potentially replacing the
   * entire list of synonyms if replaceExistingSynonyms is true.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param synonymHit (required)
   * @param forwardToReplicas When true, changes are also propagated to replicas of the given
   *     indexName. (optional)
   * @param replaceExistingSynonyms Replace all synonyms of the index with the ones sent with this
   *     request. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call saveSynonymsAsync(
    String indexName,
    List<SynonymHit> synonymHit,
    Boolean forwardToReplicas,
    Boolean replaceExistingSynonyms,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = saveSynonymsValidateBeforeCall(
      indexName,
      synonymHit,
      forwardToReplicas,
      replaceExistingSynonyms,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for search
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call searchCall(
    String indexName,
    SearchParams searchParams,
    final ApiCallback<SearchResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = searchParams;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/query".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call searchValidateBeforeCall(
    String indexName,
    SearchParams searchParams,
    final ApiCallback<SearchResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling search(Async)"
      );
    }

    // verify the required parameter 'searchParams' is set
    if (searchParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'searchParams' when calling search(Async)"
      );
    }

    return searchCall(indexName, searchParams, callback);
  }

  /**
   * Get search results.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @return SearchResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SearchResponse search(String indexName, SearchParams searchParams)
    throws AlgoliaRuntimeException {
    Call req = searchValidateBeforeCall(indexName, searchParams, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.Search(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SearchResponse>() {}.getType();
    ApiResponse<SearchResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Get search results.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call searchAsync(
    String indexName,
    SearchParams searchParams,
    final ApiCallback<SearchResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = searchValidateBeforeCall(indexName, searchParams, callback);
    Type returnType = new TypeToken<SearchResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for searchDictionaryEntries
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call searchDictionaryEntriesCall(
    DictionaryType dictionaryName,
    SearchDictionaryEntriesParams searchDictionaryEntriesParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = searchDictionaryEntriesParams;

    // create path and map variables
    String requestPath =
      "/1/dictionaries/{dictionaryName}/search".replaceAll(
          "\\{dictionaryName\\}",
          this.escapeString(dictionaryName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call searchDictionaryEntriesValidateBeforeCall(
    DictionaryType dictionaryName,
    SearchDictionaryEntriesParams searchDictionaryEntriesParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'dictionaryName' is set
    if (dictionaryName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'dictionaryName' when calling" +
        " searchDictionaryEntries(Async)"
      );
    }

    // verify the required parameter 'searchDictionaryEntriesParams' is set
    if (searchDictionaryEntriesParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'searchDictionaryEntriesParams' when calling" +
        " searchDictionaryEntries(Async)"
      );
    }

    return searchDictionaryEntriesCall(
      dictionaryName,
      searchDictionaryEntriesParams,
      callback
    );
  }

  /**
   * Search the dictionary entries.
   *
   * @param dictionaryName The dictionary to search in. (required)
   * @param searchDictionaryEntriesParams (required)
   * @return UpdatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse searchDictionaryEntries(
    DictionaryType dictionaryName,
    SearchDictionaryEntriesParams searchDictionaryEntriesParams
  ) throws AlgoliaRuntimeException {
    Call req = searchDictionaryEntriesValidateBeforeCall(
      dictionaryName,
      searchDictionaryEntriesParams,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SearchDictionaryEntries(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Search the dictionary entries.
   *
   * @param dictionaryName The dictionary to search in. (required)
   * @param searchDictionaryEntriesParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call searchDictionaryEntriesAsync(
    DictionaryType dictionaryName,
    SearchDictionaryEntriesParams searchDictionaryEntriesParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = searchDictionaryEntriesValidateBeforeCall(
      dictionaryName,
      searchDictionaryEntriesParams,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for searchForFacetValues
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call searchForFacetValuesCall(
    String indexName,
    String facetName,
    SearchForFacetValuesRequest searchForFacetValuesRequest,
    final ApiCallback<SearchForFacetValuesResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = searchForFacetValuesRequest;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/facets/{facetName}/query".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        )
        .replaceAll("\\{facetName\\}", this.escapeString(facetName.toString()));

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call searchForFacetValuesValidateBeforeCall(
    String indexName,
    String facetName,
    SearchForFacetValuesRequest searchForFacetValuesRequest,
    final ApiCallback<SearchForFacetValuesResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling searchForFacetValues(Async)"
      );
    }

    // verify the required parameter 'facetName' is set
    if (facetName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'facetName' when calling searchForFacetValues(Async)"
      );
    }

    return searchForFacetValuesCall(
      indexName,
      facetName,
      searchForFacetValuesRequest,
      callback
    );
  }

  /**
   * Search for values of a given facet, optionally restricting the returned values to those
   * contained in objects matching other search criteria.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param facetName The facet name. (required)
   * @param searchForFacetValuesRequest (optional)
   * @return SearchForFacetValuesResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SearchForFacetValuesResponse searchForFacetValues(
    String indexName,
    String facetName,
    SearchForFacetValuesRequest searchForFacetValuesRequest
  ) throws AlgoliaRuntimeException {
    Call req = searchForFacetValuesValidateBeforeCall(
      indexName,
      facetName,
      searchForFacetValuesRequest,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SearchForFacetValues(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SearchForFacetValuesResponse>() {}
      .getType();
    ApiResponse<SearchForFacetValuesResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  public SearchForFacetValuesResponse searchForFacetValues(
    String indexName,
    String facetName
  ) throws AlgoliaRuntimeException {
    return this.searchForFacetValues(indexName, facetName, null);
  }

  /**
   * (asynchronously) Search for values of a given facet, optionally restricting the returned values
   * to those contained in objects matching other search criteria.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param facetName The facet name. (required)
   * @param searchForFacetValuesRequest (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call searchForFacetValuesAsync(
    String indexName,
    String facetName,
    SearchForFacetValuesRequest searchForFacetValuesRequest,
    final ApiCallback<SearchForFacetValuesResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = searchForFacetValuesValidateBeforeCall(
      indexName,
      facetName,
      searchForFacetValuesRequest,
      callback
    );
    Type returnType = new TypeToken<SearchForFacetValuesResponse>() {}
      .getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for searchRules
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call searchRulesCall(
    String indexName,
    SearchRulesParams searchRulesParams,
    final ApiCallback<SearchRulesResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = searchRulesParams;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/rules/search".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call searchRulesValidateBeforeCall(
    String indexName,
    SearchRulesParams searchRulesParams,
    final ApiCallback<SearchRulesResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling searchRules(Async)"
      );
    }

    // verify the required parameter 'searchRulesParams' is set
    if (searchRulesParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'searchRulesParams' when calling searchRules(Async)"
      );
    }

    return searchRulesCall(indexName, searchRulesParams, callback);
  }

  /**
   * Search for rules matching various criteria.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchRulesParams (required)
   * @return SearchRulesResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SearchRulesResponse searchRules(
    String indexName,
    SearchRulesParams searchRulesParams
  ) throws AlgoliaRuntimeException {
    Call req = searchRulesValidateBeforeCall(
      indexName,
      searchRulesParams,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SearchRules(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SearchRulesResponse>() {}.getType();
    ApiResponse<SearchRulesResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Search for rules matching various criteria.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param searchRulesParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call searchRulesAsync(
    String indexName,
    SearchRulesParams searchRulesParams,
    final ApiCallback<SearchRulesResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = searchRulesValidateBeforeCall(
      indexName,
      searchRulesParams,
      callback
    );
    Type returnType = new TypeToken<SearchRulesResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for searchSynonyms
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call searchSynonymsCall(
    String indexName,
    String query,
    SynonymType type,
    Integer page,
    Integer hitsPerPage,
    final ApiCallback<SearchSynonymsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/synonyms/search".replaceAll(
          "\\{indexName\\}",
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
      queryParams.addAll(this.parameterToPair("page", page));
    }

    if (hitsPerPage != null) {
      queryParams.addAll(this.parameterToPair("hitsPerPage", hitsPerPage));
    }

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call searchSynonymsValidateBeforeCall(
    String indexName,
    String query,
    SynonymType type,
    Integer page,
    Integer hitsPerPage,
    final ApiCallback<SearchSynonymsResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling searchSynonyms(Async)"
      );
    }

    return searchSynonymsCall(
      indexName,
      query,
      type,
      page,
      hitsPerPage,
      callback
    );
  }

  /**
   * Search or browse all synonyms, optionally filtering them by type.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param query Search for specific synonyms matching this string. (optional, default to )
   * @param type Only search for specific types of synonyms. (optional)
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional, default to 0)
   * @param hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
   * @return SearchSynonymsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SearchSynonymsResponse searchSynonyms(
    String indexName,
    String query,
    SynonymType type,
    Integer page,
    Integer hitsPerPage
  ) throws AlgoliaRuntimeException {
    Call req = searchSynonymsValidateBeforeCall(
      indexName,
      query,
      type,
      page,
      hitsPerPage,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SearchSynonyms(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SearchSynonymsResponse>() {}.getType();
    ApiResponse<SearchSynonymsResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public SearchSynonymsResponse searchSynonyms(String indexName)
    throws AlgoliaRuntimeException {
    return this.searchSynonyms(indexName, "", null, 0, 100);
  }

  /**
   * (asynchronously) Search or browse all synonyms, optionally filtering them by type.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param query Search for specific synonyms matching this string. (optional, default to )
   * @param type Only search for specific types of synonyms. (optional)
   * @param page Requested page (zero-based). When specified, will retrieve a specific page; the
   *     page size is implicitly set to 100. When null, will retrieve all indices (no pagination).
   *     (optional, default to 0)
   * @param hitsPerPage Maximum number of objects to retrieve. (optional, default to 100)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call searchSynonymsAsync(
    String indexName,
    String query,
    SynonymType type,
    Integer page,
    Integer hitsPerPage,
    final ApiCallback<SearchSynonymsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = searchSynonymsValidateBeforeCall(
      indexName,
      query,
      type,
      page,
      hitsPerPage,
      callback
    );
    Type returnType = new TypeToken<SearchSynonymsResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for searchUserIds
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call searchUserIdsCall(
    SearchUserIdsParams searchUserIdsParams,
    final ApiCallback<SearchUserIdsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = searchUserIdsParams;

    // create path and map variables
    String requestPath = "/1/clusters/mapping/search";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "POST",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call searchUserIdsValidateBeforeCall(
    SearchUserIdsParams searchUserIdsParams,
    final ApiCallback<SearchUserIdsResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'searchUserIdsParams' is set
    if (searchUserIdsParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'searchUserIdsParams' when calling searchUserIds(Async)"
      );
    }

    return searchUserIdsCall(searchUserIdsParams, callback);
  }

  /**
   * Search for userIDs. The data returned will usually be a few seconds behind real time, because
   * userID usage may take up to a few seconds propagate to the different clusters. To keep updates
   * moving quickly, the index of userIDs isn't built synchronously with the mapping. Instead, the
   * index is built once every 12h, at the same time as the update of userID usage. For example,
   * when you perform a modification like adding or moving a userID, the search will report an
   * outdated value until the next rebuild of the mapping, which takes place every 12h. Upon
   * success, the response is 200 OK and contains the following userIDs data.
   *
   * @param searchUserIdsParams (required)
   * @return SearchUserIdsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SearchUserIdsResponse searchUserIds(
    SearchUserIdsParams searchUserIdsParams
  ) throws AlgoliaRuntimeException {
    Call req = searchUserIdsValidateBeforeCall(searchUserIdsParams, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SearchUserIds(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SearchUserIdsResponse>() {}.getType();
    ApiResponse<SearchUserIdsResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Search for userIDs. The data returned will usually be a few seconds behind
   * real time, because userID usage may take up to a few seconds propagate to the different
   * clusters. To keep updates moving quickly, the index of userIDs isn&#39;t built synchronously
   * with the mapping. Instead, the index is built once every 12h, at the same time as the update of
   * userID usage. For example, when you perform a modification like adding or moving a userID, the
   * search will report an outdated value until the next rebuild of the mapping, which takes place
   * every 12h. Upon success, the response is 200 OK and contains the following userIDs data.
   *
   * @param searchUserIdsParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call searchUserIdsAsync(
    SearchUserIdsParams searchUserIdsParams,
    final ApiCallback<SearchUserIdsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = searchUserIdsValidateBeforeCall(searchUserIdsParams, callback);
    Type returnType = new TypeToken<SearchUserIdsResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for setDictionarySettings
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call setDictionarySettingsCall(
    DictionarySettingsParams dictionarySettingsParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = dictionarySettingsParams;

    // create path and map variables
    String requestPath = "/1/dictionaries/*/settings";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "PUT",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call setDictionarySettingsValidateBeforeCall(
    DictionarySettingsParams dictionarySettingsParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'dictionarySettingsParams' is set
    if (dictionarySettingsParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'dictionarySettingsParams' when calling" +
        " setDictionarySettings(Async)"
      );
    }

    return setDictionarySettingsCall(dictionarySettingsParams, callback);
  }

  /**
   * Set dictionary settings.
   *
   * @param dictionarySettingsParams (required)
   * @return UpdatedAtResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse setDictionarySettings(
    DictionarySettingsParams dictionarySettingsParams
  ) throws AlgoliaRuntimeException {
    Call req = setDictionarySettingsValidateBeforeCall(
      dictionarySettingsParams,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SetDictionarySettings(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Set dictionary settings.
   *
   * @param dictionarySettingsParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call setDictionarySettingsAsync(
    DictionarySettingsParams dictionarySettingsParams,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = setDictionarySettingsValidateBeforeCall(
      dictionarySettingsParams,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for setSettings
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call setSettingsCall(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = indexSettings;

    // create path and map variables
    String requestPath =
      "/1/indexes/{indexName}/settings".replaceAll(
          "\\{indexName\\}",
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

    return this.buildCall(
        requestPath,
        "PUT",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call setSettingsValidateBeforeCall(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling setSettings(Async)"
      );
    }

    // verify the required parameter 'indexSettings' is set
    if (indexSettings == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexSettings' when calling setSettings(Async)"
      );
    }

    return setSettingsCall(
      indexName,
      indexSettings,
      forwardToReplicas,
      callback
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
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdatedAtResponse setSettings(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas
  ) throws AlgoliaRuntimeException {
    Call req = setSettingsValidateBeforeCall(
      indexName,
      indexSettings,
      forwardToReplicas,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.SetSettings(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    ApiResponse<UpdatedAtResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public UpdatedAtResponse setSettings(
    String indexName,
    IndexSettings indexSettings
  ) throws AlgoliaRuntimeException {
    return this.setSettings(indexName, indexSettings, null);
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
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call setSettingsAsync(
    String indexName,
    IndexSettings indexSettings,
    Boolean forwardToReplicas,
    final ApiCallback<UpdatedAtResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = setSettingsValidateBeforeCall(
      indexName,
      indexSettings,
      forwardToReplicas,
      callback
    );
    Type returnType = new TypeToken<UpdatedAtResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for updateApiKey
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call updateApiKeyCall(
    String key,
    ApiKey apiKey,
    final ApiCallback<UpdateApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = apiKey;

    // create path and map variables
    String requestPath =
      "/1/keys/{key}".replaceAll(
          "\\{key\\}",
          this.escapeString(key.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    headers.put("Accept", "application/json");
    headers.put("Content-Type", "application/json");

    return this.buildCall(
        requestPath,
        "PUT",
        queryParams,
        bodyObj,
        headers,
        callback
      );
  }

  private Call updateApiKeyValidateBeforeCall(
    String key,
    ApiKey apiKey,
    final ApiCallback<UpdateApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'key' is set
    if (key == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'key' when calling updateApiKey(Async)"
      );
    }

    // verify the required parameter 'apiKey' is set
    if (apiKey == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'apiKey' when calling updateApiKey(Async)"
      );
    }

    return updateApiKeyCall(key, apiKey, callback);
  }

  /**
   * Replace every permission of an existing API key.
   *
   * @param key API Key string. (required)
   * @param apiKey (required)
   * @return UpdateApiKeyResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public UpdateApiKeyResponse updateApiKey(String key, ApiKey apiKey)
    throws AlgoliaRuntimeException {
    Call req = updateApiKeyValidateBeforeCall(key, apiKey, null);
    if (req instanceof CallEcho) {
      return new EchoResponse.SearchEcho.UpdateApiKey(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<UpdateApiKeyResponse>() {}.getType();
    ApiResponse<UpdateApiKeyResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Replace every permission of an existing API key.
   *
   * @param key API Key string. (required)
   * @param apiKey (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call updateApiKeyAsync(
    String key,
    ApiKey apiKey,
    final ApiCallback<UpdateApiKeyResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = updateApiKeyValidateBeforeCall(key, apiKey, callback);
    Type returnType = new TypeToken<UpdateApiKeyResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }
}
