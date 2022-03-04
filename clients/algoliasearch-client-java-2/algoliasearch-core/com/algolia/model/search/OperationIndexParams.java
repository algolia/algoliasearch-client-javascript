package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** OperationIndexParams */
public class OperationIndexParams {

  @SerializedName("operation")
  private OperationType operation;

  @SerializedName("destination")
  private String destination;

  @SerializedName("scope")
  private List<ScopeType> scope = null;

  public OperationIndexParams operation(OperationType operation) {
    this.operation = operation;
    return this;
  }

  /**
   * Get operation
   *
   * @return operation
   */
  @javax.annotation.Nonnull
  public OperationType getOperation() {
    return operation;
  }

  public void setOperation(OperationType operation) {
    this.operation = operation;
  }

  public OperationIndexParams destination(String destination) {
    this.destination = destination;
    return this;
  }

  /**
   * The Algolia index name.
   *
   * @return destination
   */
  @javax.annotation.Nonnull
  public String getDestination() {
    return destination;
  }

  public void setDestination(String destination) {
    this.destination = destination;
  }

  public OperationIndexParams scope(List<ScopeType> scope) {
    this.scope = scope;
    return this;
  }

  public OperationIndexParams addScopeItem(ScopeType scopeItem) {
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
  public List<ScopeType> getScope() {
    return scope;
  }

  public void setScope(List<ScopeType> scope) {
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
    OperationIndexParams operationIndexParams = (OperationIndexParams) o;
    return (
      Objects.equals(this.operation, operationIndexParams.operation) &&
      Objects.equals(this.destination, operationIndexParams.destination) &&
      Objects.equals(this.scope, operationIndexParams.scope)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(operation, destination, scope);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class OperationIndexParams {\n");
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
