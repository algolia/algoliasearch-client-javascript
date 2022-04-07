package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Assign userID parameters. */
public class BatchAssignUserIdsParams {

  @SerializedName("cluster")
  private String cluster;

  @SerializedName("users")
  private List<String> users = new ArrayList<>();

  public BatchAssignUserIdsParams setCluster(String cluster) {
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

  public BatchAssignUserIdsParams setUsers(List<String> users) {
    this.users = users;
    return this;
  }

  public BatchAssignUserIdsParams addUsersItem(String usersItem) {
    this.users.add(usersItem);
    return this;
  }

  /**
   * userIDs to assign. Note you cannot move users with this method.
   *
   * @return users
   */
  @javax.annotation.Nonnull
  public List<String> getUsers() {
    return users;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BatchAssignUserIdsParams batchAssignUserIdsParams = (BatchAssignUserIdsParams) o;
    return (
      Objects.equals(this.cluster, batchAssignUserIdsParams.cluster) &&
      Objects.equals(this.users, batchAssignUserIdsParams.users)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(cluster, users);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BatchAssignUserIdsParams {\n");
    sb.append("    cluster: ").append(toIndentedString(cluster)).append("\n");
    sb.append("    users: ").append(toIndentedString(users)).append("\n");
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
