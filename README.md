# auto-assign 🎯

Internal helper for the **gander-\*** organizations. It assigns the user [`gander`](https://github.com/gander) 🦆 to:

- 🐛 every newly opened or reopened **issue**,
- 🔀 every opened, reopened or ready-for-review **pull request**.

It fails the job loudly ❌ if GitHub did not actually assign the user (the assignees API answers `2xx` even when it silently drops a login).

## Usage

```yaml
name: auto-assign

on:
  issues:
    types: [opened, reopened]
  pull_request_target:
    types: [opened, reopened, ready_for_review]

permissions: {}

jobs:
  assign:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - uses: gander-actions/auto-assign@<commit-sha>
```

- Use `pull_request_target`, not `pull_request`: Dependabot and fork PRs get a read-only token under the latter. The action does not check out or run PR code, so this is safe.
- Pin to a commit SHA.
- The assignee is fixed (`gander`); there is no input for it. 🔒
- `token` is the only input and defaults to `github.token`; pass a PAT or App token only if that cannot assign the user.

## Development

```sh
npm ci
npm test
npm run build   # commit dist/; CI fails when it is stale
```
