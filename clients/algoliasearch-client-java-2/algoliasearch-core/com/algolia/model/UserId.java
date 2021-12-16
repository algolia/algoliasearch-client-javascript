package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Objects;

/** A userID. */
@ApiModel(description = "A userID.")
public class UserId {

  public static final String SERIALIZED_NAME_USER_I_D = "userID";

  @SerializedName(SERIALIZED_NAME_USER_I_D)
  private String userID;

  public static final String SERIALIZED_NAME_CLUSTER_NAME = "clusterName";

  @SerializedName(SERIALIZED_NAME_CLUSTER_NAME)
  private String clusterName;

  public static final String SERIALIZED_NAME_NB_RECORDS = "nbRecords";

  @SerializedName(SERIALIZED_NAME_NB_RECORDS)
  private Integer nbRecords;

  public static final String SERIALIZED_NAME_DATA_SIZE = "dataSize";

  @SerializedName(SERIALIZED_NAME_DATA_SIZE)
  private Integer dataSize;

  public UserId userID(String userID) {
    this.userID = userID;
    return this;
  }

  /**
   * userID of the user.
   *
   * @return userID
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "user1",
    required = true,
    value = "userID of the user."
  )
  public String getUserID() {
    return userID;
  }

  public void setUserID(String userID) {
    this.userID = userID;
  }

  public UserId clusterName(String clusterName) {
    this.clusterName = clusterName;
    return this;
  }

  /**
   * Cluster on which the user is assigned.
   *
   * @return clusterName
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "c1-test",
    required = true,
    value = "Cluster on which the user is assigned."
  )
  public String getClusterName() {
    return clusterName;
  }

  public void setClusterName(String clusterName) {
    this.clusterName = clusterName;
  }

  public UserId nbRecords(Integer nbRecords) {
    this.nbRecords = nbRecords;
    return this;
  }

  /**
   * Number of records belonging to the user.
   *
   * @return nbRecords
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "42",
    required = true,
    value = "Number of records belonging to the user."
  )
  public Integer getNbRecords() {
    return nbRecords;
  }

  public void setNbRecords(Integer nbRecords) {
    this.nbRecords = nbRecords;
  }

  public UserId dataSize(Integer dataSize) {
    this.dataSize = dataSize;
    return this;
  }

  /**
   * Data size used by the user.
   *
   * @return dataSize
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "0",
    required = true,
    value = "Data size used by the user."
  )
  public Integer getDataSize() {
    return dataSize;
  }

  public void setDataSize(Integer dataSize) {
    this.dataSize = dataSize;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    UserId userId = (UserId) o;
    return (
      Objects.equals(this.userID, userId.userID) &&
      Objects.equals(this.clusterName, userId.clusterName) &&
      Objects.equals(this.nbRecords, userId.nbRecords) &&
      Objects.equals(this.dataSize, userId.dataSize)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(userID, clusterName, nbRecords, dataSize);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class UserId {\n");
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
