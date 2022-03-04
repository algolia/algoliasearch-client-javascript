package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** GetLogsResponse */
public class GetLogsResponse {

  @SerializedName("logs")
  private List<GetLogsResponseLogs> logs = new ArrayList<>();

  public GetLogsResponse logs(List<GetLogsResponseLogs> logs) {
    this.logs = logs;
    return this;
  }

  public GetLogsResponse addLogsItem(GetLogsResponseLogs logsItem) {
    this.logs.add(logsItem);
    return this;
  }

  /**
   * Get logs
   *
   * @return logs
   */
  @javax.annotation.Nonnull
  public List<GetLogsResponseLogs> getLogs() {
    return logs;
  }

  public void setLogs(List<GetLogsResponseLogs> logs) {
    this.logs = logs;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GetLogsResponse getLogsResponse = (GetLogsResponse) o;
    return Objects.equals(this.logs, getLogsResponse.logs);
  }

  @Override
  public int hashCode() {
    return Objects.hash(logs);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GetLogsResponse {\n");
    sb.append("    logs: ").append(toIndentedString(logs)).append("\n");
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
