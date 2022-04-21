package com.algolia.api;

import com.algolia.ApiCallback;
import com.algolia.ApiClient;
import com.algolia.ApiResponse;
import com.algolia.Pair;
import com.algolia.exceptions.*;
import com.algolia.model.querySuggestions.*;
import com.algolia.utils.*;
import com.algolia.utils.echo.*;
import com.algolia.utils.retry.CallType;
import com.algolia.utils.retry.StatefulHost;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import okhttp3.Call;

public class QuerySuggestionsClient extends ApiClient {

  public QuerySuggestionsClient(String appId, String apiKey, String region) {
    this(appId, apiKey, new HttpRequester(getDefaultHosts(region)), null);
  }

  public QuerySuggestionsClient(
    String appId,
    String apiKey,
    String region,
    UserAgent.Segment[] userAgentSegments
  ) {
    this(
      appId,
      apiKey,
      new HttpRequester(getDefaultHosts(region)),
      userAgentSegments
    );
  }

  public QuerySuggestionsClient(
    String appId,
    String apiKey,
    Requester requester
  ) {
    this(appId, apiKey, requester, null);
  }

  public QuerySuggestionsClient(
    String appId,
    String apiKey,
    Requester requester,
    UserAgent.Segment[] userAgentSegments
  ) {
    super(appId, apiKey, requester, "QuerySuggestions", userAgentSegments);
  }

  private static List<StatefulHost> getDefaultHosts(String region) {
    List<StatefulHost> hosts = new ArrayList<StatefulHost>();
    hosts.add(
      new StatefulHost(
        "query-suggestions." +
        (region == null ? "" : region + ".") +
        "algolia.com",
        "https",
        EnumSet.of(CallType.READ, CallType.WRITE)
      )
    );
    return hosts;
  }

