package com.algolia.model.querySuggestions;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** Status */
public class Status {

  @SerializedName("indexName")
  private String indexName;

  @SerializedName("isRunning")
  private Boolean isRunning;

  @SerializedName("lastBuiltAt")
  private String lastBuiltAt;

  public Status setIndexName(String indexName) {
    this.indexName = indexName;
    return this;
  }

  /**
   * The targeted index name.
   *
   * @return indexName
   */
  @javax.annotation.Nonnull
  public String getIndexName() {
    return indexName;
  }

  public Status setIsRunning(Boolean isRunning) {
    this.isRunning = isRunning;
    return this;
  }

  /**
   * true if the Query Suggestions index is running.
   *
   * @return isRunning
   */
  @javax.annotation.Nonnull
  public Boolean getIsRunning() {
    return isRunning;
  }

  public Status setLastBuiltAt(String lastBuiltAt) {
    this.lastBuiltAt = lastBuiltAt;
    return this;
  }

  /**
   * Date and time of the last build.
   *
   * @return lastBuiltAt
   */
  @javax.annotation.Nonnull
  public String getLastBuiltAt() {
    return lastBuiltAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Status status = (Status) o;
    return (
      Objects.equals(this.indexName, status.indexName) &&
      Objects.equals(this.isRunning, status.isRunning) &&
      Objects.equals(this.lastBuiltAt, status.lastBuiltAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(indexName, isRunning, lastBuiltAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Status {\n");
    sb
      .append("    indexName: ")
      .append(toIndentedString(indexName))
      .append("\n");
    sb
      .append("    isRunning: ")
      .append(toIndentedString(isRunning))
      .append("\n");
    sb
      .append("    lastBuiltAt: ")
      .append(toIndentedString(lastBuiltAt))
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
