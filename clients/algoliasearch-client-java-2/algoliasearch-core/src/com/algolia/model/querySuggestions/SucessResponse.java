package com.algolia.model.querySuggestions;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** SucessResponse */
public class SucessResponse {

  @SerializedName("status")
  private Integer status;

  @SerializedName("message")
  private String message;

  public SucessResponse setStatus(Integer status) {
    this.status = status;
    return this;
  }

  /**
   * The status code.
   *
   * @return status
   */
  @javax.annotation.Nonnull
  public Integer getStatus() {
    return status;
  }

  public SucessResponse setMessage(String message) {
    this.message = message;
    return this;
  }

  /**
   * Message of the response.
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
    SucessResponse sucessResponse = (SucessResponse) o;
    return (
      Objects.equals(this.status, sucessResponse.status) &&
      Objects.equals(this.message, sucessResponse.message)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(status, message);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SucessResponse {\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
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
