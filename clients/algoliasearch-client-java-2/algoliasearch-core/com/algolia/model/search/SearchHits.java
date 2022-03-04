package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** SearchHits */
public class SearchHits {

  @SerializedName("hits")
  private List<Hit> hits = null;

  public SearchHits hits(List<Hit> hits) {
    this.hits = hits;
    return this;
  }

  public SearchHits addHitsItem(Hit hitsItem) {
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
  public List<Hit> getHits() {
    return hits;
  }

  public void setHits(List<Hit> hits) {
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
