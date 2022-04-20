package com.algolia.methods.requests;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.algolia.JSON;
import com.algolia.Pair;
import com.algolia.api.InsightsClient;
import com.algolia.model.insights.*;
import com.algolia.utils.echo.*;
import com.google.gson.reflect.TypeToken;
import java.util.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class InsightsClientTests {

  private InsightsClient client;

  @BeforeAll
  void init() {
    client = new InsightsClient("appId", "apiKey", new EchoRequester());
  }

  @Test
  @DisplayName("allow del method for a custom path with minimal parameters")
  void delTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.del(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("allow del method for a custom path with all parameters")
  void delTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.del(path0, parameters0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "DELETE");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("allow get method for a custom path with minimal parameters")
  void getTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.get(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("allow get method for a custom path with all parameters")
  void getTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.get(path0, parameters0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("allow post method for a custom path with minimal parameters")
  void postTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.post(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("allow post method for a custom path with all parameters")
  void postTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    Map<String, String> body0 = new HashMap<>();
    {
      String body1 = "parameters";

      body0.put("body", body1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.post(path0, parameters0, body0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"body\":\"parameters\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("pushEvents")
  void pushEventsTest0() {
    InsightEvents insightEvents0 = new InsightEvents();
    {
      List<InsightEvent> events1 = new ArrayList<>();
      {
        InsightEvent events_02 = new InsightEvent();
        {
          EventType eventType3 = EventType.fromValue("click");

          events_02.setEventType(eventType3);
          String eventName3 = "Product Clicked";

          events_02.setEventName(eventName3);
          String index3 = "products";

          events_02.setIndex(index3);
          String userToken3 = "user-123456";

          events_02.setUserToken(userToken3);

          long timestamp3 = 1641290601962L;

          events_02.setTimestamp(timestamp3);

          List<String> objectIDs3 = new ArrayList<>();
          {
            String objectIDs_04 = "9780545139700";

            objectIDs3.add(objectIDs_04);
            String objectIDs_14 = "9780439784542";

            objectIDs3.add(objectIDs_14);
          }
          events_02.setObjectIDs(objectIDs3);
          String queryID3 = "43b15df305339e827f0ac0bdc5ebcaa7";

          events_02.setQueryID(queryID3);

          List<Integer> positions3 = new ArrayList<>();
          {
            int positions_04 = 7;

            positions3.add(positions_04);
            int positions_14 = 6;

            positions3.add(positions_14);
          }
          events_02.setPositions(positions3);
        }
        events1.add(events_02);

        InsightEvent events_12 = new InsightEvent();
        {
          EventType eventType3 = EventType.fromValue("view");

          events_12.setEventType(eventType3);
          String eventName3 = "Product Detail Page Viewed";

          events_12.setEventName(eventName3);
          String index3 = "products";

          events_12.setIndex(index3);
          String userToken3 = "user-123456";

          events_12.setUserToken(userToken3);

          long timestamp3 = 1641290601962L;

          events_12.setTimestamp(timestamp3);

          List<String> objectIDs3 = new ArrayList<>();
          {
            String objectIDs_04 = "9780545139700";

            objectIDs3.add(objectIDs_04);
            String objectIDs_14 = "9780439784542";

            objectIDs3.add(objectIDs_14);
          }
          events_12.setObjectIDs(objectIDs3);
        }
        events1.add(events_12);

        InsightEvent events_22 = new InsightEvent();
        {
          EventType eventType3 = EventType.fromValue("conversion");

          events_22.setEventType(eventType3);
          String eventName3 = "Product Purchased";

          events_22.setEventName(eventName3);
          String index3 = "products";

          events_22.setIndex(index3);
          String userToken3 = "user-123456";

          events_22.setUserToken(userToken3);

          long timestamp3 = 1641290601962L;

          events_22.setTimestamp(timestamp3);

          List<String> objectIDs3 = new ArrayList<>();
          {
            String objectIDs_04 = "9780545139700";

            objectIDs3.add(objectIDs_04);
            String objectIDs_14 = "9780439784542";

            objectIDs3.add(objectIDs_14);
          }
          events_22.setObjectIDs(objectIDs3);
          String queryID3 = "43b15df305339e827f0ac0bdc5ebcaa7";

          events_22.setQueryID(queryID3);
        }
        events1.add(events_22);
      }
      insightEvents0.setEvents(events1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.pushEvents(insightEvents0);
      }
    );

    assertEquals(req.getPath(), "/1/events");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"events\":[{\"eventType\":\"click\",\"eventName\":\"Product" +
        " Clicked\",\"index\":\"products\",\"userToken\":\"user-123456\",\"timestamp\":1641290601962,\"objectIDs\":[\"9780545139700\",\"9780439784542\"],\"queryID\":\"43b15df305339e827f0ac0bdc5ebcaa7\",\"positions\":[7,6]},{\"eventType\":\"view\",\"eventName\":\"Product" +
        " Detail Page" +
        " Viewed\",\"index\":\"products\",\"userToken\":\"user-123456\",\"timestamp\":1641290601962,\"objectIDs\":[\"9780545139700\",\"9780439784542\"]},{\"eventType\":\"conversion\",\"eventName\":\"Product" +
        " Purchased\",\"index\":\"products\",\"userToken\":\"user-123456\",\"timestamp\":1641290601962,\"objectIDs\":[\"9780545139700\",\"9780439784542\"],\"queryID\":\"43b15df305339e827f0ac0bdc5ebcaa7\"}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("allow put method for a custom path with minimal parameters")
  void putTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.put(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "PUT");
  }

  @Test
  @DisplayName("allow put method for a custom path with all parameters")
  void putTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    Map<String, String> body0 = new HashMap<>();
    {
      String body1 = "parameters";

      body0.put("body", body1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.put(path0, parameters0, body0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"body\":\"parameters\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }
}
