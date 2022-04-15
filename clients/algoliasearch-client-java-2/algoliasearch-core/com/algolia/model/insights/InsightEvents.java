package com.algolia.model.insights;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Object containing the events sent. */
public class InsightEvents {

  @SerializedName("events")
  private List<InsightEvent> events = new ArrayList<>();

  public InsightEvents setEvents(List<InsightEvent> events) {
    this.events = events;
    return this;
  }

  public InsightEvents addEventsItem(InsightEvent eventsItem) {
    this.events.add(eventsItem);
    return this;
  }

  /**
   * Array of events sent.
   *
   * @return events
   */
  @javax.annotation.Nonnull
  public List<InsightEvent> getEvents() {
    return events;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InsightEvents insightEvents = (InsightEvents) o;
    return Objects.equals(this.events, insightEvents.events);
  }

  @Override
  public int hashCode() {
    return Objects.hash(events);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InsightEvents {\n");
    sb.append("    events: ").append(toIndentedString(events)).append("\n");
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
