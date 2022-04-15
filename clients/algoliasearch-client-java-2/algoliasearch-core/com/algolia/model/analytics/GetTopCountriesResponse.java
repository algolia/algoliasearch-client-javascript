package com.algolia.model.analytics;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetTopCountriesResponse */
public class GetTopCountriesResponse {

  @SerializedName("countries")
  private List<GetTopCountriesResponseCountries> countries = new ArrayList<>();

  public GetTopCountriesResponse setCountries(
    List<GetTopCountriesResponseCountries> countries
  ) {
    this.countries = countries;
    return this;
  }

  public GetTopCountriesResponse addCountriesItem(
    GetTopCountriesResponseCountries countriesItem
  ) {
    this.countries.add(countriesItem);
    return this;
  }

  /**
   * A list of countries with their count.
   *
   * @return countries
   */
  @javax.annotation.Nonnull
  public List<GetTopCountriesResponseCountries> getCountries() {
    return countries;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetTopCountriesResponse getTopCountriesResponse = (GetTopCountriesResponse) o;
    return Objects.equals(this.countries, getTopCountriesResponse.countries);
  }

  @Override
  public int hashCode() {
    return Objects.hash(countries);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetTopCountriesResponse {\n");
    sb
      .append("    countries: ")
      .append(toIndentedString(countries))
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
