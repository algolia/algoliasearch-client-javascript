package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetLogsResponseInnerQueries */
public class GetLogsResponseInnerQueries {

  @SerializedName("index_name")
  private String indexName;

  @SerializedName("user_token")
  private String userToken;

  @SerializedName("query_id")
  private String queryId;

  public GetLogsResponseInnerQueries setIndexName(String indexName) {
    this.indexName = indexName;
    return this;
  }

  /**
   * Index targeted by the query.
   *
   * @return indexName
   */
  @javax.annotation.Nullable
  public String getIndexName() {
    return indexName;
  }

  public GetLogsResponseInnerQueries setUserToken(String userToken) {
    this.userToken = userToken;
    return this;
  }

  /**
   * User identifier.
   *
   * @return userToken
   */
  @javax.annotation.Nullable
  public String getUserToken() {
    return userToken;
  }

  public GetLogsResponseInnerQueries setQueryId(String queryId) {
    this.queryId = queryId;
    return this;
  }

  /**
   * QueryID for the given query.
   *
   * @return queryId
   */
  @javax.annotation.Nullable
  public String getQueryId() {
    return queryId;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetLogsResponseInnerQueries getLogsResponseInnerQueries = (GetLogsResponseInnerQueries) o;
    return (
      Objects.equals(this.indexName, getLogsResponseInnerQueries.indexName) &&
      Objects.equals(this.userToken, getLogsResponseInnerQueries.userToken) &&
      Objects.equals(this.queryId, getLogsResponseInnerQueries.queryId)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(indexName, userToken, queryId);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetLogsResponseInnerQueries {\n");
    sb
      .append("    indexName: ")
      .append(toIndentedString(indexName))
      .append("\n");
    sb
      .append("    userToken: ")
      .append(toIndentedString(userToken))
      .append("\n");
    sb.append("    queryId: ").append(toIndentedString(queryId)).append("\n");
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
