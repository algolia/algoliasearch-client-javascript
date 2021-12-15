package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.Objects;

/** GetLogsResponseInnerQueries */
public class GetLogsResponseInnerQueries {

  public static final String SERIALIZED_NAME_INDEX_NAME = "index_name";

  @SerializedName(SERIALIZED_NAME_INDEX_NAME)
  private String indexName;

  public static final String SERIALIZED_NAME_USER_TOKEN = "user_token";

  @SerializedName(SERIALIZED_NAME_USER_TOKEN)
  private String userToken;

  public static final String SERIALIZED_NAME_QUERY_ID = "query_id";

  @SerializedName(SERIALIZED_NAME_QUERY_ID)
  private String queryId;

  public GetLogsResponseInnerQueries indexName(String indexName) {
    this.indexName = indexName;
    return this;
  }

  /**
   * Index targeted by the query.
   *
   * @return indexName
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Index targeted by the query.")
  public String getIndexName() {
    return indexName;
  }

  public void setIndexName(String indexName) {
    this.indexName = indexName;
  }

  public GetLogsResponseInnerQueries userToken(String userToken) {
    this.userToken = userToken;
    return this;
  }

  /**
   * User identifier.
   *
   * @return userToken
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "User identifier.")
  public String getUserToken() {
    return userToken;
  }

  public void setUserToken(String userToken) {
    this.userToken = userToken;
  }

  public GetLogsResponseInnerQueries queryId(String queryId) {
    this.queryId = queryId;
    return this;
  }

  /**
   * QueryID for the given query.
   *
   * @return queryId
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "QueryID for the given query.")
  public String getQueryId() {
    return queryId;
  }

  public void setQueryId(String queryId) {
    this.queryId = queryId;
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
