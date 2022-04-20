package com.algolia.playground;

import com.algolia.exceptions.AlgoliaApiException;
import com.algolia.exceptions.AlgoliaRetryException;
import com.algolia.exceptions.AlgoliaRuntimeException;
import com.algolia.model.search.*;
import com.algolia.search.SearchClient;
import com.algolia.utils.UserAgent;
import io.github.cdimascio.dotenv.Dotenv;

public class App {

  public static void main(String[] args) {
    Dotenv dotenv = Dotenv.configure().directory("../").load();

    SearchClient client = new SearchClient(
      dotenv.get("ALGOLIA_APPLICATION_ID"),
      dotenv.get("ALGOLIA_SEARCH_KEY"),
      new UserAgent.Segment[] {
        new UserAgent.Segment("test", "8.0.0"),
        new UserAgent.Segment("JVM", "11.0.14"),
        new UserAgent.Segment("no version"),
      }
    );

    String indexName = dotenv.get("SEARCH_INDEX");
    SearchParamsObject params = new SearchParamsObject();
    params.setAroundRadius(AroundRadius.ofInteger(5));
    params.setQuery(dotenv.get("SEARCH_QUERY"));

    try {
      SearchResponse result = client.search(
        indexName,
        SearchParams.ofSearchParamsObject(params)
      );
      System.out.println(result);
    } catch (AlgoliaApiException e) {
      // the API failed
      System.err.println("Exception when calling SearchClient#search");
      System.err.println("Status code: " + e.getHttpErrorCode());
      System.err.println("Reason: " + e.getMessage());
      e.printStackTrace();
    } catch (AlgoliaRetryException e) {
      // the retry failed
      System.err.println("Exception in the retry strategy");
      e.printStackTrace();
    } catch (AlgoliaRuntimeException e) {
      // the serialization or something else failed
      e.printStackTrace();
    }
  }
}
