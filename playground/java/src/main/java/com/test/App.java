package com.test;

import com.algolia.model.*;
import com.algolia.search.SearchApi;
import com.algolia.ApiException;

import io.github.cdimascio.dotenv.Dotenv;

public class App {
    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().directory("playground/").load();

        SearchApi client = new SearchApi(dotenv.get("ALGOLIA_APPLICATION_ID"), dotenv.get("ALGOLIA_SEARCH_KEY"));
        String indexName = dotenv.get("SEARCH_INDEX");
        SearchParams params = new SearchParams();
        params.setQuery(dotenv.get("SEARCH_QUERY"));
        try {
            SearchResponse result = client.search(indexName, params);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SearchApi#search");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }
}
