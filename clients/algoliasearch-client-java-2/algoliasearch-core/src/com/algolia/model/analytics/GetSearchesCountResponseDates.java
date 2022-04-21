package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetSearchesCountResponseDates */
public class GetSearchesCountResponseDates {

  @SerializedName("date")
  private String date;

  @SerializedName("count")
  private Integer count;

  public GetSearchesCountResponseDates setDate(String date) {
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

  public GetSearchesCountResponseDates setCount(Integer count) {
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
    GetSearchesCountResponseDates getSearchesCountResponseDates = (GetSearchesCountResponseDates) o;
    return (
      Objects.equals(this.date, getSearchesCountResponseDates.date) &&
      Objects.equals(this.count, getSearchesCountResponseDates.count)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(date, count);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetSearchesCountResponseDates {\n");
    sb.append("    date: ").append(toIndentedString(date)).append("\n");
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
