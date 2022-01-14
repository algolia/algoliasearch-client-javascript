import fsp from 'fs/promises';

export async function loadRequestsTemplate(language: string): Promise<string> {
  return (
    await fsp.readFile(`CTS/methods/templates/${language}/requests.mustache`)
  ).toString();
}
