import { MAIN_BRANCH, REPO_URL } from '../../common';

export default {
  notification: {
    header: '### 🔨 The codegen job will run at the end of the CI.',
    body: '_Make sure your last commit does not contains generated code, it will be automatically pushed by our CI._',
  },
  noGen: {
    header: '### ✗ No code generated.',
    body: `_If you believe this is an issue on our side, please [open an issue](${REPO_URL}/issues/new?template=Bug_report.md)._`,
  },
  cleanup: {
    header: '### ✗ The generated branch has been deleted.',
    body: `If the PR has been merged, you can check the generated code on the [\`${MAIN_BRANCH}\` branch](${REPO_URL}/tree/${MAIN_BRANCH}).`,
  },
  codegen: {
    header: '### ✔️ Code generated!',
    body(
      branch: string,
      commit: string,
      eventNumber: number,
      generatedCommit: string
    ): string {
      return `
|  Name | Link |
|---------------------------------|------------------------|
| 🔨 Triggered by | [\`${commit}\`](${REPO_URL}/pull/${eventNumber}/commits/${commit}) |
| 🔍 Generated code | [\`${generatedCommit}\`](${REPO_URL}/commit/${generatedCommit}) |
| 🌲 Generated branch | [\`${branch}\`](${REPO_URL}/tree/${branch}) |
`;
    },
  },
};
