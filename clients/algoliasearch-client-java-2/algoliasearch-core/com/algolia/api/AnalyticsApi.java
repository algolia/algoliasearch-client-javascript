package com.algolia.api;

import com.algolia.ApiCallback;
import com.algolia.ApiClient;
import com.algolia.ApiResponse;
import com.algolia.Pair;
import com.algolia.exceptions.*;
import com.algolia.model.analytics.*;
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

public class AnalyticsApi extends ApiClient {

  public AnalyticsApi(String appId, String apiKey) {
    this(appId, apiKey, new HttpRequester(getDefaultHosts(null)), null);
  }

  public AnalyticsApi(String appId, String apiKey, String region) {
    this(appId, apiKey, new HttpRequester(getDefaultHosts(region)), null);
  }

  public AnalyticsApi(
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

  public AnalyticsApi(String appId, String apiKey, Requester requester) {
    this(appId, apiKey, requester, null);
  }

  public AnalyticsApi(
    String appId,
    String apiKey,
    Requester requester,
    UserAgent.Segment[] userAgentSegments
  ) {
    super(appId, apiKey, requester, "Analytics", userAgentSegments);
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
      return new EchoResponseAnalytics.Del(((CallEcho) req).request());
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
      return new EchoResponseAnalytics.Get(((CallEcho) req).request());
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
   * Build call for getAverageClickPosition
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getAverageClickPositionCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetAverageClickPositionResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/clicks/averageClickPosition";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getAverageClickPositionValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetAverageClickPositionResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getAverageClickPosition(Async)"
      );
    }

