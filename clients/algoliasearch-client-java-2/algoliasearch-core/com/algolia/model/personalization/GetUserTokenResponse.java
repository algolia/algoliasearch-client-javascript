package com.algolia.model.personalization;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** GetUserTokenResponse */
public class GetUserTokenResponse {

  @SerializedName("userToken")
  private String userToken;

  @SerializedName("lastEventAt")
  private String lastEventAt;

  @SerializedName("scores")
  private Object scores;

  public GetUserTokenResponse setUserToken(String userToken) {
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

  public GetUserTokenResponse setLastEventAt(String lastEventAt) {
    this.lastEventAt = lastEventAt;
    return this;
  }

  /**
   * Date of last event update. (ISO-8601 format).
   *
   * @return lastEventAt
   */
  @javax.annotation.Nonnull
  public String getLastEventAt() {
    return lastEventAt;
  }

  public GetUserTokenResponse setScores(Object scores) {
    this.scores = scores;
    return this;
  }

  /**
   * The userToken scores.
   *
   * @return scores
   */
  @javax.annotation.Nonnull
  public Object getScores() {
    return scores;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetUserTokenResponse getUserTokenResponse = (GetUserTokenResponse) o;
    return (
      Objects.equals(this.userToken, getUserTokenResponse.userToken) &&
      Objects.equals(this.lastEventAt, getUserTokenResponse.lastEventAt) &&
      Objects.equals(this.scores, getUserTokenResponse.scores)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(userToken, lastEventAt, scores);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetUserTokenResponse {\n");
    sb
      .append("    userToken: ")
      .append(toIndentedString(userToken))
      .append("\n");
    sb
      .append("    lastEventAt: ")
      .append(toIndentedString(lastEventAt))
      .append("\n");
    sb.append("    scores: ").append(toIndentedString(scores)).append("\n");
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
