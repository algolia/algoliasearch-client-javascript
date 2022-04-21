package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetNoResultsRateResponse */
public class GetNoResultsRateResponse {

  @SerializedName("rate")
  private Double rate;

  @SerializedName("count")
  private Integer count;

  @SerializedName("noResultCount")
  private Integer noResultCount;

  @SerializedName("dates")
  private List<GetNoResultsRateResponseDates> dates = new ArrayList<>();

  public GetNoResultsRateResponse setRate(Double rate) {
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

  public GetNoResultsRateResponse setCount(Integer count) {
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

  public GetNoResultsRateResponse setNoResultCount(Integer noResultCount) {
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

  public GetNoResultsRateResponse setDates(
    List<GetNoResultsRateResponseDates> dates
  ) {
    this.dates = dates;
    return this;
  }

  public GetNoResultsRateResponse addDatesItem(
    GetNoResultsRateResponseDates datesItem
  ) {
    this.dates.add(datesItem);
    return this;
  }

  /**
   * A list of searches without results with their date, rate and counts.
   *
   * @return dates
   */
  @javax.annotation.Nonnull
  public List<GetNoResultsRateResponseDates> getDates() {
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
    GetNoResultsRateResponse getNoResultsRateResponse = (GetNoResultsRateResponse) o;
    return (
      Objects.equals(this.rate, getNoResultsRateResponse.rate) &&
      Objects.equals(this.count, getNoResultsRateResponse.count) &&
      Objects.equals(
        this.noResultCount,
        getNoResultsRateResponse.noResultCount
      ) &&
      Objects.equals(this.dates, getNoResultsRateResponse.dates)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(rate, count, noResultCount, dates);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetNoResultsRateResponse {\n");
    sb.append("    rate: ").append(toIndentedString(rate)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb
      .append("    noResultCount: ")
      .append(toIndentedString(noResultCount))
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
