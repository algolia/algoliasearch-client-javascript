const APPROVED = `Approved`;

export default {
  header: `## Summary`,

  versionChangeHeader: `## Version Changes`,
  noCommit: `no commit`,
  currentVersionNotFound: `current version not found`,
  descriptionForSkippedLang: (langName: string): string =>
    [
      `  - No \`feat\` or \`fix\` commit, thus unchecked by default.`,
      `  - **Checked** → Update version, update ${langName} repository, and release the library.`,
      `  - **Unchecked** → Update ${langName} repository.`,
      `  - **Line removed** → Do nothing.`,
    ].join('\n'),

  changelogHeader: `## CHANGELOG`,
  changelogDescription: `Update the following lines. Once merged, it will be reflected to \`changelogs/*.\``,

  approvalHeader: `## Approval`,
  approved: APPROVED,
  approval: [
    `To proceed this release, check the box below and close the issue.`,
    `To skip this release, just close the issue.`,
    `- [ ] ${APPROVED}`,
  ].join('\n'),

  commitMessage: `chore: update versions and changelogs`,
};
