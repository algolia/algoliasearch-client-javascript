import fsp from 'fs/promises';

const partials = ['generateParams'];

export async function loadPartials(
  language: string
): Promise<Record<string, string>> {
  const partialsObj = {};
  for (const partial of partials) {
    try {
      partialsObj[partial] = (
        await fsp.readFile(
          `CTS/methods/templates/${language}/${partial}.mustache`
        )
      ).toString();
    } catch (err) {
      // ignore file not found
      if ((err as any).code !== 'ENOENT') {
        throw err;
      }
    }
  }
  return partialsObj;
}

export async function loadRequestsTemplate(language: string): Promise<string> {
  return (
    await fsp.readFile(`CTS/methods/templates/${language}/requests.mustache`)
  ).toString();
}
