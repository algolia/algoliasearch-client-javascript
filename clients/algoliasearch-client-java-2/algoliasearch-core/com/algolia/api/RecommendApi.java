package com.algolia.api;

import com.algolia.ApiCallback;
import com.algolia.ApiClient;
import com.algolia.ApiResponse;
import com.algolia.Pair;
import com.algolia.exceptions.*;
import com.algolia.model.recommend.*;
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

public class RecommendApi extends ApiClient {

  public RecommendApi(String appId, String apiKey) {
    this(appId, apiKey, new HttpRequester(getDefaultHosts(appId)), null);
  }

  public RecommendApi(
    String appId,
    String apiKey,
    UserAgent.Segment[] userAgentSegments
  ) {
    this(
      appId,
      apiKey,
      new HttpRequester(getDefaultHosts(appId)),
      userAgentSegments
    );
  }

  public RecommendApi(String appId, String apiKey, Requester requester) {
    this(appId, apiKey, requester, null);
  }

  public RecommendApi(
    String appId,
    String apiKey,
    Requester requester,
    UserAgent.Segment[] userAgentSegments
  ) {
    super(appId, apiKey, requester, "Recommend", userAgentSegments);
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
      return new EchoResponseRecommend.Del(((CallEcho) req).request());
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
      return new EchoResponseRecommend.Get(((CallEcho) req).request());
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
   * Build call for getRecommendations
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getRecommendationsCall(
    GetRecommendationsParams getRecommendationsParams,
    final ApiCallback<GetRecommendationsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = getRecommendationsParams;

    // create path and map variables
    String requestPath = "/1/indexes/*/recommendations";

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

  private Call getRecommendationsValidateBeforeCall(
    GetRecommendationsParams getRecommendationsParams,
    final ApiCallback<GetRecommendationsResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'getRecommendationsParams' is set
    if (getRecommendationsParams == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'getRecommendationsParams' when calling" +
        " getRecommendations(Async)"
      );
    }

    return getRecommendationsCall(getRecommendationsParams, callback);
  }

  /**
   * Returns recommendations for a specific model and objectID.
   *
   * @param getRecommendationsParams (required)
   * @return GetRecommendationsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetRecommendationsResponse getRecommendations(
    GetRecommendationsParams getRecommendationsParams
  ) throws AlgoliaRuntimeException {
    Call req = getRecommendationsValidateBeforeCall(
      getRecommendationsParams,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseRecommend.GetRecommendations(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetRecommendationsResponse>() {}.getType();
    ApiResponse<GetRecommendationsResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Returns recommendations for a specific model and objectID.
   *
   * @param getRecommendationsParams (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getRecommendationsAsync(
    GetRecommendationsParams getRecommendationsParams,
    final ApiCallback<GetRecommendationsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getRecommendationsValidateBeforeCall(
      getRecommendationsParams,
      callback
    );
    Type returnType = new TypeToken<GetRecommendationsResponse>() {}.getType();
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
      return new EchoResponseRecommend.Post(((CallEcho) req).request());
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
      return new EchoResponseRecommend.Put(((CallEcho) req).request());
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
}
