package com.algolia.model.personalization;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** EventScoring */
public class EventScoring {

  @SerializedName("score")
  private Integer score;

  @SerializedName("eventName")
  private String eventName;

  @SerializedName("eventType")
  private String eventType;

  public EventScoring setScore(Integer score) {
    this.score = score;
    return this;
  }

  /**
   * The score for the event.
   *
   * @return score
   */
  @javax.annotation.Nonnull
  public Integer getScore() {
    return score;
  }

  public EventScoring setEventName(String eventName) {
    this.eventName = eventName;
    return this;
  }

  /**
   * The name of the event.
   *
   * @return eventName
   */
  @javax.annotation.Nonnull
  public String getEventName() {
    return eventName;
  }

  public EventScoring setEventType(String eventType) {
    this.eventType = eventType;
    return this;
  }

  /**
   * The type of the event.
   *
   * @return eventType
   */
  @javax.annotation.Nonnull
  public String getEventType() {
    return eventType;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    EventScoring eventScoring = (EventScoring) o;
    return (
      Objects.equals(this.score, eventScoring.score) &&
      Objects.equals(this.eventName, eventScoring.eventName) &&
      Objects.equals(this.eventType, eventScoring.eventType)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(score, eventName, eventType);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class EventScoring {\n");
    sb.append("    score: ").append(toIndentedString(score)).append("\n");
    sb
      .append("    eventName: ")
      .append(toIndentedString(eventName))
      .append("\n");
    sb
      .append("    eventType: ")
      .append(toIndentedString(eventType))
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
