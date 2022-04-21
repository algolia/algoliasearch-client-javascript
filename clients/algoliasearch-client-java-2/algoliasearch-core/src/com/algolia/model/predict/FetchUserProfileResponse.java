package com.algolia.model.predict;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** FetchUserProfileResponse */
public class FetchUserProfileResponse {

  @SerializedName("user")
  private String user;

  @SerializedName("predictions")
  private Predictions predictions;

  @SerializedName("properties")
  private Properties properties;

  @SerializedName("segments")
  private Segments segments;

  public FetchUserProfileResponse setUser(String user) {
    this.user = user;
    return this;
  }

  /**
   * Get user
   *
   * @return user
   */
  @javax.annotation.Nonnull
  public String getUser() {
    return user;
  }

  public FetchUserProfileResponse setPredictions(Predictions predictions) {
    this.predictions = predictions;
    return this;
  }

  /**
   * Get predictions
   *
   * @return predictions
   */
  @javax.annotation.Nullable
  public Predictions getPredictions() {
    return predictions;
  }

  public FetchUserProfileResponse setProperties(Properties properties) {
    this.properties = properties;
    return this;
  }

  /**
   * Get properties
   *
   * @return properties
   */
  @javax.annotation.Nullable
  public Properties getProperties() {
    return properties;
  }

  public FetchUserProfileResponse setSegments(Segments segments) {
    this.segments = segments;
    return this;
  }

  /**
   * Get segments
   *
   * @return segments
   */
  @javax.annotation.Nullable
  public Segments getSegments() {
    return segments;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    FetchUserProfileResponse fetchUserProfileResponse = (FetchUserProfileResponse) o;
    return (
      Objects.equals(this.user, fetchUserProfileResponse.user) &&
      Objects.equals(this.predictions, fetchUserProfileResponse.predictions) &&
      Objects.equals(this.properties, fetchUserProfileResponse.properties) &&
      Objects.equals(this.segments, fetchUserProfileResponse.segments)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(user, predictions, properties, segments);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class FetchUserProfileResponse {\n");
    sb.append("    user: ").append(toIndentedString(user)).append("\n");
    sb
      .append("    predictions: ")
      .append(toIndentedString(predictions))
      .append("\n");
    sb
      .append("    properties: ")
      .append(toIndentedString(properties))
      .append("\n");
    sb.append("    segments: ").append(toIndentedString(segments)).append("\n");
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
