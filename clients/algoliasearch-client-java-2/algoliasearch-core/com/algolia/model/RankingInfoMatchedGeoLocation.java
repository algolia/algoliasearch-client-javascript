package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** RankingInfoMatchedGeoLocation */
public class RankingInfoMatchedGeoLocation {

  @SerializedName("lat")
  private Double lat;

  @SerializedName("lng")
  private Double lng;

  @SerializedName("distance")
  private Integer distance;

  public RankingInfoMatchedGeoLocation lat(Double lat) {
    this.lat = lat;
    return this;
  }

  /**
   * Latitude of the matched location.
   *
   * @return lat
   */
  @javax.annotation.Nullable
  public Double getLat() {
    return lat;
  }

  public void setLat(Double lat) {
    this.lat = lat;
  }

  public RankingInfoMatchedGeoLocation lng(Double lng) {
    this.lng = lng;
    return this;
  }

  /**
   * Longitude of the matched location.
   *
   * @return lng
   */
  @javax.annotation.Nullable
  public Double getLng() {
    return lng;
  }

  public void setLng(Double lng) {
    this.lng = lng;
  }

  public RankingInfoMatchedGeoLocation distance(Integer distance) {
    this.distance = distance;
    return this;
  }

  /**
   * Distance between the matched location and the search location (in meters).
   *
   * @return distance
   */
  @javax.annotation.Nullable
  public Integer getDistance() {
    return distance;
  }

  public void setDistance(Integer distance) {
    this.distance = distance;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RankingInfoMatchedGeoLocation rankingInfoMatchedGeoLocation = (RankingInfoMatchedGeoLocation) o;
    return (
      Objects.equals(this.lat, rankingInfoMatchedGeoLocation.lat) &&
      Objects.equals(this.lng, rankingInfoMatchedGeoLocation.lng) &&
      Objects.equals(this.distance, rankingInfoMatchedGeoLocation.distance)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(lat, lng, distance);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RankingInfoMatchedGeoLocation {\n");
    sb.append("    lat: ").append(toIndentedString(lat)).append("\n");
    sb.append("    lng: ").append(toIndentedString(lng)).append("\n");
    sb.append("    distance: ").append(toIndentedString(distance)).append("\n");
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
