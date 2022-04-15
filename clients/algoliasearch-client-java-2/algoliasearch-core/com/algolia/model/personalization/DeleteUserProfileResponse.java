package com.algolia.model.personalization;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** DeleteUserProfileResponse */
public class DeleteUserProfileResponse {

  @SerializedName("userToken")
  private String userToken;

  @SerializedName("deletedUntil")
  private String deletedUntil;

  public DeleteUserProfileResponse setUserToken(String userToken) {
    this.userToken = userToken;
    return this;
  }

  /**
   * userToken representing the user for which to fetch the Personalization profile.
   *
   * @return userToken
   */
  @javax.annotation.Nonnull
  public String getUserToken() {
    return userToken;
  }

  public DeleteUserProfileResponse setDeletedUntil(String deletedUntil) {
    this.deletedUntil = deletedUntil;
    return this;
  }

  /**
   * A date until which the data can safely be considered as deleted for the given user. Any data
   * received after the deletedUntil date will start building a new user profile.
   *
   * @return deletedUntil
   */
  @javax.annotation.Nonnull
  public String getDeletedUntil() {
    return deletedUntil;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DeleteUserProfileResponse deleteUserProfileResponse = (DeleteUserProfileResponse) o;
    return (
      Objects.equals(this.userToken, deleteUserProfileResponse.userToken) &&
      Objects.equals(this.deletedUntil, deleteUserProfileResponse.deletedUntil)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(userToken, deletedUntil);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class DeleteUserProfileResponse {\n");
    sb
      .append("    userToken: ")
      .append(toIndentedString(userToken))
      .append("\n");
    sb
      .append("    deletedUntil: ")
      .append(toIndentedString(deletedUntil))
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
