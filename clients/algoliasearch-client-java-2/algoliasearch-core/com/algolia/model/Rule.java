package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Rule object. */
@ApiModel(description = "Rule object.")
public class Rule {

  public static final String SERIALIZED_NAME_OBJECT_I_D = "objectID";

  @SerializedName(SERIALIZED_NAME_OBJECT_I_D)
  private String objectID;

  public static final String SERIALIZED_NAME_CONDITIONS = "conditions";

  @SerializedName(SERIALIZED_NAME_CONDITIONS)
  private List<Condition> conditions = null;

  public static final String SERIALIZED_NAME_CONSEQUENCE = "consequence";

  @SerializedName(SERIALIZED_NAME_CONSEQUENCE)
  private Consequence consequence;

  public static final String SERIALIZED_NAME_DESCRIPTION = "description";

  @SerializedName(SERIALIZED_NAME_DESCRIPTION)
  private String description;

  public static final String SERIALIZED_NAME_ENABLED = "enabled";

  @SerializedName(SERIALIZED_NAME_ENABLED)
  private Boolean enabled = true;

  public static final String SERIALIZED_NAME_VALIDITY = "validity";

  @SerializedName(SERIALIZED_NAME_VALIDITY)
  private List<TimeRange> validity = null;

  public Rule objectID(String objectID) {
    this.objectID = objectID;
    return this;
  }

  /**
   * Unique identifier of the object.
   *
   * @return objectID
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "Unique identifier of the object.")
  public String getObjectID() {
    return objectID;
  }

  public void setObjectID(String objectID) {
    this.objectID = objectID;
  }

  public Rule conditions(List<Condition> conditions) {
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
  @ApiModelProperty(
    value = "A list of conditions that should apply to activate a Rule. You can use up to 25" +
    " conditions per Rule."
  )
  public List<Condition> getConditions() {
    return conditions;
  }

  public void setConditions(List<Condition> conditions) {
    this.conditions = conditions;
  }

  public Rule consequence(Consequence consequence) {
    this.consequence = consequence;
    return this;
  }

  /**
   * Get consequence
   *
   * @return consequence
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "")
  public Consequence getConsequence() {
    return consequence;
  }

  public void setConsequence(Consequence consequence) {
    this.consequence = consequence;
  }

  public Rule description(String description) {
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
  @ApiModelProperty(
    value = "This field is intended for Rule management purposes, in particular to ease searching for" +
    " Rules and presenting them to human readers. It's not interpreted by the API."
  )
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Rule enabled(Boolean enabled) {
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
  @ApiModelProperty(
    value = "Whether the Rule is enabled. Disabled Rules remain in the index, but aren't applied at" +
    " query time."
  )
  public Boolean getEnabled() {
    return enabled;
  }

  public void setEnabled(Boolean enabled) {
    this.enabled = enabled;
  }

  public Rule validity(List<TimeRange> validity) {
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
  @ApiModelProperty(
    value = "By default, Rules are permanently valid. When validity periods are specified, the Rule" +
    " applies only during those periods; it's ignored the rest of the time. The list" +
    " must not be empty."
  )
  public List<TimeRange> getValidity() {
    return validity;
  }

  public void setValidity(List<TimeRange> validity) {
    this.validity = validity;
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
