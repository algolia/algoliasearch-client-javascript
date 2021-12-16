package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.Objects;

/** SearchUserIdsResponseHits */
public class SearchUserIdsResponseHits {

  public static final String SERIALIZED_NAME_USER_I_D = "userID";

  @SerializedName(SERIALIZED_NAME_USER_I_D)
  private UserId userID;

  public static final String SERIALIZED_NAME_CLUSTER_NAME = "clusterName";

  @SerializedName(SERIALIZED_NAME_CLUSTER_NAME)
  private String clusterName;

  public static final String SERIALIZED_NAME_NB_RECORDS = "nbRecords";

  @SerializedName(SERIALIZED_NAME_NB_RECORDS)
  private Integer nbRecords;

  public static final String SERIALIZED_NAME_DATA_SIZE = "dataSize";

  @SerializedName(SERIALIZED_NAME_DATA_SIZE)
  private Integer dataSize;

  public static final String SERIALIZED_NAME_OBJECT_I_D = "objectID";

  @SerializedName(SERIALIZED_NAME_OBJECT_I_D)
  private String objectID;

  public static final String SERIALIZED_NAME_HIGHLIGHT_RESULT =
    "_highlightResult";

  @SerializedName(SERIALIZED_NAME_HIGHLIGHT_RESULT)
  private SearchUserIdsResponseHighlightResult highlightResult;

  public SearchUserIdsResponseHits userID(UserId userID) {
    this.userID = userID;
    return this;
  }

  /**
   * Get userID
   *
   * @return userID
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "")
  public UserId getUserID() {
    return userID;
  }

  public void setUserID(UserId userID) {
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
  @ApiModelProperty(
    example = "c11-test",
    required = true,
    value = "Name of the cluster."
  )
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
  @ApiModelProperty(
    example = "3",
    required = true,
    value = "Number of records in the cluster."
  )
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
  @ApiModelProperty(
    example = "481",
    required = true,
    value = "Data size taken by all the users assigned to the cluster."
  )
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
  @ApiModelProperty(
    required = true,
    value = "userID of the requested user. Same as userID."
  )
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
  @ApiModelProperty(required = true, value = "")
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
