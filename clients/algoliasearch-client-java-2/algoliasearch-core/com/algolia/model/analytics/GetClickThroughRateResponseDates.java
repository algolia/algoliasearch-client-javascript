package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetClickThroughRateResponseDates */
public class GetClickThroughRateResponseDates {

  @SerializedName("rate")
  private Double rate;

  @SerializedName("clickCount")
  private Integer clickCount;

  @SerializedName("trackedSearchCount")
  private Integer trackedSearchCount;

  @SerializedName("date")
  private String date;

  public GetClickThroughRateResponseDates setRate(Double rate) {
    this.rate = rate;
    return this;
  }

  /**
   * The click-through rate.
   *
   * @return rate
   */
  @javax.annotation.Nonnull
  public Double getRate() {
    return rate;
  }

  public GetClickThroughRateResponseDates setClickCount(Integer clickCount) {
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

  public GetClickThroughRateResponseDates setTrackedSearchCount(
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

  public GetClickThroughRateResponseDates setDate(String date) {
    this.date = date;
    return this;
  }

  /**
   * Date of the event.
   *
   * @return date
   */
  @javax.annotation.Nonnull
  public String getDate() {
    return date;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetClickThroughRateResponseDates getClickThroughRateResponseDates = (GetClickThroughRateResponseDates) o;
    return (
      Objects.equals(this.rate, getClickThroughRateResponseDates.rate) &&
      Objects.equals(
        this.clickCount,
        getClickThroughRateResponseDates.clickCount
      ) &&
      Objects.equals(
        this.trackedSearchCount,
        getClickThroughRateResponseDates.trackedSearchCount
      ) &&
      Objects.equals(this.date, getClickThroughRateResponseDates.date)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(rate, clickCount, trackedSearchCount, date);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetClickThroughRateResponseDates {\n");
    sb.append("    rate: ").append(toIndentedString(rate)).append("\n");
    sb
      .append("    clickCount: ")
      .append(toIndentedString(clickCount))
      .append("\n");
    sb
      .append("    trackedSearchCount: ")
      .append(toIndentedString(trackedSearchCount))
      .append("\n");
    sb.append("    date: ").append(toIndentedString(date)).append("\n");
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
