package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** SearchUserIdsResponseHighlightResult */
public class SearchUserIdsResponseHighlightResult {

  @SerializedName("userID")
  private HighlightResult userID;

  @SerializedName("clusterName")
  private HighlightResult clusterName;

  public SearchUserIdsResponseHighlightResult userID(HighlightResult userID) {
    this.userID = userID;
    return this;
  }

  /**
   * Get userID
   *
   * @return userID
   */
  @javax.annotation.Nonnull
  public HighlightResult getUserID() {
    return userID;
  }

  public void setUserID(HighlightResult userID) {
    this.userID = userID;
  }

  public SearchUserIdsResponseHighlightResult clusterName(
    HighlightResult clusterName
  ) {
    this.clusterName = clusterName;
    return this;
  }

  /**
   * Get clusterName
   *
   * @return clusterName
   */
  @javax.annotation.Nonnull
  public HighlightResult getClusterName() {
    return clusterName;
  }

  public void setClusterName(HighlightResult clusterName) {
    this.clusterName = clusterName;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchUserIdsResponseHighlightResult searchUserIdsResponseHighlightResult = (SearchUserIdsResponseHighlightResult) o;
    return (
      Objects.equals(
        this.userID,
        searchUserIdsResponseHighlightResult.userID
      ) &&
      Objects.equals(
        this.clusterName,
        searchUserIdsResponseHighlightResult.clusterName
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(userID, clusterName);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchUserIdsResponseHighlightResult {\n");
    sb.append("    userID: ").append(toIndentedString(userID)).append("\n");
    sb
      .append("    clusterName: ")
      .append(toIndentedString(clusterName))
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
