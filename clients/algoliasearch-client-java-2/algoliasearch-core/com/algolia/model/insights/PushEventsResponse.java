package com.algolia.model.insights;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** PushEventsResponse */
public class PushEventsResponse {

  @SerializedName("message")
  private String message;

  public PushEventsResponse setMessage(String message) {
    this.message = message;
    return this;
  }

  /**
   * A message confirming the event push.
   *
   * @return message
   */
  @javax.annotation.Nonnull
  public String getMessage() {
    return message;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    PushEventsResponse pushEventsResponse = (PushEventsResponse) o;
    return Objects.equals(this.message, pushEventsResponse.message);
  }

  @Override
  public int hashCode() {
    return Objects.hash(message);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class PushEventsResponse {\n");
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
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
