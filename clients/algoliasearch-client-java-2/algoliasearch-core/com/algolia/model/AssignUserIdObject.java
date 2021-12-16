package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Objects;

/** Assign userID object. */
@ApiModel(description = "Assign userID object.")
public class AssignUserIdObject {

  public static final String SERIALIZED_NAME_CLUSTER = "cluster";

  @SerializedName(SERIALIZED_NAME_CLUSTER)
  private String cluster;

  public AssignUserIdObject cluster(String cluster) {
    this.cluster = cluster;
    return this;
  }

  /**
   * Name of the cluster.
   *
   * @return cluster
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "c11-test",
    required = true,
    value = "Name of the cluster."
  )
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
    AssignUserIdObject assignUserIdObject = (AssignUserIdObject) o;
    return Objects.equals(this.cluster, assignUserIdObject.cluster);
  }

  @Override
  public int hashCode() {
    return Objects.hash(cluster);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AssignUserIdObject {\n");
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
