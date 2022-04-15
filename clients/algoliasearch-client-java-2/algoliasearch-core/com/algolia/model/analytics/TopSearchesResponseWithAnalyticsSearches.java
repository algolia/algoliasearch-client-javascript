package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** TopSearchesResponseWithAnalyticsSearches */
public class TopSearchesResponseWithAnalyticsSearches {

  @SerializedName("search")
  private String search;

  @SerializedName("count")
  private Integer count;

  @SerializedName("clickThroughRate")
  private Double clickThroughRate;

  @SerializedName("averageClickPosition")
  private Integer averageClickPosition;

  @SerializedName("conversionRate")
  private Double conversionRate;

  @SerializedName("trackedSearchCount")
  private Integer trackedSearchCount;

  @SerializedName("clickCount")
  private Integer clickCount;

  @SerializedName("conversionCount")
  private Integer conversionCount;

  @SerializedName("nbHits")
  private Integer nbHits;

  public TopSearchesResponseWithAnalyticsSearches setSearch(String search) {
    this.search = search;
    return this;
  }

  /**
   * The search query.
   *
   * @return search
   */
  @javax.annotation.Nonnull
  public String getSearch() {
    return search;
  }

  public TopSearchesResponseWithAnalyticsSearches setCount(Integer count) {
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

  public TopSearchesResponseWithAnalyticsSearches setClickThroughRate(
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

  public TopSearchesResponseWithAnalyticsSearches setAverageClickPosition(
    Integer averageClickPosition
  ) {
    this.averageClickPosition = averageClickPosition;
    return this;
  }

  /**
   * The average position of all the click count event.
   *
   * @return averageClickPosition
   */
  @javax.annotation.Nonnull
  public Integer getAverageClickPosition() {
    return averageClickPosition;
  }

  public TopSearchesResponseWithAnalyticsSearches setConversionRate(
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

  public TopSearchesResponseWithAnalyticsSearches setTrackedSearchCount(
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

  public TopSearchesResponseWithAnalyticsSearches setClickCount(
    Integer clickCount
  ) {
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

  public TopSearchesResponseWithAnalyticsSearches setConversionCount(
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

  public TopSearchesResponseWithAnalyticsSearches setNbHits(Integer nbHits) {
    this.nbHits = nbHits;
    return this;
  }

  /**
   * Number of hits that the search query matched.
   *
   * @return nbHits
   */
  @javax.annotation.Nonnull
  public Integer getNbHits() {
    return nbHits;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TopSearchesResponseWithAnalyticsSearches topSearchesResponseWithAnalyticsSearches = (TopSearchesResponseWithAnalyticsSearches) o;
    return (
      Objects.equals(
        this.search,
        topSearchesResponseWithAnalyticsSearches.search
      ) &&
      Objects.equals(
        this.count,
        topSearchesResponseWithAnalyticsSearches.count
      ) &&
      Objects.equals(
        this.clickThroughRate,
        topSearchesResponseWithAnalyticsSearches.clickThroughRate
      ) &&
      Objects.equals(
        this.averageClickPosition,
        topSearchesResponseWithAnalyticsSearches.averageClickPosition
      ) &&
      Objects.equals(
        this.conversionRate,
        topSearchesResponseWithAnalyticsSearches.conversionRate
      ) &&
      Objects.equals(
        this.trackedSearchCount,
        topSearchesResponseWithAnalyticsSearches.trackedSearchCount
      ) &&
      Objects.equals(
        this.clickCount,
        topSearchesResponseWithAnalyticsSearches.clickCount
      ) &&
      Objects.equals(
        this.conversionCount,
        topSearchesResponseWithAnalyticsSearches.conversionCount
      ) &&
      Objects.equals(
        this.nbHits,
        topSearchesResponseWithAnalyticsSearches.nbHits
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      search,
      count,
      clickThroughRate,
      averageClickPosition,
      conversionRate,
      trackedSearchCount,
      clickCount,
      conversionCount,
      nbHits
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TopSearchesResponseWithAnalyticsSearches {\n");
    sb.append("    search: ").append(toIndentedString(search)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb
      .append("    clickThroughRate: ")
      .append(toIndentedString(clickThroughRate))
      .append("\n");
    sb
      .append("    averageClickPosition: ")
      .append(toIndentedString(averageClickPosition))
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
    sb.append("    nbHits: ").append(toIndentedString(nbHits)).append("\n");
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
