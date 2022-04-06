package com.algolia.codegen.cts;

import com.samskivert.mustache.Mustache;
import com.samskivert.mustache.Template;
import java.io.IOException;
import java.io.Writer;

public class EscapeQuotesLambda implements Mustache.Lambda {

  @Override
  public void execute(Template.Fragment fragment, Writer writer)
    throws IOException {
    String text = fragment.execute();
    writer.write(text.replace("\"", "\\\""));
  }
}
