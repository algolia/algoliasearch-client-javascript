package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** TopHitsResponse */
public class TopHitsResponse {

  @SerializedName("hits")
  private List<TopHitsResponseHits> hits = new ArrayList<>();

  public TopHitsResponse setHits(List<TopHitsResponseHits> hits) {
    this.hits = hits;
    return this;
  }

  public TopHitsResponse addHitsItem(TopHitsResponseHits hitsItem) {
    this.hits.add(hitsItem);
    return this;
  }

  /**
   * A list of top hits with their count.
   *
   * @return hits
   */
  @javax.annotation.Nonnull
  public List<TopHitsResponseHits> getHits() {
    return hits;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TopHitsResponse topHitsResponse = (TopHitsResponse) o;
    return Objects.equals(this.hits, topHitsResponse.hits);
  }

  @Override
  public int hashCode() {
    return Objects.hash(hits);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TopHitsResponse {\n");
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
