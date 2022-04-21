package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetTopCountriesResponseCountries */
public class GetTopCountriesResponseCountries {

  @SerializedName("country")
  private String country;

  @SerializedName("count")
  private Integer count;

  public GetTopCountriesResponseCountries setCountry(String country) {
    this.country = country;
    return this;
  }

  /**
   * The country.
   *
   * @return country
   */
  @javax.annotation.Nonnull
  public String getCountry() {
    return country;
  }

  public GetTopCountriesResponseCountries setCount(Integer count) {
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
    GetTopCountriesResponseCountries getTopCountriesResponseCountries = (GetTopCountriesResponseCountries) o;
    return (
      Objects.equals(this.country, getTopCountriesResponseCountries.country) &&
      Objects.equals(this.count, getTopCountriesResponseCountries.count)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(country, count);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetTopCountriesResponseCountries {\n");
    sb.append("    country: ").append(toIndentedString(country)).append("\n");
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
