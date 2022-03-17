package com.algolia.codegen.cts;

import java.io.IOException;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

public class Request {
  public String testName;
  public String method;

  public Map<String, Object> parameters;

  public RequestProp request;

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Request {\n");
    sb.append("    testName: ").append(testName).append("\n");
    sb.append("    method: ").append(method).append("\n");
    sb.append("    parameters: ").append(parameters).append("\n");
    sb.append("    request: ").append(request).append("\n");
    sb.append("}");
    return sb.toString();
  }
}

class RequestProp {
  public String path;
  public String method;

  @JsonDeserialize(using = RawDeserializer.class)
  public String data;

  @JsonDeserialize(using = RawDeserializer.class)
  public String searchParams;

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RequestProp {\n");
    sb.append("    path: ").append(path).append("\n");
    sb.append("    method: ").append(method).append("\n");
    sb.append("    data: ").append(data).append("\n");
    sb.append("    searchParams: ").append(searchParams).append("\n");
    sb.append("}");
    return sb.toString();
  }
}

// Output json to raw string with quotes
class RawDeserializer extends JsonDeserializer<String> {

  @Override
  public String deserialize(JsonParser jp, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {

    TreeNode tree = jp.getCodec().readTree(jp);
    return tree.toString();
  }
}
