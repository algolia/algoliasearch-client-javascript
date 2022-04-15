package com.algolia.api;

import com.algolia.ApiCallback;
import com.algolia.ApiClient;
import com.algolia.ApiResponse;
import com.algolia.Pair;
import com.algolia.exceptions.*;
import com.algolia.model.abtesting.*;
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

public class AbtestingApi extends ApiClient {

  public AbtestingApi(String appId, String apiKey) {
    this(appId, apiKey, new HttpRequester(getDefaultHosts(null)), null);
  }

  public AbtestingApi(String appId, String apiKey, String region) {
    this(appId, apiKey, new HttpRequester(getDefaultHosts(region)), null);
  }

  public AbtestingApi(
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

  public AbtestingApi(String appId, String apiKey, Requester requester) {
    this(appId, apiKey, requester, null);
  }

  public AbtestingApi(
    String appId,
    String apiKey,
    Requester requester,
    UserAgent.Segment[] userAgentSegments
  ) {
    super(appId, apiKey, requester, "Abtesting", userAgentSegments);
  }

  private static List<StatefulHost> getDefaultHosts(String region) {
    List<StatefulHost> hosts = new ArrayList<StatefulHost>();
    hosts.add(
      new StatefulHost(
        "analytics." + (region == null ? "" : region + ".") + "algolia.com",
        "https",
        EnumSet.of(CallType.READ, CallType.WRITE)
      )
    );
    return hosts;
  }

  /**
   * Build call for addABTests
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call addABTestsCall(
    AddABTestsRequest addABTestsRequest,
    final ApiCallback<ABTestResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = addABTestsRequest;

    // create path and map variables
    String requestPath = "/2/abtests";

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

  private Call addABTestsValidateBeforeCall(
    AddABTestsRequest addABTestsRequest,
    final ApiCallback<ABTestResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'addABTestsRequest' is set
    if (addABTestsRequest == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'addABTestsRequest' when calling addABTests(Async)"
      );
    }

    return addABTestsCall(addABTestsRequest, callback);
  }

  /**
   * Creates a new A/B test with provided configuration. You can set an A/B test on two different
   * indices with different settings, or on the same index with different search parameters by
   * providing a customSearchParameters setting on one of the variants.
   *
   * @param addABTestsRequest (required)
   * @return ABTestResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public ABTestResponse addABTests(AddABTestsRequest addABTestsRequest)
    throws AlgoliaRuntimeException {
    Call req = addABTestsValidateBeforeCall(addABTestsRequest, null);
    if (req instanceof CallEcho) {
      return new EchoResponseAbtesting.AddABTests(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<ABTestResponse>() {}.getType();
    ApiResponse<ABTestResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Creates a new A/B test with provided configuration. You can set an A/B test on
   * two different indices with different settings, or on the same index with different search
   * parameters by providing a customSearchParameters setting on one of the variants.
   *
   * @param addABTestsRequest (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call addABTestsAsync(
    AddABTestsRequest addABTestsRequest,
    final ApiCallback<ABTestResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = addABTestsValidateBeforeCall(addABTestsRequest, callback);
    Type returnType = new TypeToken<ABTestResponse>() {}.getType();
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
      return new EchoResponseAbtesting.Del(((CallEcho) req).request());
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
   * Build call for deleteABTest
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call deleteABTestCall(
    Integer id,
    final ApiCallback<ABTestResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/2/abtests/{id}".replaceAll(
          "\\{id\\}",
          this.escapeString(id.toString())
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

  private Call deleteABTestValidateBeforeCall(
    Integer id,
    final ApiCallback<ABTestResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'id' is set
    if (id == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'id' when calling deleteABTest(Async)"
      );
    }

    return deleteABTestCall(id, callback);
  }

  /**
   * Deletes the A/B Test and removes all associated metadata & metrics.
   *
   * @param id The A/B test ID. (required)
   * @return ABTestResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public ABTestResponse deleteABTest(Integer id)
    throws AlgoliaRuntimeException {
    Call req = deleteABTestValidateBeforeCall(id, null);
    if (req instanceof CallEcho) {
      return new EchoResponseAbtesting.DeleteABTest(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<ABTestResponse>() {}.getType();
    ApiResponse<ABTestResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Deletes the A/B Test and removes all associated metadata &amp; metrics.
   *
   * @param id The A/B test ID. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call deleteABTestAsync(
    Integer id,
    final ApiCallback<ABTestResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = deleteABTestValidateBeforeCall(id, callback);
    Type returnType = new TypeToken<ABTestResponse>() {}.getType();
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
      return new EchoResponseAbtesting.Get(((CallEcho) req).request());
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
   * Build call for getABTest
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getABTestCall(Integer id, final ApiCallback<ABTest> callback)
    throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/2/abtests/{id}".replaceAll(
          "\\{id\\}",
          this.escapeString(id.toString())
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

  private Call getABTestValidateBeforeCall(
    Integer id,
    final ApiCallback<ABTest> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'id' is set
    if (id == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'id' when calling getABTest(Async)"
      );
    }

    return getABTestCall(id, callback);
  }

  /**
   * Returns metadata and metrics for A/B test id. Behaves in the same way as GET /2/abtests however
   * the endpoint will return 403.
   *
   * @param id The A/B test ID. (required)
   * @return ABTest
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public ABTest getABTest(Integer id) throws AlgoliaRuntimeException {
    Call req = getABTestValidateBeforeCall(id, null);
    if (req instanceof CallEcho) {
      return new EchoResponseAbtesting.GetABTest(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<ABTest>() {}.getType();
    ApiResponse<ABTest> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Returns metadata and metrics for A/B test id. Behaves in the same way as GET
   * /2/abtests however the endpoint will return 403.
   *
   * @param id The A/B test ID. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getABTestAsync(Integer id, final ApiCallback<ABTest> callback)
    throws AlgoliaRuntimeException {
    Call call = getABTestValidateBeforeCall(id, callback);
    Type returnType = new TypeToken<ABTest>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for listABTests
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call listABTestsCall(
    Integer offset,
    Integer limit,
    final ApiCallback<ListABTestsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/abtests";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (offset != null) {
      queryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (limit != null) {
      queryParams.addAll(this.parameterToPair("limit", limit));
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

  private Call listABTestsValidateBeforeCall(
    Integer offset,
    Integer limit,
    final ApiCallback<ListABTestsResponse> callback
  ) throws AlgoliaRuntimeException {
    return listABTestsCall(offset, limit, callback);
  }

  /**
   * Fetch all existing A/B tests for App that are available for the current API Key. Returns an
   * array of metadata and metrics. When no data has been processed, the metrics will be returned as
   * null.
   *
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @return ListABTestsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public ListABTestsResponse listABTests(Integer offset, Integer limit)
    throws AlgoliaRuntimeException {
    Call req = listABTestsValidateBeforeCall(offset, limit, null);
    if (req instanceof CallEcho) {
      return new EchoResponseAbtesting.ListABTests(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<ListABTestsResponse>() {}.getType();
    ApiResponse<ListABTestsResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public ListABTestsResponse listABTests() throws AlgoliaRuntimeException {
    return this.listABTests(0, 10);
  }

  /**
   * (asynchronously) Fetch all existing A/B tests for App that are available for the current API
   * Key. Returns an array of metadata and metrics. When no data has been processed, the metrics
   * will be returned as null.
   *
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call listABTestsAsync(
    Integer offset,
    Integer limit,
    final ApiCallback<ListABTestsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = listABTestsValidateBeforeCall(offset, limit, callback);
    Type returnType = new TypeToken<ListABTestsResponse>() {}.getType();
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
      return new EchoResponseAbtesting.Post(((CallEcho) req).request());
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
      return new EchoResponseAbtesting.Put(((CallEcho) req).request());
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
   * Build call for stopABTest
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call stopABTestCall(
    Integer id,
    final ApiCallback<ABTestResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/2/abtests/{id}/stop".replaceAll(
          "\\{id\\}",
          this.escapeString(id.toString())
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

  private Call stopABTestValidateBeforeCall(
    Integer id,
    final ApiCallback<ABTestResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'id' is set
    if (id == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'id' when calling stopABTest(Async)"
      );
    }

    return stopABTestCall(id, callback);
  }

  /**
   * Marks the A/B test as stopped. At this point, the test is over and cannot be restarted. As a
   * result, your application is back to normal: index A will perform as usual, receiving 100% of
   * all search requests. Associated metadata and metrics are still stored.
   *
   * @param id The A/B test ID. (required)
   * @return ABTestResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public ABTestResponse stopABTest(Integer id) throws AlgoliaRuntimeException {
    Call req = stopABTestValidateBeforeCall(id, null);
    if (req instanceof CallEcho) {
      return new EchoResponseAbtesting.StopABTest(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<ABTestResponse>() {}.getType();
    ApiResponse<ABTestResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Marks the A/B test as stopped. At this point, the test is over and cannot be
   * restarted. As a result, your application is back to normal: index A will perform as usual,
   * receiving 100% of all search requests. Associated metadata and metrics are still stored.
   *
   * @param id The A/B test ID. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call stopABTestAsync(
    Integer id,
    final ApiCallback<ABTestResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = stopABTestValidateBeforeCall(id, callback);
    Type returnType = new TypeToken<ABTestResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }
}
