package com.algolia.model.insights;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Insights event. */
public class InsightEvent {

  @SerializedName("eventType")
  private EventType eventType;

  @SerializedName("eventName")
  private String eventName;

  @SerializedName("index")
  private String index;

  @SerializedName("userToken")
  private String userToken;

  @SerializedName("timestamp")
  private Long timestamp;

  @SerializedName("queryID")
  private String queryID;

  @SerializedName("objectIDs")
  private List<String> objectIDs = null;

  @SerializedName("filters")
  private List<String> filters = null;

  @SerializedName("positions")
  private List<Integer> positions = null;

  public InsightEvent setEventType(EventType eventType) {
    this.eventType = eventType;
    return this;
  }

  /**
   * Get eventType
   *
   * @return eventType
   */
  @javax.annotation.Nonnull
  public EventType getEventType() {
    return eventType;
  }

  public InsightEvent setEventName(String eventName) {
    this.eventName = eventName;
    return this;
  }

  /**
   * A user-defined string used to categorize events.
   *
   * @return eventName
   */
  @javax.annotation.Nonnull
  public String getEventName() {
    return eventName;
  }

  public InsightEvent setIndex(String index) {
    this.index = index;
    return this;
  }

  /**
   * Name of the targeted index.
   *
   * @return index
   */
  @javax.annotation.Nonnull
  public String getIndex() {
    return index;
  }

  public InsightEvent setUserToken(String userToken) {
    this.userToken = userToken;
    return this;
  }

  /**
   * A user identifier. Depending if the user is logged-in or not, several strategies can be used
   * from a sessionId to a technical identifier.
   *
   * @return userToken
   */
  @javax.annotation.Nonnull
  public String getUserToken() {
    return userToken;
  }

  public InsightEvent setTimestamp(Long timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Time of the event expressed in milliseconds since the Unix epoch.
   *
   * @return timestamp
   */
  @javax.annotation.Nullable
  public Long getTimestamp() {
    return timestamp;
  }

  public InsightEvent setQueryID(String queryID) {
    this.queryID = queryID;
    return this;
  }

  /**
   * Algolia queryID. This is required when an event is tied to a search.
   *
   * @return queryID
   */
  @javax.annotation.Nullable
  public String getQueryID() {
    return queryID;
  }

  public InsightEvent setObjectIDs(List<String> objectIDs) {
    this.objectIDs = objectIDs;
    return this;
  }

  public InsightEvent addObjectIDsItem(String objectIDsItem) {
    if (this.objectIDs == null) {
      this.objectIDs = new ArrayList<>();
    }
    this.objectIDs.add(objectIDsItem);
    return this;
  }

  /**
   * An array of index objectID. Limited to 20 objects. An event can’t have both objectIDs and
   * filters at the same time.
   *
   * @return objectIDs
   */
  @javax.annotation.Nullable
  public List<String> getObjectIDs() {
    return objectIDs;
  }

  public InsightEvent setFilters(List<String> filters) {
    this.filters = filters;
    return this;
  }

  public InsightEvent addFiltersItem(String filtersItem) {
    if (this.filters == null) {
      this.filters = new ArrayList<>();
    }
    this.filters.add(filtersItem);
    return this;
  }

  /**
   * An array of filters. Limited to 10 filters. An event can’t have both objectIDs and filters at
   * the same time.
   *
   * @return filters
   */
  @javax.annotation.Nullable
  public List<String> getFilters() {
    return filters;
  }

  public InsightEvent setPositions(List<Integer> positions) {
    this.positions = positions;
    return this;
  }

  public InsightEvent addPositionsItem(Integer positionsItem) {
    if (this.positions == null) {
      this.positions = new ArrayList<>();
    }
    this.positions.add(positionsItem);
    return this;
  }

  /**
   * Position of the click in the list of Algolia search results. This field is required if a
   * queryID is provided. One position must be provided for each objectID.
   *
   * @return positions
   */
  @javax.annotation.Nullable
  public List<Integer> getPositions() {
    return positions;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    InsightEvent insightEvent = (InsightEvent) o;
    return (
      Objects.equals(this.eventType, insightEvent.eventType) &&
      Objects.equals(this.eventName, insightEvent.eventName) &&
      Objects.equals(this.index, insightEvent.index) &&
      Objects.equals(this.userToken, insightEvent.userToken) &&
      Objects.equals(this.timestamp, insightEvent.timestamp) &&
      Objects.equals(this.queryID, insightEvent.queryID) &&
      Objects.equals(this.objectIDs, insightEvent.objectIDs) &&
      Objects.equals(this.filters, insightEvent.filters) &&
      Objects.equals(this.positions, insightEvent.positions)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      eventType,
      eventName,
      index,
      userToken,
      timestamp,
      queryID,
      objectIDs,
      filters,
      positions
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class InsightEvent {\n");
    sb
      .append("    eventType: ")
      .append(toIndentedString(eventType))
      .append("\n");
    sb
      .append("    eventName: ")
      .append(toIndentedString(eventName))
      .append("\n");
    sb.append("    index: ").append(toIndentedString(index)).append("\n");
    sb
      .append("    userToken: ")
      .append(toIndentedString(userToken))
      .append("\n");
    sb
      .append("    timestamp: ")
      .append(toIndentedString(timestamp))
      .append("\n");
    sb.append("    queryID: ").append(toIndentedString(queryID)).append("\n");
    sb
      .append("    objectIDs: ")
      .append(toIndentedString(objectIDs))
      .append("\n");
    sb.append("    filters: ").append(toIndentedString(filters)).append("\n");
    sb
      .append("    positions: ")
      .append(toIndentedString(positions))
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
