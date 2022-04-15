package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetAverageClickPositionResponse */
public class GetAverageClickPositionResponse {

  @SerializedName("average")
  private Double average;

  @SerializedName("clickCount")
  private Integer clickCount;

  @SerializedName("dates")
  private List<GetAverageClickPositionResponseDates> dates = new ArrayList<>();

  public GetAverageClickPositionResponse setAverage(Double average) {
    this.average = average;
    return this;
  }

  /**
   * The average of all the click count event.
   *
   * @return average
   */
  @javax.annotation.Nonnull
  public Double getAverage() {
    return average;
  }

  public GetAverageClickPositionResponse setClickCount(Integer clickCount) {
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

  public GetAverageClickPositionResponse setDates(
    List<GetAverageClickPositionResponseDates> dates
  ) {
    this.dates = dates;
    return this;
  }

  public GetAverageClickPositionResponse addDatesItem(
    GetAverageClickPositionResponseDates datesItem
  ) {
    this.dates.add(datesItem);
    return this;
  }

  /**
   * A list of average click position with their date.
   *
   * @return dates
   */
  @javax.annotation.Nonnull
  public List<GetAverageClickPositionResponseDates> getDates() {
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
    GetAverageClickPositionResponse getAverageClickPositionResponse = (GetAverageClickPositionResponse) o;
    return (
      Objects.equals(this.average, getAverageClickPositionResponse.average) &&
      Objects.equals(
        this.clickCount,
        getAverageClickPositionResponse.clickCount
      ) &&
      Objects.equals(this.dates, getAverageClickPositionResponse.dates)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(average, clickCount, dates);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetAverageClickPositionResponse {\n");
    sb.append("    average: ").append(toIndentedString(average)).append("\n");
    sb
      .append("    clickCount: ")
      .append(toIndentedString(clickCount))
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
