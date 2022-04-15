package com.algolia.model.abtesting;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** Variant */
public class Variant {

  @SerializedName("averageClickPosition")
  private Integer averageClickPosition;

  @SerializedName("clickCount")
  private Integer clickCount;

  @SerializedName("clickThroughRate")
  private Double clickThroughRate;

  @SerializedName("conversionCount")
  private Integer conversionCount;

  @SerializedName("conversionRate")
  private Double conversionRate;

  @SerializedName("description")
  private String description;

  @SerializedName("index")
  private String index;

  @SerializedName("noResultCount")
  private Integer noResultCount;

  @SerializedName("searchCount")
  private Integer searchCount;

  @SerializedName("trackedSearchCount")
  private Integer trackedSearchCount;

  @SerializedName("trafficPercentage")
  private Integer trafficPercentage;

  @SerializedName("userCount")
  private Integer userCount;

  public Variant setAverageClickPosition(Integer averageClickPosition) {
    this.averageClickPosition = averageClickPosition;
    return this;
  }

  /**
   * Average click position for the variant.
   *
   * @return averageClickPosition
   */
  @javax.annotation.Nonnull
  public Integer getAverageClickPosition() {
    return averageClickPosition;
  }

  public Variant setClickCount(Integer clickCount) {
    this.clickCount = clickCount;
    return this;
  }

  /**
   * Distinct click count for the variant.
   *
   * @return clickCount
   */
  @javax.annotation.Nonnull
  public Integer getClickCount() {
    return clickCount;
  }

  public Variant setClickThroughRate(Double clickThroughRate) {
    this.clickThroughRate = clickThroughRate;
    return this;
  }

  /**
   * Click through rate for the variant.
   *
   * @return clickThroughRate
   */
  @javax.annotation.Nonnull
  public Double getClickThroughRate() {
    return clickThroughRate;
  }

  public Variant setConversionCount(Integer conversionCount) {
    this.conversionCount = conversionCount;
    return this;
  }

  /**
   * Distinct conversion count for the variant.
   *
   * @return conversionCount
   */
  @javax.annotation.Nonnull
  public Integer getConversionCount() {
    return conversionCount;
  }

  public Variant setConversionRate(Double conversionRate) {
    this.conversionRate = conversionRate;
    return this;
  }

  /**
   * Conversion rate for the variant.
   *
   * @return conversionRate
   */
  @javax.annotation.Nonnull
  public Double getConversionRate() {
    return conversionRate;
  }

  public Variant setDescription(String description) {
    this.description = description;
    return this;
  }

  /**
   * The A/B test description.
   *
   * @return description
   */
  @javax.annotation.Nonnull
  public String getDescription() {
    return description;
  }

  public Variant setIndex(String index) {
    this.index = index;
    return this;
  }

  /**
   * The index performing the A/B test.
   *
   * @return index
   */
  @javax.annotation.Nonnull
  public String getIndex() {
    return index;
  }

  public Variant setNoResultCount(Integer noResultCount) {
    this.noResultCount = noResultCount;
    return this;
  }

  /**
   * The number of occurrences.
   *
   * @return noResultCount
   */
  @javax.annotation.Nonnull
  public Integer getNoResultCount() {
    return noResultCount;
  }

  public Variant setSearchCount(Integer searchCount) {
    this.searchCount = searchCount;
    return this;
  }

  /**
   * The number of search during the A/B test.
   *
   * @return searchCount
   */
  @javax.annotation.Nonnull
  public Integer getSearchCount() {
    return searchCount;
  }

  public Variant setTrackedSearchCount(Integer trackedSearchCount) {
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

  public Variant setTrafficPercentage(Integer trafficPercentage) {
    this.trafficPercentage = trafficPercentage;
    return this;
  }

  /**
   * The traffic perfecentage for the A/B test.
   *
   * @return trafficPercentage
   */
  @javax.annotation.Nonnull
  public Integer getTrafficPercentage() {
    return trafficPercentage;
  }

  public Variant setUserCount(Integer userCount) {
    this.userCount = userCount;
    return this;
  }

  /**
   * The number of user during the A/B test.
   *
   * @return userCount
   */
  @javax.annotation.Nonnull
  public Integer getUserCount() {
    return userCount;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Variant variant = (Variant) o;
    return (
      Objects.equals(this.averageClickPosition, variant.averageClickPosition) &&
      Objects.equals(this.clickCount, variant.clickCount) &&
      Objects.equals(this.clickThroughRate, variant.clickThroughRate) &&
      Objects.equals(this.conversionCount, variant.conversionCount) &&
      Objects.equals(this.conversionRate, variant.conversionRate) &&
      Objects.equals(this.description, variant.description) &&
      Objects.equals(this.index, variant.index) &&
      Objects.equals(this.noResultCount, variant.noResultCount) &&
      Objects.equals(this.searchCount, variant.searchCount) &&
      Objects.equals(this.trackedSearchCount, variant.trackedSearchCount) &&
      Objects.equals(this.trafficPercentage, variant.trafficPercentage) &&
      Objects.equals(this.userCount, variant.userCount)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      averageClickPosition,
      clickCount,
      clickThroughRate,
      conversionCount,
      conversionRate,
      description,
      index,
      noResultCount,
      searchCount,
      trackedSearchCount,
      trafficPercentage,
      userCount
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Variant {\n");
    sb
      .append("    averageClickPosition: ")
      .append(toIndentedString(averageClickPosition))
      .append("\n");
    sb
      .append("    clickCount: ")
      .append(toIndentedString(clickCount))
      .append("\n");
    sb
      .append("    clickThroughRate: ")
      .append(toIndentedString(clickThroughRate))
      .append("\n");
    sb
      .append("    conversionCount: ")
      .append(toIndentedString(conversionCount))
      .append("\n");
    sb
      .append("    conversionRate: ")
      .append(toIndentedString(conversionRate))
      .append("\n");
    sb
      .append("    description: ")
      .append(toIndentedString(description))
      .append("\n");
    sb.append("    index: ").append(toIndentedString(index)).append("\n");
    sb
      .append("    noResultCount: ")
      .append(toIndentedString(noResultCount))
      .append("\n");
    sb
      .append("    searchCount: ")
      .append(toIndentedString(searchCount))
      .append("\n");
    sb
      .append("    trackedSearchCount: ")
      .append(toIndentedString(trackedSearchCount))
      .append("\n");
    sb
      .append("    trafficPercentage: ")
      .append(toIndentedString(trafficPercentage))
      .append("\n");
    sb
      .append("    userCount: ")
      .append(toIndentedString(userCount))
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
