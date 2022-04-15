package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetNoResultsRateResponseDates */
public class GetNoResultsRateResponseDates {

  @SerializedName("date")
  private String date;

  @SerializedName("noResultCount")
  private Integer noResultCount;

  @SerializedName("count")
  private Integer count;

  @SerializedName("rate")
  private Double rate;

  public GetNoResultsRateResponseDates setDate(String date) {
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

  public GetNoResultsRateResponseDates setNoResultCount(Integer noResultCount) {
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

  public GetNoResultsRateResponseDates setCount(Integer count) {
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

  public GetNoResultsRateResponseDates setRate(Double rate) {
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetNoResultsRateResponseDates getNoResultsRateResponseDates = (GetNoResultsRateResponseDates) o;
    return (
      Objects.equals(this.date, getNoResultsRateResponseDates.date) &&
      Objects.equals(
        this.noResultCount,
        getNoResultsRateResponseDates.noResultCount
      ) &&
      Objects.equals(this.count, getNoResultsRateResponseDates.count) &&
      Objects.equals(this.rate, getNoResultsRateResponseDates.rate)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(date, noResultCount, count, rate);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetNoResultsRateResponseDates {\n");
    sb.append("    date: ").append(toIndentedString(date)).append("\n");
    sb
      .append("    noResultCount: ")
      .append(toIndentedString(noResultCount))
      .append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb.append("    rate: ").append(toIndentedString(rate)).append("\n");
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
