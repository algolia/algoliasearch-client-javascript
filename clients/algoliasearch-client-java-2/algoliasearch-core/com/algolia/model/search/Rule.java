package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Rule object. */
public class Rule {

  @SerializedName("objectID")
  private String objectID;

  @SerializedName("conditions")
  private List<Condition> conditions = null;

  @SerializedName("consequence")
  private Consequence consequence;

  @SerializedName("description")
  private String description;

  @SerializedName("enabled")
  private Boolean enabled = true;

  @SerializedName("validity")
  private List<TimeRange> validity = null;

  public Rule setObjectID(String objectID) {
    this.objectID = objectID;
    return this;
  }

  /**
   * Unique identifier of the object.
   *
   * @return objectID
   */
  @javax.annotation.Nonnull
  public String getObjectID() {
    return objectID;
  }

  public Rule setConditions(List<Condition> conditions) {
    this.conditions = conditions;
    return this;
  }

  public Rule addConditionsItem(Condition conditionsItem) {
    if (this.conditions == null) {
      this.conditions = new ArrayList<>();
    }
    this.conditions.add(conditionsItem);
    return this;
  }

  /**
   * A list of conditions that should apply to activate a Rule. You can use up to 25 conditions per
   * Rule.
   *
   * @return conditions
   */
  @javax.annotation.Nullable
  public List<Condition> getConditions() {
    return conditions;
  }

  public Rule setConsequence(Consequence consequence) {
    this.consequence = consequence;
    return this;
  }

  /**
   * Get consequence
   *
   * @return consequence
   */
  @javax.annotation.Nonnull
  public Consequence getConsequence() {
    return consequence;
  }

  public Rule setDescription(String description) {
    this.description = description;
    return this;
  }

  /**
   * This field is intended for Rule management purposes, in particular to ease searching for Rules
   * and presenting them to human readers. It's not interpreted by the API.
   *
   * @return description
   */
  @javax.annotation.Nullable
  public String getDescription() {
    return description;
  }

  public Rule setEnabled(Boolean enabled) {
    this.enabled = enabled;
    return this;
  }

  /**
   * Whether the Rule is enabled. Disabled Rules remain in the index, but aren't applied at query
   * time.
   *
   * @return enabled
   */
  @javax.annotation.Nullable
  public Boolean getEnabled() {
    return enabled;
  }

  public Rule setValidity(List<TimeRange> validity) {
    this.validity = validity;
    return this;
  }

  public Rule addValidityItem(TimeRange validityItem) {
    if (this.validity == null) {
      this.validity = new ArrayList<>();
    }
    this.validity.add(validityItem);
    return this;
  }

  /**
   * By default, Rules are permanently valid. When validity periods are specified, the Rule applies
   * only during those periods; it's ignored the rest of the time. The list must not be empty.
   *
   * @return validity
   */
  @javax.annotation.Nullable
  public List<TimeRange> getValidity() {
    return validity;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Rule rule = (Rule) o;
    return (
      Objects.equals(this.objectID, rule.objectID) &&
      Objects.equals(this.conditions, rule.conditions) &&
      Objects.equals(this.consequence, rule.consequence) &&
      Objects.equals(this.description, rule.description) &&
      Objects.equals(this.enabled, rule.enabled) &&
      Objects.equals(this.validity, rule.validity)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      objectID,
      conditions,
      consequence,
      description,
      enabled,
      validity
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Rule {\n");
    sb.append("    objectID: ").append(toIndentedString(objectID)).append("\n");
    sb
      .append("    conditions: ")
      .append(toIndentedString(conditions))
      .append("\n");
    sb
      .append("    consequence: ")
      .append(toIndentedString(consequence))
      .append("\n");
    sb
      .append("    description: ")
      .append(toIndentedString(description))
      .append("\n");
    sb.append("    enabled: ").append(toIndentedString(enabled)).append("\n");
    sb.append("    validity: ").append(toIndentedString(validity)).append("\n");
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
