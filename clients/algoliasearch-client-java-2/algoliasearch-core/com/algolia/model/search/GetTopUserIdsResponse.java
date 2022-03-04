package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/** Array of userIDs and clusters. */
public class GetTopUserIdsResponse {

  @SerializedName("topUsers")
  private List<Map<String, List<UserId>>> topUsers = new ArrayList<>();

  public GetTopUserIdsResponse topUsers(
    List<Map<String, List<UserId>>> topUsers
  ) {
    this.topUsers = topUsers;
    return this;
  }

  public GetTopUserIdsResponse addTopUsersItem(
    Map<String, List<UserId>> topUsersItem
  ) {
    this.topUsers.add(topUsersItem);
    return this;
  }

  /**
   * Mapping of cluster names to top users.
   *
   * @return topUsers
   */
  @javax.annotation.Nonnull
  public List<Map<String, List<UserId>>> getTopUsers() {
    return topUsers;
  }

  public void setTopUsers(List<Map<String, List<UserId>>> topUsers) {
    this.topUsers = topUsers;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetTopUserIdsResponse getTopUserIdsResponse = (GetTopUserIdsResponse) o;
    return Objects.equals(this.topUsers, getTopUserIdsResponse.topUsers);
  }

  @Override
  public int hashCode() {
    return Objects.hash(topUsers);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetTopUserIdsResponse {\n");
    sb.append("    topUsers: ").append(toIndentedString(topUsers)).append("\n");
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