    return getAverageClickPositionCall(
      index,
      startDate,
      endDate,
      tags,
      callback
    );
  }

  /**
   * Returns the average click position. The endpoint returns a value for the complete given time
   * range, as well as a value per day.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetAverageClickPositionResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetAverageClickPositionResponse getAverageClickPosition(
    String index,
    String startDate,
    String endDate,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getAverageClickPositionValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetAverageClickPosition(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetAverageClickPositionResponse>() {}
      .getType();
    ApiResponse<GetAverageClickPositionResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  public GetAverageClickPositionResponse getAverageClickPosition(String index)
    throws AlgoliaRuntimeException {
    return this.getAverageClickPosition(index, null, null, null);
  }

  /**
   * (asynchronously) Returns the average click position. The endpoint returns a value for the
   * complete given time range, as well as a value per day.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getAverageClickPositionAsync(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetAverageClickPositionResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getAverageClickPositionValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetAverageClickPositionResponse>() {}
      .getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getClickPositions
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getClickPositionsCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetClickPositionsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/clicks/positions";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getClickPositionsValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetClickPositionsResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getClickPositions(Async)"
      );
    }

    return getClickPositionsCall(index, startDate, endDate, tags, callback);
  }

  /**
   * Returns the distribution of clicks per range of positions.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetClickPositionsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetClickPositionsResponse getClickPositions(
    String index,
    String startDate,
    String endDate,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getClickPositionsValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetClickPositions(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetClickPositionsResponse>() {}.getType();
    ApiResponse<GetClickPositionsResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public GetClickPositionsResponse getClickPositions(String index)
    throws AlgoliaRuntimeException {
    return this.getClickPositions(index, null, null, null);
  }

  /**
   * (asynchronously) Returns the distribution of clicks per range of positions.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getClickPositionsAsync(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetClickPositionsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getClickPositionsValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetClickPositionsResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getClickThroughRate
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getClickThroughRateCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetClickThroughRateResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/clicks/clickThroughRate";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getClickThroughRateValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetClickThroughRateResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getClickThroughRate(Async)"
      );
    }

    return getClickThroughRateCall(index, startDate, endDate, tags, callback);
  }

  /**
   * Returns a click-through rate (CTR). The endpoint returns a value for the complete given time
   * range, as well as a value per day. It also returns the count of clicks and searches used to
   * compute the rates.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetClickThroughRateResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetClickThroughRateResponse getClickThroughRate(
    String index,
    String startDate,
    String endDate,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getClickThroughRateValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetClickThroughRate(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetClickThroughRateResponse>() {}.getType();
    ApiResponse<GetClickThroughRateResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  public GetClickThroughRateResponse getClickThroughRate(String index)
    throws AlgoliaRuntimeException {
    return this.getClickThroughRate(index, null, null, null);
  }

  /**
   * (asynchronously) Returns a click-through rate (CTR). The endpoint returns a value for the
   * complete given time range, as well as a value per day. It also returns the count of clicks and
   * searches used to compute the rates.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getClickThroughRateAsync(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetClickThroughRateResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getClickThroughRateValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetClickThroughRateResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getConversationRate
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getConversationRateCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetConversationRateResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/conversions/conversionRate";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getConversationRateValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetConversationRateResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getConversationRate(Async)"
      );
    }

    return getConversationRateCall(index, startDate, endDate, tags, callback);
  }

  /**
   * Returns a conversion rate (CR). The endpoint returns a value for the complete given time range,
   * as well as a value per day. It also returns the count of conversion and searches used to
   * compute the rates.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetConversationRateResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetConversationRateResponse getConversationRate(
    String index,
    String startDate,
    String endDate,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getConversationRateValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetConversationRate(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetConversationRateResponse>() {}.getType();
    ApiResponse<GetConversationRateResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  public GetConversationRateResponse getConversationRate(String index)
    throws AlgoliaRuntimeException {
    return this.getConversationRate(index, null, null, null);
  }

  /**
   * (asynchronously) Returns a conversion rate (CR). The endpoint returns a value for the complete
   * given time range, as well as a value per day. It also returns the count of conversion and
   * searches used to compute the rates.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getConversationRateAsync(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetConversationRateResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getConversationRateValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetConversationRateResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getNoClickRate
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getNoClickRateCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetNoClickRateResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/searches/noClickRate";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getNoClickRateValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetNoClickRateResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getNoClickRate(Async)"
      );
    }

    return getNoClickRateCall(index, startDate, endDate, tags, callback);
  }

  /**
   * Returns the rate at which searches didn't lead to any clicks. The endpoint returns a value for
   * the complete given time range, as well as a value per day. It also returns the count of
   * searches and searches without clicks.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetNoClickRateResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetNoClickRateResponse getNoClickRate(
    String index,
    String startDate,
    String endDate,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getNoClickRateValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetNoClickRate(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetNoClickRateResponse>() {}.getType();
    ApiResponse<GetNoClickRateResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public GetNoClickRateResponse getNoClickRate(String index)
    throws AlgoliaRuntimeException {
    return this.getNoClickRate(index, null, null, null);
  }

  /**
   * (asynchronously) Returns the rate at which searches didn&#39;t lead to any clicks. The endpoint
   * returns a value for the complete given time range, as well as a value per day. It also returns
   * the count of searches and searches without clicks.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getNoClickRateAsync(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetNoClickRateResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getNoClickRateValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetNoClickRateResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getNoResultsRate
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getNoResultsRateCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetNoResultsRateResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/searches/noResultRate";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getNoResultsRateValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetNoResultsRateResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getNoResultsRate(Async)"
      );
    }

    return getNoResultsRateCall(index, startDate, endDate, tags, callback);
  }

  /**
   * Returns the rate at which searches didn't return any results. The endpoint returns a value for
   * the complete given time range, as well as a value per day. It also returns the count of
   * searches and searches without results used to compute the rates.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetNoResultsRateResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetNoResultsRateResponse getNoResultsRate(
    String index,
    String startDate,
    String endDate,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getNoResultsRateValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetNoResultsRate(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetNoResultsRateResponse>() {}.getType();
    ApiResponse<GetNoResultsRateResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public GetNoResultsRateResponse getNoResultsRate(String index)
    throws AlgoliaRuntimeException {
    return this.getNoResultsRate(index, null, null, null);
  }

  /**
   * (asynchronously) Returns the rate at which searches didn&#39;t return any results. The endpoint
   * returns a value for the complete given time range, as well as a value per day. It also returns
   * the count of searches and searches without results used to compute the rates.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getNoResultsRateAsync(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetNoResultsRateResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getNoResultsRateValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetNoResultsRateResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getSearchesCount
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getSearchesCountCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetSearchesCountResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/searches/count";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getSearchesCountValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetSearchesCountResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getSearchesCount(Async)"
      );
    }

    return getSearchesCountCall(index, startDate, endDate, tags, callback);
  }

  /**
   * Returns the number of searches across the given time range. The endpoint returns a value for
   * the complete given time range, as well as a value per day.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetSearchesCountResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetSearchesCountResponse getSearchesCount(
    String index,
    String startDate,
    String endDate,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getSearchesCountValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetSearchesCount(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetSearchesCountResponse>() {}.getType();
    ApiResponse<GetSearchesCountResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public GetSearchesCountResponse getSearchesCount(String index)
    throws AlgoliaRuntimeException {
    return this.getSearchesCount(index, null, null, null);
  }

  /**
   * (asynchronously) Returns the number of searches across the given time range. The endpoint
   * returns a value for the complete given time range, as well as a value per day.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getSearchesCountAsync(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetSearchesCountResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getSearchesCountValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetSearchesCountResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getSearchesNoClicks
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getSearchesNoClicksCall(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetSearchesNoClicksResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/searches/noClicks";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (limit != null) {
      queryParams.addAll(this.parameterToPair("limit", limit));
    }

    if (offset != null) {
      queryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getSearchesNoClicksValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetSearchesNoClicksResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getSearchesNoClicks(Async)"
      );
    }

    return getSearchesNoClicksCall(
      index,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
  }

  /**
   * Returns top searches that didn't lead to any clicks. Limited to the 1000 most frequent ones.
   * For each search, also returns the average number of found hits.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetSearchesNoClicksResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetSearchesNoClicksResponse getSearchesNoClicks(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getSearchesNoClicksValidateBeforeCall(
      index,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetSearchesNoClicks(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetSearchesNoClicksResponse>() {}.getType();
    ApiResponse<GetSearchesNoClicksResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  public GetSearchesNoClicksResponse getSearchesNoClicks(String index)
    throws AlgoliaRuntimeException {
    return this.getSearchesNoClicks(index, null, null, 10, 0, null);
  }

  /**
   * (asynchronously) Returns top searches that didn&#39;t lead to any clicks. Limited to the 1000
   * most frequent ones. For each search, also returns the average number of found hits.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getSearchesNoClicksAsync(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetSearchesNoClicksResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getSearchesNoClicksValidateBeforeCall(
      index,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetSearchesNoClicksResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getSearchesNoResults
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getSearchesNoResultsCall(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetSearchesNoResultsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/searches/noResults";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (limit != null) {
      queryParams.addAll(this.parameterToPair("limit", limit));
    }

    if (offset != null) {
      queryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getSearchesNoResultsValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetSearchesNoResultsResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getSearchesNoResults(Async)"
      );
    }

    return getSearchesNoResultsCall(
      index,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
  }

  /**
   * Returns top searches that didn't return any results. Limited to the 1000 most frequent ones.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetSearchesNoResultsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetSearchesNoResultsResponse getSearchesNoResults(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getSearchesNoResultsValidateBeforeCall(
      index,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetSearchesNoResults(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetSearchesNoResultsResponse>() {}
      .getType();
    ApiResponse<GetSearchesNoResultsResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  public GetSearchesNoResultsResponse getSearchesNoResults(String index)
    throws AlgoliaRuntimeException {
    return this.getSearchesNoResults(index, null, null, 10, 0, null);
  }

  /**
   * (asynchronously) Returns top searches that didn&#39;t return any results. Limited to the 1000
   * most frequent ones.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getSearchesNoResultsAsync(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetSearchesNoResultsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getSearchesNoResultsValidateBeforeCall(
      index,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetSearchesNoResultsResponse>() {}
      .getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getStatus
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getStatusCall(
    String index,
    final ApiCallback<GetStatusResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/status";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
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

  private Call getStatusValidateBeforeCall(
    String index,
    final ApiCallback<GetStatusResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getStatus(Async)"
      );
    }

    return getStatusCall(index, callback);
  }

  /**
   * Returns the latest update time of the analytics API for a given index. If the index has been
   * recently created and/or no search has been performed yet the updated time will be null.
   *
   * @param index The index name to target. (required)
   * @return GetStatusResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetStatusResponse getStatus(String index)
    throws AlgoliaRuntimeException {
    Call req = getStatusValidateBeforeCall(index, null);
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetStatus(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetStatusResponse>() {}.getType();
    ApiResponse<GetStatusResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  /**
   * (asynchronously) Returns the latest update time of the analytics API for a given index. If the
   * index has been recently created and/or no search has been performed yet the updated time will
   * be null.
   *
   * @param index The index name to target. (required)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getStatusAsync(
    String index,
    final ApiCallback<GetStatusResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getStatusValidateBeforeCall(index, callback);
    Type returnType = new TypeToken<GetStatusResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getTopCountries
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getTopCountriesCall(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopCountriesResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/countries";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (limit != null) {
      queryParams.addAll(this.parameterToPair("limit", limit));
    }

    if (offset != null) {
      queryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getTopCountriesValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopCountriesResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getTopCountries(Async)"
      );
    }

    return getTopCountriesCall(
      index,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
  }

  /**
   * Returns top countries. Limited to the 1000 most frequent ones.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetTopCountriesResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetTopCountriesResponse getTopCountries(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getTopCountriesValidateBeforeCall(
      index,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetTopCountries(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetTopCountriesResponse>() {}.getType();
    ApiResponse<GetTopCountriesResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public GetTopCountriesResponse getTopCountries(String index)
    throws AlgoliaRuntimeException {
    return this.getTopCountries(index, null, null, 10, 0, null);
  }

  /**
   * (asynchronously) Returns top countries. Limited to the 1000 most frequent ones.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getTopCountriesAsync(
    String index,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopCountriesResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getTopCountriesValidateBeforeCall(
      index,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetTopCountriesResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getTopFilterAttributes
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getTopFilterAttributesCall(
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopFilterAttributesResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/filters";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (search != null) {
      queryParams.addAll(this.parameterToPair("search", search));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (limit != null) {
      queryParams.addAll(this.parameterToPair("limit", limit));
    }

    if (offset != null) {
      queryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getTopFilterAttributesValidateBeforeCall(
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopFilterAttributesResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getTopFilterAttributes(Async)"
      );
    }

    return getTopFilterAttributesCall(
      index,
      search,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
  }

  /**
   * Returns top filter attributes. Limited to the 1000 most used filters.
   *
   * @param index The index name to target. (required)
   * @param search The query term to search for. Must match the exact user input. (optional)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetTopFilterAttributesResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetTopFilterAttributesResponse getTopFilterAttributes(
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getTopFilterAttributesValidateBeforeCall(
      index,
      search,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetTopFilterAttributes(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetTopFilterAttributesResponse>() {}
      .getType();
    ApiResponse<GetTopFilterAttributesResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  public GetTopFilterAttributesResponse getTopFilterAttributes(String index)
    throws AlgoliaRuntimeException {
    return this.getTopFilterAttributes(index, null, null, null, 10, 0, null);
  }

  /**
   * (asynchronously) Returns top filter attributes. Limited to the 1000 most used filters.
   *
   * @param index The index name to target. (required)
   * @param search The query term to search for. Must match the exact user input. (optional)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getTopFilterAttributesAsync(
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopFilterAttributesResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getTopFilterAttributesValidateBeforeCall(
      index,
      search,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetTopFilterAttributesResponse>() {}
      .getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getTopFilterForAttribute
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getTopFilterForAttributeCall(
    String attribute,
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopFilterForAttributeResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath =
      "/2/filters/{attribute}".replaceAll(
          "\\{attribute\\}",
          this.escapeString(attribute.toString())
        );

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (search != null) {
      queryParams.addAll(this.parameterToPair("search", search));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (limit != null) {
      queryParams.addAll(this.parameterToPair("limit", limit));
    }

    if (offset != null) {
      queryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getTopFilterForAttributeValidateBeforeCall(
    String attribute,
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopFilterForAttributeResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'attribute' is set
    if (attribute == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'attribute' when calling" +
        " getTopFilterForAttribute(Async)"
      );
    }

    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getTopFilterForAttribute(Async)"
      );
    }

    return getTopFilterForAttributeCall(
      attribute,
      index,
      search,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
  }

  /**
   * Returns top filters for the given attribute. Limited to the 1000 most used filters.
   *
   * @param attribute The exact name of the attribute. (required)
   * @param index The index name to target. (required)
   * @param search The query term to search for. Must match the exact user input. (optional)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetTopFilterForAttributeResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetTopFilterForAttributeResponse getTopFilterForAttribute(
    String attribute,
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getTopFilterForAttributeValidateBeforeCall(
      attribute,
      index,
      search,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetTopFilterForAttribute(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetTopFilterForAttributeResponse>() {}
      .getType();
    ApiResponse<GetTopFilterForAttributeResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  public GetTopFilterForAttributeResponse getTopFilterForAttribute(
    String attribute,
    String index
  ) throws AlgoliaRuntimeException {
    return this.getTopFilterForAttribute(
        attribute,
        index,
        null,
        null,
        null,
        10,
        0,
        null
      );
  }

  /**
   * (asynchronously) Returns top filters for the given attribute. Limited to the 1000 most used
   * filters.
   *
   * @param attribute The exact name of the attribute. (required)
   * @param index The index name to target. (required)
   * @param search The query term to search for. Must match the exact user input. (optional)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getTopFilterForAttributeAsync(
    String attribute,
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopFilterForAttributeResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getTopFilterForAttributeValidateBeforeCall(
      attribute,
      index,
      search,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetTopFilterForAttributeResponse>() {}
      .getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getTopFiltersNoResults
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getTopFiltersNoResultsCall(
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopFiltersNoResultsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/filters/noResults";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (search != null) {
      queryParams.addAll(this.parameterToPair("search", search));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (limit != null) {
      queryParams.addAll(this.parameterToPair("limit", limit));
    }

    if (offset != null) {
      queryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getTopFiltersNoResultsValidateBeforeCall(
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopFiltersNoResultsResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getTopFiltersNoResults(Async)"
      );
    }

    return getTopFiltersNoResultsCall(
      index,
      search,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
  }

  /**
   * Returns top filters with no results. Limited to the 1000 most used filters.
   *
   * @param index The index name to target. (required)
   * @param search The query term to search for. Must match the exact user input. (optional)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetTopFiltersNoResultsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetTopFiltersNoResultsResponse getTopFiltersNoResults(
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getTopFiltersNoResultsValidateBeforeCall(
      index,
      search,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetTopFiltersNoResults(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetTopFiltersNoResultsResponse>() {}
      .getType();
    ApiResponse<GetTopFiltersNoResultsResponse> res =
      this.execute(call, returnType);
    return res.getData();
  }

  public GetTopFiltersNoResultsResponse getTopFiltersNoResults(String index)
    throws AlgoliaRuntimeException {
    return this.getTopFiltersNoResults(index, null, null, null, 10, 0, null);
  }

  /**
   * (asynchronously) Returns top filters with no results. Limited to the 1000 most used filters.
   *
   * @param index The index name to target. (required)
   * @param search The query term to search for. Must match the exact user input. (optional)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getTopFiltersNoResultsAsync(
    String index,
    String search,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopFiltersNoResultsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getTopFiltersNoResultsValidateBeforeCall(
      index,
      search,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetTopFiltersNoResultsResponse>() {}
      .getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getTopHits
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getTopHitsCall(
    String index,
    String search,
    Boolean clickAnalytics,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopHitsResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/hits";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (search != null) {
      queryParams.addAll(this.parameterToPair("search", search));
    }

    if (clickAnalytics != null) {
      queryParams.addAll(
        this.parameterToPair("clickAnalytics", clickAnalytics)
      );
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (limit != null) {
      queryParams.addAll(this.parameterToPair("limit", limit));
    }

    if (offset != null) {
      queryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getTopHitsValidateBeforeCall(
    String index,
    String search,
    Boolean clickAnalytics,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopHitsResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getTopHits(Async)"
      );
    }

    return getTopHitsCall(
      index,
      search,
      clickAnalytics,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
  }

  /**
   * Returns top hits. Limited to the 1000 most frequent ones.
   *
   * @param index The index name to target. (required)
   * @param search The query term to search for. Must match the exact user input. (optional)
   * @param clickAnalytics Whether to include the click-through and conversion rates for a search.
   *     (optional, default to false)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetTopHitsResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetTopHitsResponse getTopHits(
    String index,
    String search,
    Boolean clickAnalytics,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getTopHitsValidateBeforeCall(
      index,
      search,
      clickAnalytics,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetTopHits(((CallEcho) req).request());
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetTopHitsResponse>() {}.getType();
    ApiResponse<GetTopHitsResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public GetTopHitsResponse getTopHits(String index)
    throws AlgoliaRuntimeException {
    return this.getTopHits(index, null, false, null, null, 10, 0, null);
  }

  /**
   * (asynchronously) Returns top hits. Limited to the 1000 most frequent ones.
   *
   * @param index The index name to target. (required)
   * @param search The query term to search for. Must match the exact user input. (optional)
   * @param clickAnalytics Whether to include the click-through and conversion rates for a search.
   *     (optional, default to false)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getTopHitsAsync(
    String index,
    String search,
    Boolean clickAnalytics,
    String startDate,
    String endDate,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopHitsResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getTopHitsValidateBeforeCall(
      index,
      search,
      clickAnalytics,
      startDate,
      endDate,
      limit,
      offset,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetTopHitsResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getTopSearches
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getTopSearchesCall(
    String index,
    Boolean clickAnalytics,
    String startDate,
    String endDate,
    OrderBy orderBy,
    Direction direction,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopSearchesResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/searches";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (clickAnalytics != null) {
      queryParams.addAll(
        this.parameterToPair("clickAnalytics", clickAnalytics)
      );
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (orderBy != null) {
      queryParams.addAll(this.parameterToPair("orderBy", orderBy));
    }

    if (direction != null) {
      queryParams.addAll(this.parameterToPair("direction", direction));
    }

    if (limit != null) {
      queryParams.addAll(this.parameterToPair("limit", limit));
    }

    if (offset != null) {
      queryParams.addAll(this.parameterToPair("offset", offset));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getTopSearchesValidateBeforeCall(
    String index,
    Boolean clickAnalytics,
    String startDate,
    String endDate,
    OrderBy orderBy,
    Direction direction,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopSearchesResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getTopSearches(Async)"
      );
    }

    return getTopSearchesCall(
      index,
      clickAnalytics,
      startDate,
      endDate,
      orderBy,
      direction,
      limit,
      offset,
      tags,
      callback
    );
  }

  /**
   * Returns top searches. Limited to the 1000 most frequent ones. For each search, also returns the
   * average number of hits returned.
   *
   * @param index The index name to target. (required)
   * @param clickAnalytics Whether to include the click-through and conversion rates for a search.
   *     (optional, default to false)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param orderBy Reorder the results. (optional, default to searchCount)
   * @param direction The sorting of the result. (optional, default to asc)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetTopSearchesResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetTopSearchesResponse getTopSearches(
    String index,
    Boolean clickAnalytics,
    String startDate,
    String endDate,
    OrderBy orderBy,
    Direction direction,
    Integer limit,
    Integer offset,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getTopSearchesValidateBeforeCall(
      index,
      clickAnalytics,
      startDate,
      endDate,
      orderBy,
      direction,
      limit,
      offset,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetTopSearches(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetTopSearchesResponse>() {}.getType();
    ApiResponse<GetTopSearchesResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public GetTopSearchesResponse getTopSearches(String index)
    throws AlgoliaRuntimeException {
    return this.getTopSearches(
        index,
        false,
        null,
        null,
        OrderBy.SEARCH_COUNT,
        Direction.ASC,
        10,
        0,
        null
      );
  }

  /**
   * (asynchronously) Returns top searches. Limited to the 1000 most frequent ones. For each search,
   * also returns the average number of hits returned.
   *
   * @param index The index name to target. (required)
   * @param clickAnalytics Whether to include the click-through and conversion rates for a search.
   *     (optional, default to false)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param orderBy Reorder the results. (optional, default to searchCount)
   * @param direction The sorting of the result. (optional, default to asc)
   * @param limit Number of records to return. Limit is the size of the page. (optional, default to
   *     10)
   * @param offset Position of the starting record. Used for paging. 0 is the first record.
   *     (optional, default to 0)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getTopSearchesAsync(
    String index,
    Boolean clickAnalytics,
    String startDate,
    String endDate,
    OrderBy orderBy,
    Direction direction,
    Integer limit,
    Integer offset,
    String tags,
    final ApiCallback<GetTopSearchesResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getTopSearchesValidateBeforeCall(
      index,
      clickAnalytics,
      startDate,
      endDate,
      orderBy,
      direction,
      limit,
      offset,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetTopSearchesResponse>() {}.getType();
    this.executeAsync(call, returnType, callback);
    return call;
  }

  /**
   * Build call for getUsersCount
   *
   * @param callback Callback for upload/download progress
   * @return Call to execute
   * @throws AlgoliaRuntimeException If fail to serialize the request body object
   */
  private Call getUsersCountCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetUsersCountResponse> callback
  ) throws AlgoliaRuntimeException {
    Object bodyObj = null;

    // create path and map variables
    String requestPath = "/2/users/count";

    List<Pair> queryParams = new ArrayList<Pair>();
    Map<String, String> headers = new HashMap<String, String>();

    if (index != null) {
      queryParams.addAll(this.parameterToPair("index", index));
    }

    if (startDate != null) {
      queryParams.addAll(this.parameterToPair("startDate", startDate));
    }

    if (endDate != null) {
      queryParams.addAll(this.parameterToPair("endDate", endDate));
    }

    if (tags != null) {
      queryParams.addAll(this.parameterToPair("tags", tags));
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

  private Call getUsersCountValidateBeforeCall(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetUsersCountResponse> callback
  ) throws AlgoliaRuntimeException {
    // verify the required parameter 'index' is set
    if (index == null) {
      throw new AlgoliaRuntimeException(
        "Missing the required parameter 'index' when calling getUsersCount(Async)"
      );
    }

    return getUsersCountCall(index, startDate, endDate, tags, callback);
  }

  /**
   * Returns the distinct count of users across the given time range. The endpoint returns a value
   * for the complete given time range, as well as a value per day.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @return GetUsersCountResponse
   * @throws AlgoliaRuntimeException If fail to call the API, e.g. server error or cannot
   *     deserialize the response body
   */
  public GetUsersCountResponse getUsersCount(
    String index,
    String startDate,
    String endDate,
    String tags
  ) throws AlgoliaRuntimeException {
    Call req = getUsersCountValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      null
    );
    if (req instanceof CallEcho) {
      return new EchoResponseAnalytics.GetUsersCount(
        ((CallEcho) req).request()
      );
    }
    Call call = (Call) req;
    Type returnType = new TypeToken<GetUsersCountResponse>() {}.getType();
    ApiResponse<GetUsersCountResponse> res = this.execute(call, returnType);
    return res.getData();
  }

  public GetUsersCountResponse getUsersCount(String index)
    throws AlgoliaRuntimeException {
    return this.getUsersCount(index, null, null, null);
  }

  /**
   * (asynchronously) Returns the distinct count of users across the given time range. The endpoint
   * returns a value for the complete given time range, as well as a value per day.
   *
   * @param index The index name to target. (required)
   * @param startDate The lower bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param endDate The upper bound timestamp (a date, a string like \"2006-01-02\") of the period
   *     to analyze. (optional)
   * @param tags Filter metrics on the provided tags. Each tag must correspond to an analyticsTags
   *     set at search time. Multiple tags can be combined with the operators OR and AND. If a tag
   *     contains characters like spaces or parentheses, it should be URL encoded. (optional)
   * @param callback The callback to be executed when the API call finishes
   * @return The request call
   * @throws AlgoliaRuntimeException If fail to process the API call, e.g. serializing the request
   *     body object
   */
  public Call getUsersCountAsync(
    String index,
    String startDate,
    String endDate,
    String tags,
    final ApiCallback<GetUsersCountResponse> callback
  ) throws AlgoliaRuntimeException {
    Call call = getUsersCountValidateBeforeCall(
      index,
      startDate,
      endDate,
      tags,
      callback
    );
    Type returnType = new TypeToken<GetUsersCountResponse>() {}.getType();
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
      return new EchoResponseAnalytics.Post(((CallEcho) req).request());
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
      return new EchoResponseAnalytics.Put(((CallEcho) req).request());
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
