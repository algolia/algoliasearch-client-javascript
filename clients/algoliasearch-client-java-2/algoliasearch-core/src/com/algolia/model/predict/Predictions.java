package com.algolia.model.predict;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** Predictions */
public class Predictions {

  @SerializedName("funnel_stage")
  private PredictionsFunnelStage funnelStage;

  @SerializedName("order_value")
  private PredictionsOrderValue orderValue;

  @SerializedName("affinities")
  private PredictionsAffinities affinities;

  public Predictions setFunnelStage(PredictionsFunnelStage funnelStage) {
    this.funnelStage = funnelStage;
    return this;
  }

  /**
   * Get funnelStage
   *
   * @return funnelStage
   */
  @javax.annotation.Nullable
  public PredictionsFunnelStage getFunnelStage() {
    return funnelStage;
  }

  public Predictions setOrderValue(PredictionsOrderValue orderValue) {
    this.orderValue = orderValue;
    return this;
  }

  /**
   * Get orderValue
   *
   * @return orderValue
   */
  @javax.annotation.Nullable
  public PredictionsOrderValue getOrderValue() {
    return orderValue;
  }

  public Predictions setAffinities(PredictionsAffinities affinities) {
    this.affinities = affinities;
    return this;
  }

  /**
   * Get affinities
   *
   * @return affinities
   */
  @javax.annotation.Nullable
  public PredictionsAffinities getAffinities() {
    return affinities;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Predictions predictions = (Predictions) o;
    return (
      Objects.equals(this.funnelStage, predictions.funnelStage) &&
      Objects.equals(this.orderValue, predictions.orderValue) &&
      Objects.equals(this.affinities, predictions.affinities)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(funnelStage, orderValue, affinities);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Predictions {\n");
    sb
      .append("    funnelStage: ")
      .append(toIndentedString(funnelStage))
      .append("\n");
    sb
      .append("    orderValue: ")
      .append(toIndentedString(orderValue))
      .append("\n");
    sb
      .append("    affinities: ")
      .append(toIndentedString(affinities))
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
