package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** UserIDs data. */
public class ListUserIdsResponse {

  @SerializedName("userIDs")
  private List<UserId> userIDs = new ArrayList<>();

  public ListUserIdsResponse setUserIDs(List<UserId> userIDs) {
    this.userIDs = userIDs;
    return this;
  }

  public ListUserIdsResponse addUserIDsItem(UserId userIDsItem) {
    this.userIDs.add(userIDsItem);
    return this;
  }

  /**
   * List of userIDs.
   *
   * @return userIDs
   */
  @javax.annotation.Nonnull
  public List<UserId> getUserIDs() {
    return userIDs;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ListUserIdsResponse listUserIdsResponse = (ListUserIdsResponse) o;
    return Objects.equals(this.userIDs, listUserIdsResponse.userIDs);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userIDs);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ListUserIdsResponse {\n");
    sb.append("    userIDs: ").append(toIndentedString(userIDs)).append("\n");
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
