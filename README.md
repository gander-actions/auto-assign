# Auto Assign 🎯

Internal helper for the **gander-\*** organizations. It assigns the user [`gander`](https://github.com/gander) 🦆 to:

- 🐛 every newly opened or reopened **issue**,
- 🔀 every opened, reopened or ready-for-review **pull request**.

It fails the job loudly ❌ if GitHub did not actually assign the user (the assignees API answers `2xx` even when it silently drops a login).

## Quick start 🚀

Drop this into `.github/workflows/auto-assign.yml` in any repo:

```yaml
name: Auto Assign

on:
  issues:
    types: [opened, reopened]
  pull_request_target:
    types: [opened, reopened, ready_for_review]

jobs:
  assign:
    name: Assign
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - name: Assign gander
        uses: gander-actions/auto-assign@v0.1.0
```

- No checkout step needed: the action is fetched remotely and never touches the repo's code.
- Use `pull_request_target`, not `pull_request`: Dependabot and fork PRs get a read-only token under the latter. The action does not check out or run PR code, so this is safe.
- Pinned to an exact release tag (`v0.1.0`); Renovate and similar tools bump it when a new tag appears. Releases are plain git tags on `main`. 📌
- `gander` must be assignable in the repo (owner or collaborator), otherwise the job fails with `gander was not assigned to #N`.
- The assignee is fixed (`gander`); there is no input for it. 🔒
- `token` is the only input and defaults to `github.token`; pass a PAT or App token only if that cannot assign the user.

## Development

```sh
npm ci
npm test
npm run build   # commit dist/; CI fails when it is stale
```
