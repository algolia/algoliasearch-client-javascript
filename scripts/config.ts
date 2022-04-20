import clientsConfig from '../config/clients.config.json';

export function getLanguageFolder(language: string): string {
  return clientsConfig[language].folder;
}

export function getLanguageApiFolder(language: string): string {
  return clientsConfig[language].apiFolder;
}

export function getLanguageModelFolder(language: string): string {
  return clientsConfig[language].modelFolder;
}

export function getTestExtension(language: string): string | undefined {
  return clientsConfig[language]?.tests?.extension;
}

export function getTestOutputFolder(language: string): string | undefined {
  return clientsConfig[language]?.tests?.outputFolder;
}

export function getCustomGenerator(language: string): string | undefined {
  return clientsConfig[language]?.customGenerator;
}
