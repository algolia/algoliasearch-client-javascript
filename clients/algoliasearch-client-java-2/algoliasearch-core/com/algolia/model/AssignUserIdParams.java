package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** Assign userID parameters. */
public class AssignUserIdParams {

  @SerializedName("cluster")
  private String cluster;

  public AssignUserIdParams cluster(String cluster) {
    this.cluster = cluster;
    return this;
  }

  /**
   * Name of the cluster.
   *
   * @return cluster
   */
  @javax.annotation.Nonnull
  public String getCluster() {
    return cluster;
  }

  public void setCluster(String cluster) {
    this.cluster = cluster;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    AssignUserIdParams assignUserIdParams = (AssignUserIdParams) o;
    return Objects.equals(this.cluster, assignUserIdParams.cluster);
  }

  @Override
  public int hashCode() {
    return Objects.hash(cluster);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AssignUserIdParams {\n");
    sb.append("    cluster: ").append(toIndentedString(cluster)).append("\n");
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
