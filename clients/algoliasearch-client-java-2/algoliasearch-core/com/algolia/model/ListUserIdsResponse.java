package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** UserIDs data. */
@ApiModel(description = "UserIDs data.")
public class ListUserIdsResponse {

  public static final String SERIALIZED_NAME_USER_I_DS = "userIDs";

  @SerializedName(SERIALIZED_NAME_USER_I_DS)
  private List<UserId> userIDs = new ArrayList<>();

  public ListUserIdsResponse userIDs(List<UserId> userIDs) {
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
  @ApiModelProperty(required = true, value = "List of userIDs.")
  public List<UserId> getUserIDs() {
    return userIDs;
  }

  public void setUserIDs(List<UserId> userIDs) {
    this.userIDs = userIDs;
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
