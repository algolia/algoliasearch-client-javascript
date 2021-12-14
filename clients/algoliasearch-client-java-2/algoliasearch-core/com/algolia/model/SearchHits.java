package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** SearchHits */
public class SearchHits {

  public static final String SERIALIZED_NAME_HITS = "hits";

  @SerializedName(SERIALIZED_NAME_HITS)
  private List<Record> hits = null;

  public SearchHits hits(List<Record> hits) {
    this.hits = hits;
    return this;
  }

  public SearchHits addHitsItem(Record hitsItem) {
    if (this.hits == null) {
      this.hits = new ArrayList<>();
    }
    this.hits.add(hitsItem);
    return this;
  }

  /**
   * Get hits
   *
   * @return hits
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "")
  public List<Record> getHits() {
    return hits;
  }

  public void setHits(List<Record> hits) {
    this.hits = hits;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchHits searchHits = (SearchHits) o;
    return Objects.equals(this.hits, searchHits.hits);
  }

  @Override
  public int hashCode() {
    return Objects.hash(hits);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchHits {\n");
    sb.append("    hits: ").append(toIndentedString(hits)).append("\n");
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
