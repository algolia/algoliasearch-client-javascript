package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetLogsResponseLogs */
public class GetLogsResponseLogs {

  public static final String SERIALIZED_NAME_TIMESTAMP = "timestamp";

  @SerializedName(SERIALIZED_NAME_TIMESTAMP)
  private String timestamp;

  public static final String SERIALIZED_NAME_METHOD = "method";

  @SerializedName(SERIALIZED_NAME_METHOD)
  private String method;

  public static final String SERIALIZED_NAME_ANSWER_CODE = "answer_code";

  @SerializedName(SERIALIZED_NAME_ANSWER_CODE)
  private String answerCode;

  public static final String SERIALIZED_NAME_QUERY_BODY = "query_body";

  @SerializedName(SERIALIZED_NAME_QUERY_BODY)
  private String queryBody;

  public static final String SERIALIZED_NAME_ANSWER = "answer";

  @SerializedName(SERIALIZED_NAME_ANSWER)
  private String answer;

  public static final String SERIALIZED_NAME_URL = "url";

  @SerializedName(SERIALIZED_NAME_URL)
  private String url;

  public static final String SERIALIZED_NAME_IP = "ip";

  @SerializedName(SERIALIZED_NAME_IP)
  private String ip;

  public static final String SERIALIZED_NAME_QUERY_HEADERS = "query_headers";

  @SerializedName(SERIALIZED_NAME_QUERY_HEADERS)
  private String queryHeaders;

  public static final String SERIALIZED_NAME_SHA1 = "sha1";

  @SerializedName(SERIALIZED_NAME_SHA1)
  private String sha1;

  public static final String SERIALIZED_NAME_NB_API_CALLS = "nb_api_calls";

  @SerializedName(SERIALIZED_NAME_NB_API_CALLS)
  private String nbApiCalls;

  public static final String SERIALIZED_NAME_PROCESSING_TIME_MS =
    "processing_time_ms";

  @SerializedName(SERIALIZED_NAME_PROCESSING_TIME_MS)
  private String processingTimeMs;

  public static final String SERIALIZED_NAME_INDEX = "index";

  @SerializedName(SERIALIZED_NAME_INDEX)
  private String index;

  public static final String SERIALIZED_NAME_QUERY_PARAMS = "query_params";

  @SerializedName(SERIALIZED_NAME_QUERY_PARAMS)
  private String queryParams;

  public static final String SERIALIZED_NAME_QUERY_NB_HITS = "query_nb_hits";

  @SerializedName(SERIALIZED_NAME_QUERY_NB_HITS)
  private String queryNbHits;

  public static final String SERIALIZED_NAME_INNER_QUERIES = "inner_queries";

  @SerializedName(SERIALIZED_NAME_INNER_QUERIES)
  private List<GetLogsResponseInnerQueries> innerQueries = null;

  public GetLogsResponseLogs timestamp(String timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Timestamp in ISO-8601 format.
   *
   * @return timestamp
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "Timestamp in ISO-8601 format.")
  public String getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(String timestamp) {
    this.timestamp = timestamp;
  }

  public GetLogsResponseLogs method(String method) {
    this.method = method;
    return this;
  }

