package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** TopHitsResponseWithAnalyticsHits */
public class TopHitsResponseWithAnalyticsHits {

  @SerializedName("hit")
  private String hit;

  @SerializedName("count")
  private Integer count;

  @SerializedName("clickThroughRate")
  private Double clickThroughRate;

  @SerializedName("conversionRate")
  private Double conversionRate;

  @SerializedName("trackedSearchCount")
  private Integer trackedSearchCount;

  @SerializedName("clickCount")
  private Integer clickCount;

  @SerializedName("conversionCount")
  private Integer conversionCount;

  public TopHitsResponseWithAnalyticsHits setHit(String hit) {
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

  public TopHitsResponseWithAnalyticsHits setCount(Integer count) {
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

  public TopHitsResponseWithAnalyticsHits setClickThroughRate(
    Double clickThroughRate
  ) {
    this.clickThroughRate = clickThroughRate;
    return this;
  }

  /**
   * The click-through rate.
   *
   * @return clickThroughRate
   */
  @javax.annotation.Nonnull
  public Double getClickThroughRate() {
    return clickThroughRate;
  }

  public TopHitsResponseWithAnalyticsHits setConversionRate(
    Double conversionRate
  ) {
    this.conversionRate = conversionRate;
    return this;
  }

  /**
   * The conversion rate.
   *
   * @return conversionRate
   */
  @javax.annotation.Nonnull
  public Double getConversionRate() {
    return conversionRate;
  }

  public TopHitsResponseWithAnalyticsHits setTrackedSearchCount(
    Integer trackedSearchCount
  ) {
    this.trackedSearchCount = trackedSearchCount;
    return this;
  }

  /**
   * The number of tracked search click.
   *
   * @return trackedSearchCount
   */
  @javax.annotation.Nonnull
  public Integer getTrackedSearchCount() {
    return trackedSearchCount;
  }

  public TopHitsResponseWithAnalyticsHits setClickCount(Integer clickCount) {
    this.clickCount = clickCount;
    return this;
  }

  /**
   * The number of click event.
   *
   * @return clickCount
   */
  @javax.annotation.Nonnull
  public Integer getClickCount() {
    return clickCount;
  }

  public TopHitsResponseWithAnalyticsHits setConversionCount(
    Integer conversionCount
  ) {
    this.conversionCount = conversionCount;
    return this;
  }

  /**
   * The number of converted clicks.
   *
   * @return conversionCount
   */
  @javax.annotation.Nonnull
  public Integer getConversionCount() {
    return conversionCount;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TopHitsResponseWithAnalyticsHits topHitsResponseWithAnalyticsHits = (TopHitsResponseWithAnalyticsHits) o;
    return (
      Objects.equals(this.hit, topHitsResponseWithAnalyticsHits.hit) &&
      Objects.equals(this.count, topHitsResponseWithAnalyticsHits.count) &&
      Objects.equals(
        this.clickThroughRate,
        topHitsResponseWithAnalyticsHits.clickThroughRate
      ) &&
      Objects.equals(
        this.conversionRate,
        topHitsResponseWithAnalyticsHits.conversionRate
      ) &&
      Objects.equals(
        this.trackedSearchCount,
        topHitsResponseWithAnalyticsHits.trackedSearchCount
      ) &&
      Objects.equals(
        this.clickCount,
        topHitsResponseWithAnalyticsHits.clickCount
      ) &&
      Objects.equals(
        this.conversionCount,
        topHitsResponseWithAnalyticsHits.conversionCount
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      hit,
      count,
      clickThroughRate,
      conversionRate,
      trackedSearchCount,
      clickCount,
      conversionCount
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TopHitsResponseWithAnalyticsHits {\n");
    sb.append("    hit: ").append(toIndentedString(hit)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb
      .append("    clickThroughRate: ")
      .append(toIndentedString(clickThroughRate))
      .append("\n");
    sb
      .append("    conversionRate: ")
      .append(toIndentedString(conversionRate))
      .append("\n");
    sb
      .append("    trackedSearchCount: ")
      .append(toIndentedString(trackedSearchCount))
      .append("\n");
    sb
      .append("    clickCount: ")
      .append(toIndentedString(clickCount))
      .append("\n");
    sb
      .append("    conversionCount: ")
      .append(toIndentedString(conversionCount))
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