  /**
   * Build call for createConfig
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call createConfigCall(
    QuerySuggestionsIndexWithIndexParam querySuggestionsIndexWithIndexParam,
    final ApiCallback<SucessResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = querySuggestionsIndexWithIndexParam;

    // create path and map variables
    String requestPath = "/1/configs";

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

  private Call createConfigValidateBeforeCall(
    QuerySuggestionsIndexWithIndexParam querySuggestionsIndexWithIndexParam,
    final ApiCallback<SucessResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'querySuggestionsIndexWithIndexParam' is set
    if (querySuggestionsIndexWithIndexParam == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'querySuggestionsIndexWithIndexParam' when calling" +
        " createConfig(Async)"
      );
    }

    return createConfigCall(querySuggestionsIndexWithIndexParam, callback);
  }

  /**
   * Create a configuration of a Query Suggestions index. There's a limit of 100 configurations per
   * application.
   *
   * @param querySuggestionsIndexWithIndexParam (required)
   * @return SucessResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SucessResponse createConfig(
    QuerySuggestionsIndexWithIndexParam querySuggestionsIndexWithIndexParam
  ) throws AlgoliaRuntimeException {
    Call req = createConfigValidateBeforeCall(
      querySuggestionsIndexWithIndexParam,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseQuerySuggestions.CreateConfig(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SucessResponse>() {}.getType();
    ApiResponse<SucessResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Create a configuration of a Query Suggestions index. There&#39;s a limit of
   * 100 configurations per application.
   *
   * @param querySuggestionsIndexWithIndexParam (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call createConfigAsync(
    QuerySuggestionsIndexWithIndexParam querySuggestionsIndexWithIndexParam,
    final ApiCallback<SucessResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = createConfigValidateBeforeCall(
      querySuggestionsIndexWithIndexParam,
      callback
    );
    Type returnType = new TypeToken<SucessResponse>() {}.getType();
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
          this.parameterToPair(parameter.getKey(), parameter.getValue())
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
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'path' is set
    if (path == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'path' when calling del(Async)"
      );
    }

    return delCall(path, parameters, callback);
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
  public Object del(String path, Map<String, Object> parameters)
    throws AlgoliaRuntimeException {
    Call req = delValidateBeforeCall(path, parameters, null);
    if (req instanceof CallEcho) {
      return new EchoResponseQuerySuggestions.Del(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<Object>() {}.getType();
    ApiResponse<Object> res = this.execute(call, returnType);
    return res.getData();
  }

  public Object del(String path) throws AlgoliaRuntimeException {
    return this.del(path, new HashMap<>());
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
  public Call delAsync(
    String path,
    Map<String, Object> parameters,
    final ApiCallback<Object> callback
  ) throws AlgoliaRuntimeException {
    Call call = delValidateBeforeCall(path, parameters, callback);
    Type returnType = new TypeToken<Object>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for deleteConfig
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call deleteConfigCall(
    String indexName,
    final ApiCallback<SucessResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/configs/{indexName}".replaceAll(
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

  private Call deleteConfigValidateBeforeCall(
    String indexName,
    final ApiCallback<SucessResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling deleteConfig(Async)"
      );
    }

    return deleteConfigCall(indexName, callback);
  }

  /**
   * Delete a configuration of a Query Suggestion's index. By deleting a configuraton, you stop all
   * updates to the underlying query suggestion index. Note that when doing this, the underlying
   * index does not change - existing suggestions remain untouched.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return SucessResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SucessResponse deleteConfig(String indexName)
    throws AlgoliaRuntimeException {
    Call req = deleteConfigValidateBeforeCall(indexName, null);
    if (req instanceof CallEcho) {
      return new EchoResponseQuerySuggestions.DeleteConfig(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SucessResponse>() {}.getType();
    ApiResponse<SucessResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Delete a configuration of a Query Suggestion&#39;s index. By deleting a
   * configuraton, you stop all updates to the underlying query suggestion index. Note that when
   * doing this, the underlying index does not change - existing suggestions remain untouched.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call deleteConfigAsync(
    String indexName,
    final ApiCallback<SucessResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = deleteConfigValidateBeforeCall(indexName, callback);
    Type returnType = new TypeToken<SucessResponse>() {}.getType();
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
          this.parameterToPair(parameter.getKey(), parameter.getValue())
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
      return new EchoResponseQuerySuggestions.Get(((CallEcho) req).request());
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
   * Build call for getAllConfigs
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getAllConfigsCall(
    final ApiCallback<List<QuerySuggestionsIndex>> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/1/configs";

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

  private Call getAllConfigsValidateBeforeCall(
    final ApiCallback<List<QuerySuggestionsIndex>> callback
  ) throws AlgoliaRuntimeException {
    return getAllConfigsCall(callback);
  }

  /**
   * Get all the configurations of Query Suggestions. For each index, you get a block of JSON with a
   * list of its configuration settings.
   *
   * @return List&lt;QuerySuggestionsIndex&gt;
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public List<QuerySuggestionsIndex> getAllConfigs()
    throws AlgoliaRuntimeException {
    Call req = getAllConfigsValidateBeforeCall(null);
    if (req instanceof CallEcho) {
      return new EchoResponseQuerySuggestions.GetAllConfigs(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<List<QuerySuggestionsIndex>>() {}.getType();
    ApiResponse<List<QuerySuggestionsIndex>> res =
      this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Get all the configurations of Query Suggestions. For each index, you get a
   * block of JSON with a list of its configuration settings.
   *
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getAllConfigsAsync(
    final ApiCallback<List<QuerySuggestionsIndex>> callback
  ) throws AlgoliaRuntimeException {
    Call call = getAllConfigsValidateBeforeCall(callback);
    Type returnType = new TypeToken<List<QuerySuggestionsIndex>>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getConfig
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getConfigCall(
    String indexName,
    final ApiCallback<QuerySuggestionsIndex> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/configs/{indexName}".replaceAll(
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

  private Call getConfigValidateBeforeCall(
    String indexName,
    final ApiCallback<QuerySuggestionsIndex> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling getConfig(Async)"
      );
    }

    return getConfigCall(indexName, callback);
  }

  /**
   * Get the configuration of a single Query Suggestions index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return QuerySuggestionsIndex
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public QuerySuggestionsIndex getConfig(String indexName)
    throws AlgoliaRuntimeException {
    Call req = getConfigValidateBeforeCall(indexName, null);
    if (req instanceof CallEcho) {
      return new EchoResponseQuerySuggestions.GetConfig(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<QuerySuggestionsIndex>() {}.getType();
    ApiResponse<QuerySuggestionsIndex> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Get the configuration of a single Query Suggestions index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getConfigAsync(
    String indexName,
    final ApiCallback<QuerySuggestionsIndex> callback
  ) throws AlgoliaRuntimeException {
    Call call = getConfigValidateBeforeCall(indexName, callback);
    Type returnType = new TypeToken<QuerySuggestionsIndex>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getConfigStatus
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getConfigStatusCall(
    String indexName,
    final ApiCallback<Status> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/configs/{indexName}/status".replaceAll(
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

  private Call getConfigStatusValidateBeforeCall(
    String indexName,
    final ApiCallback<Status> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling getConfigStatus(Async)"
      );
    }

    return getConfigStatusCall(indexName, callback);
  }

  /**
   * Get the status of a Query Suggestion's index. The status includes whether the Query Suggestions
   * index is currently in the process of being built, and the last build time.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return Status
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public Status getConfigStatus(String indexName)
    throws AlgoliaRuntimeException {
    Call req = getConfigStatusValidateBeforeCall(indexName, null);
    if (req instanceof CallEcho) {
      return new EchoResponseQuerySuggestions.GetConfigStatus(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<Status>() {}.getType();
    ApiResponse<Status> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Get the status of a Query Suggestion&#39;s index. The status includes whether
   * the Query Suggestions index is currently in the process of being built, and the last build
   * time.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getConfigStatusAsync(
    String indexName,
    final ApiCallback<Status> callback
  ) throws AlgoliaRuntimeException {
    Call call = getConfigStatusValidateBeforeCall(indexName, callback);
    Type returnType = new TypeToken<Status>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getLogFile
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getLogFileCall(
    String indexName,
    final ApiCallback<List<LogFile>> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/1/logs/{indexName}".replaceAll(
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

  private Call getLogFileValidateBeforeCall(
    String indexName,
    final ApiCallback<List<LogFile>> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling getLogFile(Async)"
      );
    }

    return getLogFileCall(indexName, callback);
  }

  /**
   * Get the log file of the last build of a single Query Suggestion index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @return List&lt;LogFile&gt;
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public List<LogFile> getLogFile(String indexName)
    throws AlgoliaRuntimeException {
    Call req = getLogFileValidateBeforeCall(indexName, null);
    if (req instanceof CallEcho) {
      return new EchoResponseQuerySuggestions.GetLogFile(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<List<LogFile>>() {}.getType();
    ApiResponse<List<LogFile>> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Get the log file of the last build of a single Query Suggestion index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getLogFileAsync(
    String indexName,
    final ApiCallback<List<LogFile>> callback
  ) throws AlgoliaRuntimeException {
    Call call = getLogFileValidateBeforeCall(indexName, callback);
    Type returnType = new TypeToken<List<LogFile>>() {}.getType();
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
          this.parameterToPair(parameter.getKey(), parameter.getValue())
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
      return new EchoResponseQuerySuggestions.Post(((CallEcho) req).request());
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
          this.parameterToPair(parameter.getKey(), parameter.getValue())
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
      return new EchoResponseQuerySuggestions.Put(((CallEcho) req).request());
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
   * Build call for updateConfig
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call updateConfigCall(
    String indexName,
    QuerySuggestionsIndexParam querySuggestionsIndexParam,
    final ApiCallback<SucessResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = querySuggestionsIndexParam;

    // create path and map variables
    String requestPath =
      "/1/configs/{indexName}".replaceAll(
          "\\{indexName\\}",
          this.escapeString(indexName.toString())
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

  private Call updateConfigValidateBeforeCall(
    String indexName,
    QuerySuggestionsIndexParam querySuggestionsIndexParam,
    final ApiCallback<SucessResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'indexName' is set
    if (indexName == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'indexName' when calling updateConfig(Async)"
      );
    }

    // verify the required parameter 'querySuggestionsIndexParam' is set
    if (querySuggestionsIndexParam == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'querySuggestionsIndexParam' when calling" +
        " updateConfig(Async)"
      );
    }

    return updateConfigCall(indexName, querySuggestionsIndexParam, callback);
  }

  /**
   * Update the configuration of a Query Suggestions index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param querySuggestionsIndexParam (required)
   * @return SucessResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public SucessResponse updateConfig(
    String indexName,
    QuerySuggestionsIndexParam querySuggestionsIndexParam
  ) throws AlgoliaRuntimeException {
    Call req = updateConfigValidateBeforeCall(
      indexName,
      querySuggestionsIndexParam,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseQuerySuggestions.UpdateConfig(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<SucessResponse>() {}.getType();
    ApiResponse<SucessResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Update the configuration of a Query Suggestions index.
   *
   * @param indexName The index in which to perform the request. (required)
   * @param querySuggestionsIndexParam (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call updateConfigAsync(
    String indexName,
    QuerySuggestionsIndexParam querySuggestionsIndexParam,
    final ApiCallback<SucessResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = updateConfigValidateBeforeCall(
      indexName,
      querySuggestionsIndexParam,
      callback
    );
    Type returnType = new TypeToken<SucessResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }
}
