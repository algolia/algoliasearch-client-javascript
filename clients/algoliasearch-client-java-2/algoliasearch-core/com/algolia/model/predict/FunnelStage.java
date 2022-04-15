package com.algolia.model.predict;

import com.google.gson.annotations.SerializedName;
import java.math.BigDecimal;
import java.util.Objects;

/** FunnelStage */
public class FunnelStage {

  @SerializedName("name")
  private String name;

  @SerializedName("probability")
  private BigDecimal probability;

  public FunnelStage setName(String name) {
    this.name = name;
    return this;
  }

  /**
   * Get name
   *
   * @return name
   */
  @javax.annotation.Nullable
  public String getName() {
    return name;
  }

  public FunnelStage setProbability(BigDecimal probability) {
    this.probability = probability;
    return this;
  }

  /**
   * Get probability minimum: 0 maximum: 1
   *
   * @return probability
   */
  @javax.annotation.Nullable
  public BigDecimal getProbability() {
    return probability;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    FunnelStage funnelStage = (FunnelStage) o;
    return (
      Objects.equals(this.name, funnelStage.name) &&
      Objects.equals(this.probability, funnelStage.probability)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, probability);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class FunnelStage {\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb
      .append("    probability: ")
      .append(toIndentedString(probability))
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
