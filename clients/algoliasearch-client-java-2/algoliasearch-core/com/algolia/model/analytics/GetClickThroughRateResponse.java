package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetClickThroughRateResponse */
public class GetClickThroughRateResponse {

  @SerializedName("rate")
  private Double rate;

  @SerializedName("clickCount")
  private Integer clickCount;

  @SerializedName("trackedSearchCount")
  private Integer trackedSearchCount;

  @SerializedName("dates")
  private List<GetClickThroughRateResponseDates> dates = new ArrayList<>();

  public GetClickThroughRateResponse setRate(Double rate) {
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

  public GetClickThroughRateResponse setClickCount(Integer clickCount) {
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

  public GetClickThroughRateResponse setTrackedSearchCount(
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

  public GetClickThroughRateResponse setDates(
    List<GetClickThroughRateResponseDates> dates
  ) {
    this.dates = dates;
    return this;
  }

  public GetClickThroughRateResponse addDatesItem(
    GetClickThroughRateResponseDates datesItem
  ) {
    this.dates.add(datesItem);
    return this;
  }

  /**
   * A list of click-through rate events with their date.
   *
   * @return dates
   */
  @javax.annotation.Nonnull
  public List<GetClickThroughRateResponseDates> getDates() {
    return dates;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetClickThroughRateResponse getClickThroughRateResponse = (GetClickThroughRateResponse) o;
    return (
      Objects.equals(this.rate, getClickThroughRateResponse.rate) &&
      Objects.equals(this.clickCount, getClickThroughRateResponse.clickCount) &&
      Objects.equals(
        this.trackedSearchCount,
        getClickThroughRateResponse.trackedSearchCount
      ) &&
      Objects.equals(this.dates, getClickThroughRateResponse.dates)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(rate, clickCount, trackedSearchCount, dates);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetClickThroughRateResponse {\n");
    sb.append("    rate: ").append(toIndentedString(rate)).append("\n");
    sb
      .append("    clickCount: ")
      .append(toIndentedString(clickCount))
      .append("\n");
    sb
      .append("    trackedSearchCount: ")
      .append(toIndentedString(trackedSearchCount))
      .append("\n");
    sb.append("    dates: ").append(toIndentedString(dates)).append("\n");
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
