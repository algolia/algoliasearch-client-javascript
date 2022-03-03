const APPROVED = `Approved`;

export default {
  header: `## Summary`,

  versionChangeHeader: `## Version Changes`,
  noCommit: `no commit`,
  currentVersionNotFound: `current version not found`,
  descriptionVersionChanges: [
    `**Checked** → Update version, update repository, and release the library.`,
    `**Un-checked** → Update repository.`,
    `**Line removed** → Do nothing.`,
  ].join('\n'),
  descriptionForSkippedLang: `  - No \`feat\` or \`fix\` commit, thus unchecked by default.`,

  changelogHeader: `## CHANGELOG`,
  changelogDescription: `Update the following lines. Once merged, it will be reflected to \`changelogs/*.\``,

  approvalHeader: `## Approval`,
  approved: APPROVED,
  approval: [
    `To proceed this release, check the box below and close the issue.`,
    `To skip this release, just close the issue.`,
    `- [ ] ${APPROVED}`,
  ].join('\n'),

  commitMessage: `chore: update versions and submodules`,
};
