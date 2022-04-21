package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** MultipleBatchOperation */
public class MultipleBatchOperation {

  @SerializedName("action")
  private Action action;

  @SerializedName("body")
  private Object body;

  @SerializedName("indexName")
  private String indexName;

  public MultipleBatchOperation setAction(Action action) {
    this.action = action;
    return this;
  }

  /**
   * Get action
   *
   * @return action
   */
  @javax.annotation.Nullable
  public Action getAction() {
    return action;
  }

  public MultipleBatchOperation setBody(Object body) {
    this.body = body;
    return this;
  }

  /**
   * arguments to the operation (depends on the type of the operation).
   *
   * @return body
   */
  @javax.annotation.Nullable
  public Object getBody() {
    return body;
  }

  public MultipleBatchOperation setIndexName(String indexName) {
    this.indexName = indexName;
    return this;
  }

  /**
   * Index to target for this operation.
   *
   * @return indexName
   */
  @javax.annotation.Nullable
  public String getIndexName() {
    return indexName;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MultipleBatchOperation multipleBatchOperation = (MultipleBatchOperation) o;
    return (
      Objects.equals(this.action, multipleBatchOperation.action) &&
      Objects.equals(this.body, multipleBatchOperation.body) &&
      Objects.equals(this.indexName, multipleBatchOperation.indexName)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(action, body, indexName);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MultipleBatchOperation {\n");
    sb.append("    action: ").append(toIndentedString(action)).append("\n");
    sb.append("    body: ").append(toIndentedString(body)).append("\n");
    sb
      .append("    indexName: ")
      .append(toIndentedString(indexName))
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
