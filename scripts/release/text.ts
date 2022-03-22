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
  indenpendentVersioning: `
  <details>
    <summary>
      <i>The JavaScript repository consists of several packages with independent versioning. Release type is applied to each version.</i>
    </summary>

    For example, if the release type is \`patch\`,

    * algoliasearch@5.0.0 -> 5.0.1
    * @algolia/client-search@5.0.0 -> 5.0.1
    * @algolia/client-abtesting@5.0.0 -> 5.0.1
    * ...
    * @algolia/client-predict@0.0.1 -> 0.0.2
    * ...
    * @algolia/requester-browser-xhr@0.0.5 -> 0.0.6.
  </details>
  `,
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
};
