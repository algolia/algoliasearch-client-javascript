import config from '../../config/release.config.json';
import { run } from '../common';

export const RELEASED_TAG = config.releasedTag;
export const MAIN_BRANCH = config.mainBranch;
export const OWNER = config.owner;
export const REPO = config.repo;

export function getTargetBranch(language: string): string {
  return config.targetBranch[language] || config.defaultTargetBranch;
}

export function getGitAuthor(): { name: string; email: string } {
  return config.gitAuthor;
}

export function getMarkdownSection(markdown: string, title: string): string {
  const levelIndicator = title.split(' ')[0]; // e.g. `##`
  const lines = markdown
    .slice(markdown.indexOf(title))
    .split('\n')
    .map((line) => line.trim());
  let endIndex = lines.length;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith(`${levelIndicator} `)) {
      endIndex = i;
      break;
    }
  }
  return lines.slice(0, endIndex).join('\n');
}

export async function configureGitHubAuthor(cwd?: string): Promise<void> {
  const { name, email } = getGitAuthor();

  await run(`git config user.name "${name}"`, { cwd });
  await run(`git config user.email "${email}"`, { cwd });
}