  /**
   * HTTP method of the perfomed request.
   *
   * @return method
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "HTTP method of the perfomed request."
  )
  public String getMethod() {
    return method;
  }

  public void setMethod(String method) {
    this.method = method;
  }

  public GetLogsResponseLogs answerCode(String answerCode) {
    this.answerCode = answerCode;
    return this;
  }

  /**
   * HTTP response code.
   *
   * @return answerCode
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "HTTP response code.")
  public String getAnswerCode() {
    return answerCode;
  }

  public void setAnswerCode(String answerCode) {
    this.answerCode = answerCode;
  }

  public GetLogsResponseLogs queryBody(String queryBody) {
    this.queryBody = queryBody;
    return this;
  }

  /**
   * Request body. Truncated after 1000 characters.
   *
   * @return queryBody
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Request body. Truncated after 1000 characters."
  )
  public String getQueryBody() {
    return queryBody;
  }

  public void setQueryBody(String queryBody) {
    this.queryBody = queryBody;
  }

  public GetLogsResponseLogs answer(String answer) {
    this.answer = answer;
    return this;
  }

  /**
   * Answer body. Truncated after 1000 characters.
   *
   * @return answer
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Answer body. Truncated after 1000 characters."
  )
  public String getAnswer() {
    return answer;
  }

  public void setAnswer(String answer) {
    this.answer = answer;
  }

  public GetLogsResponseLogs url(String url) {
    this.url = url;
    return this;
  }

  /**
   * Request URL.
   *
   * @return url
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "Request URL.")
  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public GetLogsResponseLogs ip(String ip) {
    this.ip = ip;
    return this;
  }

  /**
   * IP of the client which perfomed the request.
   *
   * @return ip
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "IP of the client which perfomed the request."
  )
  public String getIp() {
    return ip;
  }

  public void setIp(String ip) {
    this.ip = ip;
  }

  public GetLogsResponseLogs queryHeaders(String queryHeaders) {
    this.queryHeaders = queryHeaders;
    return this;
  }

  /**
   * Request Headers (API Key is obfuscated).
   *
   * @return queryHeaders
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Request Headers (API Key is obfuscated)."
  )
  public String getQueryHeaders() {
    return queryHeaders;
  }

  public void setQueryHeaders(String queryHeaders) {
    this.queryHeaders = queryHeaders;
  }

  public GetLogsResponseLogs sha1(String sha1) {
    this.sha1 = sha1;
    return this;
  }

  /**
   * SHA1 signature of the log entry.
   *
   * @return sha1
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "SHA1 signature of the log entry.")
  public String getSha1() {
    return sha1;
  }

  public void setSha1(String sha1) {
    this.sha1 = sha1;
  }

  public GetLogsResponseLogs nbApiCalls(String nbApiCalls) {
    this.nbApiCalls = nbApiCalls;
    return this;
  }

  /**
   * Number of API calls.
   *
   * @return nbApiCalls
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "Number of API calls.")
  public String getNbApiCalls() {
    return nbApiCalls;
  }

  public void setNbApiCalls(String nbApiCalls) {
    this.nbApiCalls = nbApiCalls;
  }

  public GetLogsResponseLogs processingTimeMs(String processingTimeMs) {
    this.processingTimeMs = processingTimeMs;
    return this;
  }

  /**
   * Processing time for the query. It doesn't include network time.
   *
   * @return processingTimeMs
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Processing time for the query. It doesn't include network time."
  )
  public String getProcessingTimeMs() {
    return processingTimeMs;
  }

  public void setProcessingTimeMs(String processingTimeMs) {
    this.processingTimeMs = processingTimeMs;
  }

  public GetLogsResponseLogs index(String index) {
    this.index = index;
    return this;
  }

  /**
   * Index targeted by the query.
   *
   * @return index
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Index targeted by the query.")
  public String getIndex() {
    return index;
  }

  public void setIndex(String index) {
    this.index = index;
  }

  public GetLogsResponseLogs queryParams(String queryParams) {
    this.queryParams = queryParams;
    return this;
  }

  /**
   * Query parameters sent with the request.
   *
   * @return queryParams
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Query parameters sent with the request.")
  public String getQueryParams() {
    return queryParams;
  }

  public void setQueryParams(String queryParams) {
    this.queryParams = queryParams;
  }

  public GetLogsResponseLogs queryNbHits(String queryNbHits) {
    this.queryNbHits = queryNbHits;
    return this;
  }

  /**
   * Number of hits returned for the query.
   *
   * @return queryNbHits
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Number of hits returned for the query.")
  public String getQueryNbHits() {
    return queryNbHits;
  }

  public void setQueryNbHits(String queryNbHits) {
    this.queryNbHits = queryNbHits;
  }

  public GetLogsResponseLogs innerQueries(
    List<GetLogsResponseInnerQueries> innerQueries
  ) {
    this.innerQueries = innerQueries;
    return this;
  }

  public GetLogsResponseLogs addInnerQueriesItem(
    GetLogsResponseInnerQueries innerQueriesItem
  ) {
    if (this.innerQueries == null) {
      this.innerQueries = new ArrayList<>();
    }
    this.innerQueries.add(innerQueriesItem);
    return this;
  }

  /**
   * Array of all performed queries for the given request.
   *
   * @return innerQueries
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Array of all performed queries for the given request."
  )
  public List<GetLogsResponseInnerQueries> getInnerQueries() {
    return innerQueries;
  }

  public void setInnerQueries(List<GetLogsResponseInnerQueries> innerQueries) {
    this.innerQueries = innerQueries;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetLogsResponseLogs getLogsResponseLogs = (GetLogsResponseLogs) o;
    return (
      Objects.equals(this.timestamp, getLogsResponseLogs.timestamp) &&
      Objects.equals(this.method, getLogsResponseLogs.method) &&
      Objects.equals(this.answerCode, getLogsResponseLogs.answerCode) &&
      Objects.equals(this.queryBody, getLogsResponseLogs.queryBody) &&
      Objects.equals(this.answer, getLogsResponseLogs.answer) &&
      Objects.equals(this.url, getLogsResponseLogs.url) &&
      Objects.equals(this.ip, getLogsResponseLogs.ip) &&
      Objects.equals(this.queryHeaders, getLogsResponseLogs.queryHeaders) &&
      Objects.equals(this.sha1, getLogsResponseLogs.sha1) &&
      Objects.equals(this.nbApiCalls, getLogsResponseLogs.nbApiCalls) &&
      Objects.equals(
        this.processingTimeMs,
        getLogsResponseLogs.processingTimeMs
      ) &&
      Objects.equals(this.index, getLogsResponseLogs.index) &&
      Objects.equals(this.queryParams, getLogsResponseLogs.queryParams) &&
      Objects.equals(this.queryNbHits, getLogsResponseLogs.queryNbHits) &&
      Objects.equals(this.innerQueries, getLogsResponseLogs.innerQueries)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      timestamp,
      method,
      answerCode,
      queryBody,
      answer,
      url,
      ip,
      queryHeaders,
      sha1,
      nbApiCalls,
      processingTimeMs,
      index,
      queryParams,
      queryNbHits,
      innerQueries
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetLogsResponseLogs {\n");
    sb
      .append("    timestamp: ")
      .append(toIndentedString(timestamp))
      .append("\n");
    sb.append("    method: ").append(toIndentedString(method)).append("\n");
    sb
      .append("    answerCode: ")
      .append(toIndentedString(answerCode))
      .append("\n");
    sb
      .append("    queryBody: ")
      .append(toIndentedString(queryBody))
      .append("\n");
    sb.append("    answer: ").append(toIndentedString(answer)).append("\n");
    sb.append("    url: ").append(toIndentedString(url)).append("\n");
    sb.append("    ip: ").append(toIndentedString(ip)).append("\n");
    sb
      .append("    queryHeaders: ")
      .append(toIndentedString(queryHeaders))
      .append("\n");
    sb.append("    sha1: ").append(toIndentedString(sha1)).append("\n");
    sb
      .append("    nbApiCalls: ")
      .append(toIndentedString(nbApiCalls))
      .append("\n");
    sb
      .append("    processingTimeMs: ")
      .append(toIndentedString(processingTimeMs))
      .append("\n");
    sb.append("    index: ").append(toIndentedString(index)).append("\n");
    sb
      .append("    queryParams: ")
      .append(toIndentedString(queryParams))
      .append("\n");
    sb
      .append("    queryNbHits: ")
      .append(toIndentedString(queryNbHits))
      .append("\n");
    sb
      .append("    innerQueries: ")
      .append(toIndentedString(innerQueries))
      .append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
