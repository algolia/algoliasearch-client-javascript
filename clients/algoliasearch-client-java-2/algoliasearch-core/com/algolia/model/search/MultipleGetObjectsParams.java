package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** getObjects operation on an index. */
public class MultipleGetObjectsParams {

  @SerializedName("attributesToRetrieve")
  private List<String> attributesToRetrieve = null;

  @SerializedName("objectID")
  private String objectID;

  @SerializedName("indexName")
  private String indexName;

  public MultipleGetObjectsParams setAttributesToRetrieve(
    List<String> attributesToRetrieve
  ) {
    this.attributesToRetrieve = attributesToRetrieve;
    return this;
  }

  public MultipleGetObjectsParams addAttributesToRetrieveItem(
    String attributesToRetrieveItem
  ) {
    if (this.attributesToRetrieve == null) {
      this.attributesToRetrieve = new ArrayList<>();
    }
    this.attributesToRetrieve.add(attributesToRetrieveItem);
    return this;
  }

  /**
   * List of attributes to retrieve. By default, all retrievable attributes are returned.
   *
   * @return attributesToRetrieve
   */
  @javax.annotation.Nullable
  public List<String> getAttributesToRetrieve() {
    return attributesToRetrieve;
  }

  public MultipleGetObjectsParams setObjectID(String objectID) {
    this.objectID = objectID;
    return this;
  }

  /**
   * ID of the object within that index.
   *
   * @return objectID
   */
  @javax.annotation.Nonnull
  public String getObjectID() {
    return objectID;
  }

  public MultipleGetObjectsParams setIndexName(String indexName) {
    this.indexName = indexName;
    return this;
  }

  /**
   * name of the index containing the object.
   *
   * @return indexName
   */
  @javax.annotation.Nonnull
  public String getIndexName() {
    return indexName;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MultipleGetObjectsParams multipleGetObjectsParams = (MultipleGetObjectsParams) o;
    return (
      Objects.equals(
        this.attributesToRetrieve,
        multipleGetObjectsParams.attributesToRetrieve
      ) &&
      Objects.equals(this.objectID, multipleGetObjectsParams.objectID) &&
      Objects.equals(this.indexName, multipleGetObjectsParams.indexName)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(attributesToRetrieve, objectID, indexName);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MultipleGetObjectsParams {\n");
    sb
      .append("    attributesToRetrieve: ")
      .append(toIndentedString(attributesToRetrieve))
      .append("\n");
    sb.append("    objectID: ").append(toIndentedString(objectID)).append("\n");
    sb
      .append("    indexName: ")
      .append(toIndentedString(indexName))
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
