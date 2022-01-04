package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** A userID. */
public class UserId {

  @SerializedName("userID")
  private String userID;

  @SerializedName("clusterName")
  private String clusterName;

  @SerializedName("nbRecords")
  private Integer nbRecords;

  @SerializedName("dataSize")
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
