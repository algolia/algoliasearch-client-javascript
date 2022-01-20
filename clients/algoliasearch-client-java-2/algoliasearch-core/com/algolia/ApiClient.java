package com.algolia;

import com.algolia.utils.Requester;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.*;
import java.util.Map.Entry;
import okhttp3.*;
import okhttp3.internal.http.HttpMethod;

public class ApiClient {

  private boolean debugging = false;
  private Map<String, String> defaultHeaderMap = new HashMap<String, String>();

  private String basePath;
  private String appId, apiKey;

  private DateFormat dateFormat;

  private JSON json;

  private Requester requester;

  /*
   * Constructor for ApiClient with custom Requester
   */
  public ApiClient(String appId, String apiKey, Requester requester) {
    json = new JSON();
    setUserAgent("OpenAPI-Generator/0.1.0/java");

    this.basePath = "https://" + appId + "-1.algolianet.com";
    this.appId = appId;
    this.apiKey = apiKey;
    this.requester = requester;
  }

  /**
   * Get JSON
   *
   * @return JSON object
   */
  public JSON getJSON() {
    return json;
  }

  /**
   * Set JSON
   *
   * @param json JSON object
   * @return Api client
   */
  public ApiClient setJSON(JSON json) {
    this.json = json;
    return this;
  }

  public DateFormat getDateFormat() {
    return dateFormat;
  }

  public ApiClient setDateFormat(DateFormat dateFormat) {
    this.json.setDateFormat(dateFormat);
    return this;
  }

  public ApiClient setLenientOnJson(boolean lenientOnJson) {
    this.json.setLenientOnJson(lenientOnJson);
    return this;
  }

  /**
   * Set the User-Agent header's value (by adding to the default header map).
   *
   * @param userAgent HTTP request's user agent
   * @return ApiClient
   */
  public ApiClient setUserAgent(String userAgent) {
    addDefaultHeader("User-Agent", userAgent);
    return this;
  }

  /**
   * Add a default header.
   *
   * @param key The header's key
   * @param value The header's value
   * @return ApiClient
   */
  public ApiClient addDefaultHeader(String key, String value) {
    defaultHeaderMap.put(key, value);
    return this;
  }

  /**
   * Check that whether debugging is enabled for this API client.
   *
   * @return True if debugging is enabled, false otherwise.
   */
  public boolean isDebugging() {
    return debugging;
  }

  /**
   * Enable/disable debugging for this API client.
   *
   * @param debugging To enable (true) or disable (false) debugging
   * @return ApiClient
   */
  public ApiClient setDebugging(boolean debugging) {
    requester.setDebugging(debugging);
    return this;
  }

  /**
   * Get connection timeout (in milliseconds).
   *
   * @return Timeout in milliseconds
   */
  public int getConnectTimeout() {
    return requester.getConnectTimeout();
  }

  /**
   * Sets the connect timeout (in milliseconds). A value of 0 means no timeout, otherwise values
   * must be between 1 and {@link Integer#MAX_VALUE}.
   *
   * @param connectionTimeout connection timeout in milliseconds
   * @return Api client
   */
  public ApiClient setConnectTimeout(int connectionTimeout) {
    requester.setConnectTimeout(connectionTimeout);
    return this;
  }

  /**
   * Get read timeout (in milliseconds).
   *
   * @return Timeout in milliseconds
   */
  public int getReadTimeout() {
    return requester.getReadTimeout();
  }

  /**
   * Sets the read timeout (in milliseconds). A value of 0 means no timeout, otherwise values must
   * be between 1 and {@link Integer#MAX_VALUE}.
   *
   * @param readTimeout read timeout in milliseconds
   * @return Api client
   */
  public ApiClient setReadTimeout(int readTimeout) {
    requester.setReadTimeout(readTimeout);
    return this;
  }

  /**
   * Get write timeout (in milliseconds).
   *
   * @return Timeout in milliseconds
   */
  public int getWriteTimeout() {
    return requester.getWriteTimeout();
  }

