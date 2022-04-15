package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** TopHitsResponseHits */
public class TopHitsResponseHits {

  @SerializedName("hit")
  private String hit;

  @SerializedName("count")
  private Integer count;

  public TopHitsResponseHits setHit(String hit) {
    this.hit = hit;
    return this;
  }

  /**
   * The hit.
   *
   * @return hit
   */
  @javax.annotation.Nonnull
  public String getHit() {
    return hit;
  }

  public TopHitsResponseHits setCount(Integer count) {
    this.count = count;
    return this;
  }

  /**
   * The number of occurrences.
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
    TopHitsResponseHits topHitsResponseHits = (TopHitsResponseHits) o;
    return (
      Objects.equals(this.hit, topHitsResponseHits.hit) &&
      Objects.equals(this.count, topHitsResponseHits.count)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(hit, count);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TopHitsResponseHits {\n");
    sb.append("    hit: ").append(toIndentedString(hit)).append("\n");
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
