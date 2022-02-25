import clientsConfig from '../clients.config.json';

export function getLanguageFolder(language: string): string {
  return clientsConfig[language].folder;
}

export function getTestExtension(language: string): string | undefined {
  return clientsConfig[language]?.tests?.extension;
}

export function getTestOutputFolder(language: string): string | undefined {
  return clientsConfig[language]?.tests?.outputFolder;
}
