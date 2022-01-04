package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** SearchForFacetValuesResponseFacetHits */
public class SearchForFacetValuesResponseFacetHits {

  @SerializedName("value")
  private String value;

  @SerializedName("highlighted")
  private String highlighted;

  @SerializedName("count")
  private Integer count;

  public SearchForFacetValuesResponseFacetHits value(String value) {
    this.value = value;
    return this;
  }

  /**
   * Raw value of the facet.
   *
   * @return value
   */
  @javax.annotation.Nonnull
  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public SearchForFacetValuesResponseFacetHits highlighted(String highlighted) {
    this.highlighted = highlighted;
    return this;
  }

  /**
   * Markup text with occurrences highlighted.
   *
   * @return highlighted
   */
  @javax.annotation.Nonnull
  public String getHighlighted() {
    return highlighted;
  }

  public void setHighlighted(String highlighted) {
    this.highlighted = highlighted;
  }

  public SearchForFacetValuesResponseFacetHits count(Integer count) {
    this.count = count;
    return this;
  }

  /**
   * How many objects contain this facet value. This takes into account the extra search parameters
   * specified in the query. Like for a regular search query, the counts may not be exhaustive.
   *
   * @return count
   */
  @javax.annotation.Nonnull
  public Integer getCount() {
    return count;
  }

  public void setCount(Integer count) {
    this.count = count;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchForFacetValuesResponseFacetHits searchForFacetValuesResponseFacetHits = (SearchForFacetValuesResponseFacetHits) o;
    return (
      Objects.equals(this.value, searchForFacetValuesResponseFacetHits.value) &&
      Objects.equals(
        this.highlighted,
        searchForFacetValuesResponseFacetHits.highlighted
      ) &&
      Objects.equals(this.count, searchForFacetValuesResponseFacetHits.count)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(value, highlighted, count);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchForFacetValuesResponseFacetHits {\n");
    sb.append("    value: ").append(toIndentedString(value)).append("\n");
    sb
      .append("    highlighted: ")
      .append(toIndentedString(highlighted))
      .append("\n");
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
