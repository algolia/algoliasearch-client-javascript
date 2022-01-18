package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** SearchUserIdsResponseHits */
public class SearchUserIdsResponseHits {

  @SerializedName("userID")
  private String userID;

  @SerializedName("clusterName")
  private String clusterName;

  @SerializedName("nbRecords")
  private Integer nbRecords;

  @SerializedName("dataSize")
  private Integer dataSize;

  @SerializedName("objectID")
  private String objectID;

  @SerializedName("_highlightResult")
  private SearchUserIdsResponseHighlightResult highlightResult;

  public SearchUserIdsResponseHits userID(String userID) {
    this.userID = userID;
    return this;
  }

  /**
   * userID of the user.
   *
   * @return userID
   */
  @javax.annotation.Nonnull
  public String getUserID() {
    return userID;
  }

  public void setUserID(String userID) {
    this.userID = userID;
  }

  public SearchUserIdsResponseHits clusterName(String clusterName) {
    this.clusterName = clusterName;
    return this;
  }

  /**
   * Name of the cluster.
   *
   * @return clusterName
   */
  @javax.annotation.Nonnull
  public String getClusterName() {
    return clusterName;
  }

  public void setClusterName(String clusterName) {
    this.clusterName = clusterName;
  }

  public SearchUserIdsResponseHits nbRecords(Integer nbRecords) {
    this.nbRecords = nbRecords;
    return this;
  }

  /**
   * Number of records in the cluster.
   *
   * @return nbRecords
   */
  @javax.annotation.Nonnull
  public Integer getNbRecords() {
    return nbRecords;
  }

  public void setNbRecords(Integer nbRecords) {
    this.nbRecords = nbRecords;
  }

  public SearchUserIdsResponseHits dataSize(Integer dataSize) {
    this.dataSize = dataSize;
    return this;
  }

  /**
   * Data size taken by all the users assigned to the cluster.
   *
   * @return dataSize
   */
  @javax.annotation.Nonnull
  public Integer getDataSize() {
    return dataSize;
  }

  public void setDataSize(Integer dataSize) {
    this.dataSize = dataSize;
  }

  public SearchUserIdsResponseHits objectID(String objectID) {
    this.objectID = objectID;
    return this;
  }

  /**
   * userID of the requested user. Same as userID.
   *
   * @return objectID
   */
  @javax.annotation.Nonnull
  public String getObjectID() {
    return objectID;
  }

  public void setObjectID(String objectID) {
    this.objectID = objectID;
  }

  public SearchUserIdsResponseHits highlightResult(
    SearchUserIdsResponseHighlightResult highlightResult
  ) {
    this.highlightResult = highlightResult;
    return this;
  }

  /**
   * Get highlightResult
   *
   * @return highlightResult
   */
  @javax.annotation.Nonnull
  public SearchUserIdsResponseHighlightResult getHighlightResult() {
    return highlightResult;
  }

  public void setHighlightResult(
    SearchUserIdsResponseHighlightResult highlightResult
  ) {
    this.highlightResult = highlightResult;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchUserIdsResponseHits searchUserIdsResponseHits = (SearchUserIdsResponseHits) o;
    return (
      Objects.equals(this.userID, searchUserIdsResponseHits.userID) &&
      Objects.equals(this.clusterName, searchUserIdsResponseHits.clusterName) &&
      Objects.equals(this.nbRecords, searchUserIdsResponseHits.nbRecords) &&
      Objects.equals(this.dataSize, searchUserIdsResponseHits.dataSize) &&
      Objects.equals(this.objectID, searchUserIdsResponseHits.objectID) &&
      Objects.equals(
        this.highlightResult,
        searchUserIdsResponseHits.highlightResult
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      userID,
      clusterName,
      nbRecords,
      dataSize,
      objectID,
      highlightResult
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchUserIdsResponseHits {\n");
    sb.append("    userID: ").append(toIndentedString(userID)).append("\n");
    sb
      .append("    clusterName: ")
      .append(toIndentedString(clusterName))
      .append("\n");
    sb
      .append("    nbRecords: ")
      .append(toIndentedString(nbRecords))
      .append("\n");
    sb.append("    dataSize: ").append(toIndentedString(dataSize)).append("\n");
    sb.append("    objectID: ").append(toIndentedString(objectID)).append("\n");
    sb
      .append("    highlightResult: ")
      .append(toIndentedString(highlightResult))
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