  /**
   * Sets the write timeout (in milliseconds). A value of 0 means no timeout, otherwise values must
   * be between 1 and {@link Integer#MAX_VALUE}.
   *
   * @param writeTimeout connection timeout in milliseconds
   * @return Api client
   */
  public ApiClient setWriteTimeout(int writeTimeout) {
    requester.setWriteTimeout(writeTimeout);
    return this;
  }

  /**
   * Format the given parameter object into string.
   *
   * @param param Parameter
   * @return String representation of the parameter
   */
  public String parameterToString(Object param) {
    if (param == null) {
      return "";
    } else if (
      param instanceof Date ||
      param instanceof OffsetDateTime ||
      param instanceof LocalDate
    ) {
      // Serialize to json string and remove the " enclosing characters
      String jsonStr = json.serialize(param);
      return jsonStr.substring(1, jsonStr.length() - 1);
    } else if (param instanceof Collection) {
      StringBuilder b = new StringBuilder();
      for (Object o : (Collection) param) {
        if (b.length() > 0) {
          b.append(",");
        }
        b.append(String.valueOf(o));
      }
      return b.toString();
    } else {
      return String.valueOf(param);
    }
  }

  /**
   * Formats the specified query parameter to a list containing a single {@code Pair} object.
   *
   * <p>Note that {@code value} must not be a collection.
   *
   * @param name The name of the parameter.
   * @param value The value of the parameter.
   * @return A list containing a single {@code Pair} object.
   */
  public List<Pair> parameterToPair(String name, Object value) {
    List<Pair> params = new ArrayList<Pair>();

    // preconditions
    if (
      name == null ||
      name.isEmpty() ||
      value == null ||
      value instanceof Collection
    ) {
      return params;
    }

    params.add(new Pair(name, parameterToString(value)));
    return params;
  }

  /**
   * Formats the specified collection query parameters to a list of {@code Pair} objects.
   *
   * <p>Note that the values of each of the returned Pair objects are percent-encoded.
   *
   * @param collectionFormat The collection format of the parameter.
   * @param name The name of the parameter.
   * @param value The value of the parameter.
   * @return A list of {@code Pair} objects.
   */
  public List<Pair> parameterToPairs(
    String collectionFormat,
    String name,
    Collection value
  ) {
    List<Pair> params = new ArrayList<Pair>();

    // preconditions
    if (name == null || name.isEmpty() || value == null || value.isEmpty()) {
      return params;
    }

    // create the params based on the collection format
    if ("multi".equals(collectionFormat)) {
      for (Object item : value) {
        params.add(new Pair(name, escapeString(parameterToString(item))));
      }
      return params;
    }

    // collectionFormat is assumed to be "csv" by default
    String delimiter = ",";

    // escape all delimiters except commas, which are URI reserved
    // characters
    if ("ssv".equals(collectionFormat)) {
      delimiter = escapeString(" ");
    } else if ("tsv".equals(collectionFormat)) {
      delimiter = escapeString("\t");
    } else if ("pipes".equals(collectionFormat)) {
      delimiter = escapeString("|");
    }

    StringBuilder sb = new StringBuilder();
    for (Object item : value) {
      sb.append(delimiter);
      sb.append(escapeString(parameterToString(item)));
    }

    params.add(new Pair(name, sb.substring(delimiter.length())));

    return params;
  }

  /**
   * Formats the specified collection path parameter to a string value.
   *
   * @param collectionFormat The collection format of the parameter.
   * @param value The value of the parameter.
   * @return String representation of the parameter
   */
  public String collectionPathParameterToString(
    String collectionFormat,
    Collection value
  ) {
    // create the value based on the collection format
    if ("multi".equals(collectionFormat)) {
      // not valid for path params
      return parameterToString(value);
    }

    // collectionFormat is assumed to be "csv" by default
    String delimiter = ",";

    if ("ssv".equals(collectionFormat)) {
      delimiter = " ";
    } else if ("tsv".equals(collectionFormat)) {
      delimiter = "\t";
    } else if ("pipes".equals(collectionFormat)) {
      delimiter = "|";
    }

    StringBuilder sb = new StringBuilder();
    for (Object item : value) {
      sb.append(delimiter);
      sb.append(parameterToString(item));
    }

    return sb.substring(delimiter.length());
  }

