package com.algolia.model.querySuggestions;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** SourceIndexExternal */
public class SourceIndexExternal {

  @SerializedName("query")
  private String query;

  @SerializedName("count")
  private Integer count;

  public SourceIndexExternal setQuery(String query) {
    this.query = query;
    return this;
  }

  /**
   * The suggestion you would like to add.
   *
   * @return query
   */
  @javax.annotation.Nonnull
  public String getQuery() {
    return query;
  }

  public SourceIndexExternal setCount(Integer count) {
    this.count = count;
    return this;
  }

  /**
   * The measure of the suggestion relative popularity.
   *
   * @return count
   */
  @javax.annotation.Nonnull
  public Integer getCount() {
    return count;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SourceIndexExternal sourceIndexExternal = (SourceIndexExternal) o;
    return (
      Objects.equals(this.query, sourceIndexExternal.query) &&
      Objects.equals(this.count, sourceIndexExternal.count)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(query, count);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SourceIndexExternal {\n");
    sb.append("    query: ").append(toIndentedString(query)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
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
