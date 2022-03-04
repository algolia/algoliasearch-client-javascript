package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/**
 * To update an attribute without pushing the entire record, you can use these built-in operations.
 */
public class BuiltInOperation {

  @SerializedName("_operation")
  private BuiltInOperationType operation;

  @SerializedName("value")
  private String value;

  public BuiltInOperation operation(BuiltInOperationType operation) {
    this.operation = operation;
    return this;
  }

  /**
   * Get operation
   *
   * @return operation
   */
  @javax.annotation.Nonnull
  public BuiltInOperationType getOperation() {
    return operation;
  }

  public void setOperation(BuiltInOperationType operation) {
    this.operation = operation;
  }

  public BuiltInOperation value(String value) {
    this.value = value;
    return this;
  }

  /**
   * the right-hand side argument to the operation, for example, increment or decrement step, value
   * to add or remove.
   *
   * @return value
   */
  @javax.annotation.Nonnull
  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BuiltInOperation builtInOperation = (BuiltInOperation) o;
    return (
      Objects.equals(this.operation, builtInOperation.operation) &&
      Objects.equals(this.value, builtInOperation.value)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(operation, value);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BuiltInOperation {\n");
    sb
      .append("    operation: ")
      .append(toIndentedString(operation))
      .append("\n");
    sb.append("    value: ").append(toIndentedString(value)).append("\n");
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
