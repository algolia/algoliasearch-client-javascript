package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Object to promote as hits. */
@ApiModel(description = "Object to promote as hits.")
public class Promote {

  public static final String SERIALIZED_NAME_OBJECT_I_D = "objectID";

  @SerializedName(SERIALIZED_NAME_OBJECT_I_D)
  private String objectID;

  public static final String SERIALIZED_NAME_OBJECT_I_DS = "objectIDs";

  @SerializedName(SERIALIZED_NAME_OBJECT_I_DS)
  private List<String> objectIDs = null;

  public static final String SERIALIZED_NAME_POSITION = "position";

  @SerializedName(SERIALIZED_NAME_POSITION)
  private Integer position;

  public Promote objectID(String objectID) {
    this.objectID = objectID;
    return this;
  }

  /**
   * Unique identifier of the object to promote.
   *
   * @return objectID
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Unique identifier of the object to promote.")
  public String getObjectID() {
    return objectID;
  }

  public void setObjectID(String objectID) {
    this.objectID = objectID;
  }

  public Promote objectIDs(List<String> objectIDs) {
    this.objectIDs = objectIDs;
    return this;
  }

  public Promote addObjectIDsItem(String objectIDsItem) {
    if (this.objectIDs == null) {
      this.objectIDs = new ArrayList<>();
    }
    this.objectIDs.add(objectIDsItem);
    return this;
  }

  /**
   * Array of unique identifiers of the objects to promote.
   *
   * @return objectIDs
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Array of unique identifiers of the objects to promote."
  )
  public List<String> getObjectIDs() {
    return objectIDs;
  }

  public void setObjectIDs(List<String> objectIDs) {
    this.objectIDs = objectIDs;
  }

  public Promote position(Integer position) {
    this.position = position;
    return this;
  }

  /**
   * The position to promote the objects to (zero-based). If you pass objectIDs, the objects are
   * placed at this position as a group. For example, if you pass four objectIDs to position 0, the
   * objects take the first four positions.
   *
   * @return position
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "The position to promote the objects to (zero-based). If you pass objectIDs, the objects" +
    " are placed at this position as a group. For example, if you pass four objectIDs" +
    " to position 0, the objects take the first four positions."
  )
  public Integer getPosition() {
    return position;
  }

  public void setPosition(Integer position) {
    this.position = position;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Promote promote = (Promote) o;
    return (
      Objects.equals(this.objectID, promote.objectID) &&
      Objects.equals(this.objectIDs, promote.objectIDs) &&
      Objects.equals(this.position, promote.position)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(objectID, objectIDs, position);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Promote {\n");
    sb.append("    objectID: ").append(toIndentedString(objectID)).append("\n");
    sb
      .append("    objectIDs: ")
      .append(toIndentedString(objectIDs))
      .append("\n");
    sb.append("    position: ").append(toIndentedString(position)).append("\n");
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
