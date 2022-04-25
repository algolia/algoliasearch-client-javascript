package com.algolia.codegen;

import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.servers.Server;
import java.io.FileInputStream;
import java.net.URL;
import java.util.*;
import org.openapitools.codegen.*;
import org.openapitools.codegen.languages.JavaClientCodegen;
import org.openapitools.codegen.utils.ModelUtils;
import org.yaml.snakeyaml.Yaml;

@SuppressWarnings("unchecked")
public class AlgoliaJavaGenerator extends JavaClientCodegen {

  /**
   * Configures a friendly name for the generator. This will be used by the generator to select the
   * library with the -g flag.
   *
   * @return the friendly name for the generator
   */
  @Override
  public String getName() {
    return "algolia-java";
  }

  /** Inject server info into the client to generate the right URL */
  private void generateServer(Map<String, Object> client) {
    String clientName = (String) client.get("pathPrefix");
    Yaml yaml = new Yaml();
    try {
      Map<String, Object> spec = yaml.load(
        new FileInputStream("specs/" + clientName + "/spec.yml")
      );
      List<Map<String, Object>> servers = (List<Map<String, Object>>) spec.get(
        "servers"
      );

      boolean hasRegionalHost = false;
      boolean fallbackToAliasHost = false;

      boolean isEuHost = false;
      boolean isDeHost = false;
      String host = "";
      String topLevelDomain = "";
      for (Map<String, Object> server : servers) {
        if (!server.containsKey("url")) {
          throw new GenerationException(
            "Invalid server, does not contains 'url'"
          );
        }

        // Determine if the current URL with `region` also have an alias without
        // variables.
        for (Map<String, Object> otherServer : servers) {
          if (server == otherServer) {
            continue;
          }
          String otherUrl = (String) otherServer.getOrDefault("url", "");
          if (otherUrl.replace(".{region}", "").equals(server.get("url"))) {
            fallbackToAliasHost = true;
            break;
          }
        }

        if (!server.containsKey("variables")) {
          continue;
        }

        Map<String, Map<String, Object>> variables = (Map<String, Map<String, Object>>) server.get(
          "variables"
        );

        if (
          !variables.containsKey("region") ||
          !variables.get("region").containsKey("enum")
        ) {
          continue;
        }
        ArrayList<String> enums = (ArrayList<String>) variables
          .get("region")
          .get("enum");
        hasRegionalHost = true;

        URL url = new URL((String) server.get("url"));

        if (enums.contains("eu")) {
          isEuHost = true;
        }

        if (enums.contains("de")) {
          isDeHost = true;
        }

        // This is used for hosts like `insights` that uses `.io`
        String[] hostParts = url.getHost().split("\\.");
        host = hostParts[0];
        topLevelDomain = hostParts[hostParts.length - 1];
      }
      client.put("hasRegionalHost", hasRegionalHost);
      client.put("fallbackToAliasHost", fallbackToAliasHost);
      client.put("isEuHost", isEuHost);
      client.put("isDeHost", isDeHost);
      client.put("host", host);
      client.put("topLevelDomain", topLevelDomain);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public CodegenOperation fromOperation(
    String path,
    String httpMethod,
    Operation operation,
    List<Server> servers
  ) {
    return Utils.specifyCustomRequest(
      super.fromOperation(path, httpMethod, operation, servers)
    );
  }

  /** Provides an opportunity to inspect and modify operation data before the code is generated. */
  @Override
  public Map<String, Object> postProcessOperationsWithModels(
    Map<String, Object> objs,
    List<Object> allModels
  ) {
    Map<String, Object> results = super.postProcessOperationsWithModels(
      objs,
      allModels
    );
    Map<String, Object> client = (Map<String, Object>) results.get(
      "operations"
    );

    generateServer(client);

    return results;
  }

  @Override
  public Map<String, Object> postProcessAllModels(Map<String, Object> objs) {
    Map<String, Object> models = super.postProcessAllModels(objs);

    for (Object modelContainer : models.values()) {
      CodegenModel model =
        ((Map<String, List<Map<String, CodegenModel>>>) modelContainer).get(
            "models"
          )
          .get(0)
          .get("model");
      if (!model.oneOf.isEmpty()) {
        List<HashMap<String, String>> listOneOf = new ArrayList();

        for (String iterateModel : model.oneOf) {
          HashMap<String, String> oneOfModel = new HashMap();

          oneOfModel.put("type", iterateModel);
          oneOfModel.put(
            "name",
            iterateModel.replace("<", "").replace(">", "")
          );

          listOneOf.add(oneOfModel);
        }

        model.vendorExtensions.put("x-is-one-of-interface", true);
        model.vendorExtensions.put("x-is-one-of-list", listOneOf);
      }
    }

    return models;
  }

  @Override
  public Map<String, Object> postProcessSupportingFileData(
    Map<String, Object> objs
  ) {
    Map<String, Object> bundle = super.postProcessSupportingFileData(objs);
    List<Map<String, Object>> apis =
      ((Map<String, List<Map<String, Object>>>) bundle.get("apiInfo")).get(
          "apis"
        );

    for (Map<String, Object> api : apis) {
      String clientName = (String) api.get("baseName");
      supportingFiles.add(
        new SupportingFile(
          "EchoResponse.mustache",
          sourceFolder + "/com/algolia/utils/echo",
          "EchoResponse" + clientName + ".java"
        )
      );

      List<CodegenOperation> operations =
        ((Map<String, List<CodegenOperation>>) api.get("operations")).get(
            "operation"
          );

      for (CodegenOperation ope : operations) {
        ope.returnType =
          ope.returnType
            .replace("Map<", "HashMap<")
            .replace("List<", "ArrayList<");
      }
    }
    return bundle;
  }

  /**
   * Returns human-friendly help for the generator. Provide the consumer with help tips, parameters
   * here
   *
   * @return A string value for the help message
   */
  @Override
  public String getHelp() {
    return "Generates an algolia-java client library.";
  }

  @Override
  public void processOpts() {
    // generator specific options
    setDateLibrary("java8");
    setSourceFolder("algoliasearch-core/src");
    setInvokerPackage("com.algolia");
    setApiNameSuffix(Utils.API_SUFFIX);

    super.processOpts();

    // Prevent all useless file to generate
    apiTestTemplateFiles.clear();
    modelTestTemplateFiles.clear();
    apiDocTemplateFiles.clear();
    modelDocTemplateFiles.clear();

    supportingFiles.removeIf(file ->
      file.getTemplateFile().equals("build.gradle.mustache") ||
      file.getTemplateFile().equals("settings.gradle.mustache")
    );
  }

  @Override
  public String toDefaultValue(Schema schema) {
    // Replace the {} from openapi with new Object()
    if (ModelUtils.isObjectSchema(schema) && schema.getDefault() != null) {
      return "new Object()";
    }
    return super.toDefaultValue(schema);
  }

  @Override
  public String toEnumVarName(String value, String datatype) {
    if ("String".equals(datatype)) {
      // convert camelCase77String to CAMEL_CASE_77_STRING
      return value
        .replaceAll("-", "_")
        .replaceAll("(.+?)([A-Z]|[0-9])", "$1_$2")
        .toUpperCase(Locale.ROOT);
    }
    return super.toEnumVarName(value, datatype);
  }
}