  /**
   * Check if the given MIME is a JSON MIME. JSON MIME examples: application/json application/json;
   * charset=UTF8 APPLICATION/JSON application/vnd.company+json "* / *" is also default to JSON
   *
   * @param mime MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  public boolean isJsonMime(String mime) {
    String jsonMime =
      "(?i)^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$";
    return mime != null && (mime.matches(jsonMime) || mime.equals("*/*"));
  }

  /**
   * Escape the given string to be used as URL query value.
   *
   * @param str String to be escaped
   * @return Escaped string
   */
  public String escapeString(String str) {
    try {
      return URLEncoder.encode(str, "utf8").replaceAll("\\+", "%20");
    } catch (UnsupportedEncodingException e) {
      return str;
    }
  }

  /**
   * Deserialize response body to Java object, according to the return type and the Content-Type
   * response header.
   *
   * @param <T> Type
   * @param response HTTP response
   * @param returnType The type of the Java object
   * @return The deserialized Java object
   * @throws ApiException If fail to deserialize response body, i.e. cannot read response body or
   *     the Content-Type of the response is not supported.
   */
  public <T> T deserialize(Response response, Type returnType)
    throws ApiException {
    if (response == null || returnType == null) {
      return null;
    }

    if ("byte[]".equals(returnType.toString())) {
      // Handle binary response (byte array).
      try {
        return (T) response.body().bytes();
      } catch (IOException e) {
        throw new ApiException(e);
      }
    }

    String respBody;
    try {
      if (response.body() != null) respBody =
        response.body().string(); else respBody = null;
    } catch (IOException e) {
      throw new ApiException(e);
    }

    if (respBody == null || "".equals(respBody)) {
      return null;
    }

    String contentType = response.headers().get("Content-Type");
    if (contentType == null) {
      // ensuring a default content type
      contentType = "application/json";
    }
    if (isJsonMime(contentType)) {
      return json.deserialize(respBody, returnType);
    } else if (returnType.equals(String.class)) {
      // Expecting string, return the raw response body.
      return (T) respBody;
    } else {
      throw new ApiException(
        "Content type \"" +
        contentType +
        "\" is not supported for type: " +
        returnType,
        response.code(),
        response.headers().toMultimap(),
        respBody
      );
    }
  }

  /**
   * Serialize the given Java object into request body according to the object's class and the
   * request Content-Type.
   *
   * @param obj The Java object
   * @param contentType The request Content-Type
   * @return The serialized request body
   * @throws ApiException If fail to serialize the given object
   */
  public RequestBody serialize(Object obj, String contentType)
    throws ApiException {
    if (obj instanceof byte[]) {
      // Binary (byte array) body parameter support.
      return RequestBody.create((byte[]) obj, MediaType.parse(contentType));
    } else if (isJsonMime(contentType)) {
      String content;
      if (obj != null) {
        content = json.serialize(obj);
      } else {
        content = null;
      }
      return RequestBody.create(content, MediaType.parse(contentType));
    } else {
      throw new ApiException(
        "Content type \"" + contentType + "\" is not supported"
      );
    }
  }

  /**
   * {@link #execute(Call, Type)}
   *
   * @param <T> Type
   * @param call An instance of the Call object
   * @return ApiResponse&lt;T&gt;
   * @throws ApiException If fail to execute the call
   */
  public <T> ApiResponse<T> execute(Call call) throws ApiException {
    return execute(call, null);
  }

  /**
   * Execute HTTP call and deserialize the HTTP response body into the given return type.
   *
   * @param returnType The return type used to deserialize HTTP response body
   * @param <T> The return type corresponding to (same with) returnType
   * @param call Call
   * @return ApiResponse object containing response status, headers and data, which is a Java object
   *     deserialized from response body and would be null when returnType is null.
   * @throws ApiException If fail to execute the call
   */
  public <T> ApiResponse<T> execute(Call call, Type returnType)
    throws ApiException {
    try {
      Response response = call.execute();
      T data = handleResponse(response, returnType);
      return new ApiResponse<T>(
        response.code(),
        response.headers().toMultimap(),
        data
      );
    } catch (IOException e) {
      throw new ApiException(e);
    }
  }

  /**
   * {@link #executeAsync(Call, Type, ApiCallback)}
   *
   * @param <T> Type
   * @param call An instance of the Call object
   * @param callback ApiCallback&lt;T&gt;
   */
  public <T> void executeAsync(Call call, ApiCallback<T> callback) {
    executeAsync(call, null, callback);
  }

  /**
   * Execute HTTP call asynchronously.
   *
   * @param <T> Type
   * @param call The callback to be executed when the API call finishes
   * @param returnType Return type
   * @param callback ApiCallback
   * @see #execute(Call, Type)
   */
  public <T> void executeAsync(
    Call call,
    final Type returnType,
    final ApiCallback<T> callback
  ) {
    call.enqueue(
      new Callback() {
        @Override
        public void onFailure(Call call, IOException e) {
          callback.onFailure(new ApiException(e), 0, null);
        }

        @Override
        public void onResponse(Call call, Response response)
          throws IOException {
          T result;
          try {
            result = (T) handleResponse(response, returnType);
          } catch (ApiException e) {
            callback.onFailure(
              e,
              response.code(),
              response.headers().toMultimap()
            );
            return;
          } catch (Exception e) {
            callback.onFailure(
              new ApiException(e),
              response.code(),
              response.headers().toMultimap()
            );
            return;
          }
          callback.onSuccess(
            result,
            response.code(),
            response.headers().toMultimap()
          );
        }
      }
    );
  }

  /**
   * Handle the given response, return the deserialized object when the response is successful.
   *
   * @param <T> Type
   * @param response Response
   * @param returnType Return type
   * @return Type
   * @throws ApiException If the response has an unsuccessful status code or fail to deserialize the
   *     response body
   */
  public <T> T handleResponse(Response response, Type returnType)
    throws ApiException {
    if (response.isSuccessful()) {
      if (returnType == null || response.code() == 204) {
        // returning null if the returnType is not defined,
        // or the status code is 204 (No Content)
        if (response.body() != null) {
          try {
            response.body().close();
          } catch (Exception e) {
            throw new ApiException(
              response.message(),
              e,
              response.code(),
              response.headers().toMultimap()
            );
          }
        }
        return null;
      } else {
        return deserialize(response, returnType);
      }
    } else {
      String respBody = null;
      if (response.body() != null) {
        try {
          respBody = response.body().string();
        } catch (IOException e) {
          throw new ApiException(
            response.message(),
            e,
            response.code(),
            response.headers().toMultimap()
          );
        }
      }
      throw new ApiException(
        response.message(),
        response.code(),
        response.headers().toMultimap(),
        respBody
      );
    }
  }

  /**
   * Build HTTP call with the given options.
   *
   * @param path The sub-path of the HTTP URL
   * @param method The request method, one of "GET", "HEAD", "OPTIONS", "POST", "PUT", "PATCH" and
   *     "DELETE"
   * @param queryParams The query parameters
   * @param body The request body object
   * @param headerParams The header parameters
   * @param callback Callback for upload/download progress
   * @return The HTTP call
   * @throws ApiException If fail to serialize the request body object
   */
  public Call buildCall(
    String path,
    String method,
    List<Pair> queryParams,
    Object body,
    Map<String, String> headerParams,
    ApiCallback callback
  ) throws ApiException {
    Request request = buildRequest(
      path,
      method,
      queryParams,
      body,
      headerParams,
      callback
    );

    return requester.newCall(request);
  }

  /**
   * Build an HTTP request with the given options.
   *
   * @param path The sub-path of the HTTP URL
   * @param method The request method, one of "GET", "HEAD", "OPTIONS", "POST", "PUT", "PATCH" and
   *     "DELETE"
   * @param queryParams The query parameters
   * @param body The request body object
   * @param headerParams The header parameters
   * @param callback Callback for upload/download progress
   * @return The HTTP request
   * @throws ApiException If fail to serialize the request body object
   */
  public Request buildRequest(
    String path,
    String method,
    List<Pair> queryParams,
    Object body,
    Map<String, String> headerParams,
    ApiCallback callback
  ) throws ApiException {
    headerParams.put("X-Algolia-Application-Id", this.appId);
    headerParams.put("X-Algolia-API-Key", this.apiKey);

    final String url = buildUrl(path, queryParams);
    final Request.Builder reqBuilder = new Request.Builder().url(url);
    processHeaderParams(headerParams, reqBuilder);

    String contentType = (String) headerParams.get("Content-Type");
    // ensuring a default content type
    if (contentType == null) {
      contentType = "application/json";
    }

    RequestBody reqBody;
    if (!HttpMethod.permitsRequestBody(method)) {
      reqBody = null;
    } else if (body == null) {
      if ("DELETE".equals(method)) {
        // allow calling DELETE without sending a request body
        reqBody = null;
      } else {
        // use an empty request body (for POST, PUT and PATCH)
        reqBody = RequestBody.create("", MediaType.parse(contentType));
      }
    } else {
      reqBody = serialize(body, contentType);
    }

    // Associate callback with request (if not null) so interceptor can
    // access it when creating ProgressResponseBody
    reqBuilder.tag(callback);

    Request request = null;

    if (callback != null && reqBody != null) {
      ProgressRequestBody progressRequestBody = new ProgressRequestBody(
        reqBody,
        callback
      );
      request = reqBuilder.method(method, progressRequestBody).build();
    } else {
      request = reqBuilder.method(method, reqBody).build();
    }

    return request;
  }

  /**
   * Build full URL by concatenating base path, the given sub path and query parameters.
   *
   * @param path The sub path
   * @param queryParams The query parameters
   * @return The full URL
   */
  public String buildUrl(String path, List<Pair> queryParams) {
    final StringBuilder url = new StringBuilder();
    url.append(basePath).append(path);

    if (queryParams != null && !queryParams.isEmpty()) {
      // support (constant) query string in `path`, e.g. "/posts?draft=1"
      String prefix = path.contains("?") ? "&" : "?";
      for (Pair param : queryParams) {
        if (param.getValue() != null) {
          if (prefix != null) {
            url.append(prefix);
            prefix = null;
          } else {
            url.append("&");
          }
          String value = parameterToString(param.getValue());
          url
            .append(escapeString(param.getName()))
            .append("=")
            .append(escapeString(value));
        }
      }
    }

    return url.toString();
  }

  /**
   * Set header parameters to the request builder, including default headers.
   *
   * @param headerParams Header parameters in the form of Map
   * @param reqBuilder Request.Builder
   */
  public void processHeaderParams(
    Map<String, String> headerParams,
    Request.Builder reqBuilder
  ) {
    for (Entry<String, String> param : headerParams.entrySet()) {
      reqBuilder.header(param.getKey(), parameterToString(param.getValue()));
    }
    for (Entry<String, String> header : defaultHeaderMap.entrySet()) {
      if (!headerParams.containsKey(header.getKey())) {
        reqBuilder.header(
          header.getKey(),
          parameterToString(header.getValue())
        );
      }
    }
  }

  /**
   * Build a form-encoding request body with the given form parameters.
   *
   * @param formParams Form parameters in the form of Map
   * @return RequestBody
   */
  public RequestBody buildRequestBodyFormEncoding(
    Map<String, Object> formParams
  ) {
    okhttp3.FormBody.Builder formBuilder = new okhttp3.FormBody.Builder();
    for (Entry<String, Object> param : formParams.entrySet()) {
      formBuilder.add(param.getKey(), parameterToString(param.getValue()));
    }
    return formBuilder.build();
  }
}
