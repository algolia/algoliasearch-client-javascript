package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModelProperty;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** OperationIndexObject */
public class OperationIndexObject {

  /** Type of operation to perform (move or copy). */
  @JsonAdapter(OperationEnum.Adapter.class)
  public enum OperationEnum {
    MOVE("move"),

    COPY("copy");

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

  public static final String SERIALIZED_NAME_OPERATION = "operation";

  @SerializedName(SERIALIZED_NAME_OPERATION)
  private OperationEnum operation;

  public static final String SERIALIZED_NAME_DESTINATION = "destination";

  @SerializedName(SERIALIZED_NAME_DESTINATION)
  private String destination;

  /** Gets or Sets scope */
  @JsonAdapter(ScopeEnum.Adapter.class)
  public enum ScopeEnum {
    SETTINGS("settings"),

    SYNONYMS("synonyms"),

    RULES("rules");

    private String value;

    ScopeEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static ScopeEnum fromValue(String value) {
      for (ScopeEnum b : ScopeEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<ScopeEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final ScopeEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public ScopeEnum read(final JsonReader jsonReader) throws IOException {
        String value = jsonReader.nextString();
        return ScopeEnum.fromValue(value);
      }
    }
  }

  public static final String SERIALIZED_NAME_SCOPE = "scope";

  @SerializedName(SERIALIZED_NAME_SCOPE)
  private List<ScopeEnum> scope = null;

  public OperationIndexObject operation(OperationEnum operation) {
    this.operation = operation;
    return this;
  }

  /**
   * Type of operation to perform (move or copy).
   *
   * @return operation
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Type of operation to perform (move or copy)."
  )
  public OperationEnum getOperation() {
    return operation;
  }

  public void setOperation(OperationEnum operation) {
    this.operation = operation;
  }

  public OperationIndexObject destination(String destination) {
    this.destination = destination;
    return this;
  }

  /**
   * The Algolia index name.
   *
   * @return destination
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "products",
    required = true,
    value = "The Algolia index name."
  )
  public String getDestination() {
    return destination;
  }

  public void setDestination(String destination) {
    this.destination = destination;
  }

  public OperationIndexObject scope(List<ScopeEnum> scope) {
    this.scope = scope;
    return this;
  }

  public OperationIndexObject addScopeItem(ScopeEnum scopeItem) {
    if (this.scope == null) {
      this.scope = new ArrayList<>();
    }
    this.scope.add(scopeItem);
    return this;
  }

  /**
   * Scope of the data to copy. When absent, a full copy is performed. When present, only the
   * selected scopes are copied.
   *
   * @return scope
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Scope of the data to copy. When absent, a full copy is performed. When present, only the" +
    " selected scopes are copied."
  )
  public List<ScopeEnum> getScope() {
    return scope;
  }

  public void setScope(List<ScopeEnum> scope) {
    this.scope = scope;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    OperationIndexObject operationIndexObject = (OperationIndexObject) o;
    return (
      Objects.equals(this.operation, operationIndexObject.operation) &&
      Objects.equals(this.destination, operationIndexObject.destination) &&
      Objects.equals(this.scope, operationIndexObject.scope)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(operation, destination, scope);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class OperationIndexObject {\n");
    sb
      .append("    operation: ")
      .append(toIndentedString(operation))
      .append("\n");
    sb
      .append("    destination: ")
      .append(toIndentedString(destination))
      .append("\n");
    sb.append("    scope: ").append(toIndentedString(scope)).append("\n");
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
