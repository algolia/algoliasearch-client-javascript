package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetNoClickRateResponseDates */
public class GetNoClickRateResponseDates {

  @SerializedName("rate")
  private Double rate;

  @SerializedName("count")
  private Integer count;

  @SerializedName("noClickCount")
  private Integer noClickCount;

  @SerializedName("date")
  private String date;

  public GetNoClickRateResponseDates setRate(Double rate) {
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

  public GetNoClickRateResponseDates setCount(Integer count) {
    this.count = count;
    return this;
  }

  /**
   * The number of click event.
   *
   * @return count
   */
  @javax.annotation.Nonnull
  public Integer getCount() {
    return count;
  }

  public GetNoClickRateResponseDates setNoClickCount(Integer noClickCount) {
    this.noClickCount = noClickCount;
    return this;
  }

  /**
   * The number of click event.
   *
   * @return noClickCount
   */
  @javax.annotation.Nonnull
  public Integer getNoClickCount() {
    return noClickCount;
  }

  public GetNoClickRateResponseDates setDate(String date) {
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
    GetNoClickRateResponseDates getNoClickRateResponseDates = (GetNoClickRateResponseDates) o;
    return (
      Objects.equals(this.rate, getNoClickRateResponseDates.rate) &&
      Objects.equals(this.count, getNoClickRateResponseDates.count) &&
      Objects.equals(
        this.noClickCount,
        getNoClickRateResponseDates.noClickCount
      ) &&
      Objects.equals(this.date, getNoClickRateResponseDates.date)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(rate, count, noClickCount, date);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetNoClickRateResponseDates {\n");
    sb.append("    rate: ").append(toIndentedString(rate)).append("\n");
    sb.append("    count: ").append(toIndentedString(count)).append("\n");
    sb
      .append("    noClickCount: ")
      .append(toIndentedString(noClickCount))
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
