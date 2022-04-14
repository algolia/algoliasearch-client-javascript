import fsp from 'fs/promises';
import path from 'path';

import { exists, toAbsolutePath } from '../common';
import { getTestExtension, getTestOutputFolder } from '../config';

export async function* walk(
  dir: string
): AsyncGenerator<{ path: string; name: string }> {
  for await (const d of await fsp.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield { path: entry, name: d.name };
  }
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createClientName(client: string, language: string): string {
  const clientName = client
    .split('-')
    .map((part, i) => {
      if (language === 'javascript' && i === 0) {
        return part;
      }

      return capitalize(part);
    })
    .join('');

  return clientName;
}

export async function createOutputDir({
  language,
  testPath,
}: {
  language: string;
  testPath: string;
}): Promise<void> {
  await fsp.mkdir(
    toAbsolutePath(
      `tests/output/${language}/${getTestOutputFolder(language)}/${testPath}`
    ),
    {
      recursive: true,
    }
  );
}

export function getOutputPath({
  language,
  client,
  testPath,
}: {
  language: string;
  client: string;
  testPath: string;
}): string {
  return toAbsolutePath(
    `tests/output/${language}/${getTestOutputFolder(
      language
    )}/${testPath}/${client}${getTestExtension(language)}`
  );
}

export async function loadTemplates({
  language,
  testPath,
}: {
  language: string;
  testPath: string;
}): Promise<Record<string, string>> {
  const templates: Record<string, string> = {};
  const templatePath = toAbsolutePath(
    `tests/CTS/${testPath}/templates/${language}`
  );

  if (!(await exists(templatePath))) {
    return {};
  }

  for await (const file of walk(templatePath)) {
    if (!file.name.endsWith('.mustache')) {
      continue;
    }
    const name = file.name.replace('.mustache', '');
    const fileContent = (await fsp.readFile(file.path)).toString();
    templates[name] = fileContent;
  }
  return templates;
}
