package com.algolia.model.querySuggestions;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** IndexName */
public class IndexName {

  @SerializedName("indexName")
  private String indexName;

  public IndexName setIndexName(String indexName) {
    this.indexName = indexName;
    return this;
  }

  /**
   * Index name to target.
   *
   * @return indexName
   */
  @javax.annotation.Nonnull
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
    IndexName indexName = (IndexName) o;
    return Objects.equals(this.indexName, indexName.indexName);
  }

  @Override
  public int hashCode() {
    return Objects.hash(indexName);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class IndexName {\n");
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
