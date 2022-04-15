package com.algolia.model.recommend;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** RecommendHits */
public class RecommendHits {

  @SerializedName("hits")
  private List<RecommendHit> hits = null;

  public RecommendHits setHits(List<RecommendHit> hits) {
    this.hits = hits;
    return this;
  }

  public RecommendHits addHitsItem(RecommendHit hitsItem) {
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
  public List<RecommendHit> getHits() {
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
    RecommendHits recommendHits = (RecommendHits) o;
    return Objects.equals(this.hits, recommendHits.hits);
  }

  @Override
  public int hashCode() {
    return Objects.hash(hits);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RecommendHits {\n");
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
