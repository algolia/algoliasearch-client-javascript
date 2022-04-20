package com.algolia.codegen;

import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import java.util.Map;
import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.SupportingFile;
import org.openapitools.codegen.languages.TypeScriptNodeClientCodegen;

public class AlgoliaJavascriptGenerator extends TypeScriptNodeClientCodegen {

  @Override
  public String getName() {
    return "algolia-javascript";
  }

  @Override
  public void processOpts() {
    super.processOpts();

    // generator specific options
    setSupportsES6(true);
    setModelPropertyNaming("original");

    // clear all supported files to avoid unwanted ones
    supportingFiles.clear();
    // model
    supportingFiles.add(
      new SupportingFile("modelBarrel.mustache", "model", "index.ts")
    );
    // builds
    supportingFiles.add(
      new SupportingFile("browser.mustache", "builds", "browser.ts")
    );
    supportingFiles.add(
      new SupportingFile("node.mustache", "builds", "node.ts")
    );
    // root
    supportingFiles.add(new SupportingFile("index.mustache", "", "index.js"));
    supportingFiles.add(
      new SupportingFile("index.d.mustache", "", "index.d.ts")
    );
    supportingFiles.add(
      new SupportingFile("package.mustache", "", "package.json")
    );
    supportingFiles.add(
      new SupportingFile("tsconfig.mustache", "", "tsconfig.json")
    );
  }

  /** Set default generator options */
  private void setDefaultGeneratorOptions(Map<String, Object> client) {
    String spec = (String) client.get("pathPrefix");
    String apiName = spec + "Api";

    additionalProperties.put("apiName", apiName);
    additionalProperties.put("capitalizedApiName", Utils.capitalize(apiName));
    additionalProperties.put("userAgent", Utils.capitalize(spec));
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

    setDefaultGeneratorOptions(client);

    return results;
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

  @Override
  protected String getParameterDataType(Parameter parameter, Schema p) {
    String type = super.getParameterDataType(parameter, p);
    // openapi generator is wrong, 'object' is not a fit all object, we need 'any'
    // we use replace because there might be more to this type, like '| undefined'
    return type.replace("{ [key: string]: object; }", "Record<string, any>");
  }

  @Override
  public String toInstantiationType(Schema schema) {
    String type = super.toInstantiationType(schema);

    // Same as the `getParameterDataType` but for the models, the generator
    // consider `object` as a fit all which is wrong in TypeScript
    return type.replace("null<String, object>", "Record<string, any>");
  }
}
