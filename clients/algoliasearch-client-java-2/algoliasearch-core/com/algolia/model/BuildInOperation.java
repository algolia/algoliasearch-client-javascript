package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.util.Objects;

/**
 * To update an attribute without pushing the entire record, you can use these built-in operations.
 */
public class BuildInOperation {

  /** The operation to apply on the attribute. */
  @JsonAdapter(OperationEnum.Adapter.class)
  public enum OperationEnum {
    INCREMENT("Increment"),

    DECREMENT("Decrement"),

    ADD("Add"),

    REMOVE("Remove"),

    ADDUNIQUE("AddUnique"),

    INCREMENTFROM("IncrementFrom"),

    INCREMENTSET("IncrementSet");

    private String value;

    OperationEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static OperationEnum fromValue(String value) {
      for (OperationEnum b : OperationEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<OperationEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final OperationEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public OperationEnum read(final JsonReader jsonReader)
        throws IOException {
        String value = jsonReader.nextString();
        return OperationEnum.fromValue(value);
      }
    }
  }

  @SerializedName("_operation")
  private OperationEnum operation;

  @SerializedName("value")
  private String value;

  public BuildInOperation operation(OperationEnum operation) {
    this.operation = operation;
    return this;
  }

  /**
   * The operation to apply on the attribute.
   *
   * @return operation
   */
  @javax.annotation.Nonnull
  public OperationEnum getOperation() {
    return operation;
  }

  public void setOperation(OperationEnum operation) {
    this.operation = operation;
  }

  public BuildInOperation value(String value) {
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
    BuildInOperation buildInOperation = (BuildInOperation) o;
    return (
      Objects.equals(this.operation, buildInOperation.operation) &&
      Objects.equals(this.value, buildInOperation.value)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(operation, value);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BuildInOperation {\n");
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
