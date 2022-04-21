package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetLogsResponseLogs */
public class GetLogsResponseLogs {

  @SerializedName("timestamp")
  private String timestamp;

  @SerializedName("method")
  private String method;

  @SerializedName("answer_code")
  private String answerCode;

  @SerializedName("query_body")
  private String queryBody;

  @SerializedName("answer")
  private String answer;

  @SerializedName("url")
  private String url;

  @SerializedName("ip")
  private String ip;

  @SerializedName("query_headers")
  private String queryHeaders;

  @SerializedName("sha1")
  private String sha1;

  @SerializedName("nb_api_calls")
  private String nbApiCalls;

  @SerializedName("processing_time_ms")
  private String processingTimeMs;

  @SerializedName("index")
  private String index;

  @SerializedName("query_params")
  private String queryParams;

  @SerializedName("query_nb_hits")
  private String queryNbHits;

  @SerializedName("inner_queries")
  private List<GetLogsResponseInnerQueries> innerQueries = null;

  public GetLogsResponseLogs setTimestamp(String timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Timestamp in ISO-8601 format.
   *
   * @return timestamp
   */
  @javax.annotation.Nonnull
  public String getTimestamp() {
    return timestamp;
  }

  public GetLogsResponseLogs setMethod(String method) {
    this.method = method;
    return this;
  }

  /**
   * HTTP method of the perfomed request.
   *
   * @return method
   */
  @javax.annotation.Nonnull
  public String getMethod() {
    return method;
  }

  public GetLogsResponseLogs setAnswerCode(String answerCode) {
    this.answerCode = answerCode;
    return this;
  }

  /**
   * HTTP response code.
   *
   * @return answerCode
   */
  @javax.annotation.Nonnull
  public String getAnswerCode() {
    return answerCode;
  }

  public GetLogsResponseLogs setQueryBody(String queryBody) {
    this.queryBody = queryBody;
    return this;
  }

  /**
   * Request body. Truncated after 1000 characters.
   *
   * @return queryBody
   */
  @javax.annotation.Nonnull
  public String getQueryBody() {
    return queryBody;
  }

  public GetLogsResponseLogs setAnswer(String answer) {
    this.answer = answer;
    return this;
  }

  /**
   * Answer body. Truncated after 1000 characters.
   *
   * @return answer
   */
  @javax.annotation.Nonnull
  public String getAnswer() {
    return answer;
  }

  public GetLogsResponseLogs setUrl(String url) {
    this.url = url;
    return this;
  }

  /**
   * Request URL.
   *
   * @return url
   */
  @javax.annotation.Nonnull
  public String getUrl() {
    return url;
  }

  public GetLogsResponseLogs setIp(String ip) {
    this.ip = ip;
    return this;
  }

  /**
   * IP of the client which perfomed the request.
   *
   * @return ip
   */
  @javax.annotation.Nonnull
  public String getIp() {
    return ip;
  }

  public GetLogsResponseLogs setQueryHeaders(String queryHeaders) {
    this.queryHeaders = queryHeaders;
    return this;
  }

  /**
   * Request Headers (API Key is obfuscated).
   *
   * @return queryHeaders
   */
  @javax.annotation.Nonnull
  public String getQueryHeaders() {
    return queryHeaders;
  }

  public GetLogsResponseLogs setSha1(String sha1) {
    this.sha1 = sha1;
    return this;
  }

  /**
   * SHA1 signature of the log entry.
   *
   * @return sha1
   */
  @javax.annotation.Nonnull
  public String getSha1() {
    return sha1;
  }

  public GetLogsResponseLogs setNbApiCalls(String nbApiCalls) {
    this.nbApiCalls = nbApiCalls;
    return this;
  }

  /**
   * Number of API calls.
   *
   * @return nbApiCalls
   */
  @javax.annotation.Nonnull
  public String getNbApiCalls() {
    return nbApiCalls;
  }

  public GetLogsResponseLogs setProcessingTimeMs(String processingTimeMs) {
    this.processingTimeMs = processingTimeMs;
    return this;
  }

  /**
   * Processing time for the query. It doesn't include network time.
   *
   * @return processingTimeMs
   */
  @javax.annotation.Nonnull
  public String getProcessingTimeMs() {
    return processingTimeMs;
  }

  public GetLogsResponseLogs setIndex(String index) {
    this.index = index;
    return this;
  }

  /**
   * Index targeted by the query.
   *
   * @return index
   */
  @javax.annotation.Nullable
  public String getIndex() {
    return index;
  }

  public GetLogsResponseLogs setQueryParams(String queryParams) {
    this.queryParams = queryParams;
    return this;
  }

  /**
   * Query parameters sent with the request.
   *
   * @return queryParams
   */
  @javax.annotation.Nullable
  public String getQueryParams() {
    return queryParams;
  }

  public GetLogsResponseLogs setQueryNbHits(String queryNbHits) {
    this.queryNbHits = queryNbHits;
    return this;
  }

  /**
   * Number of hits returned for the query.
   *
   * @return queryNbHits
   */
  @javax.annotation.Nullable
  public String getQueryNbHits() {
    return queryNbHits;
  }

  public GetLogsResponseLogs setInnerQueries(
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
  public List<GetLogsResponseInnerQueries> getInnerQueries() {
    return innerQueries;
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
