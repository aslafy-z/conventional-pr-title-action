# Conventional PR Title Action

This is a [GitHub Action](https://github.com/features/actions) that ensures your PR title matches the [Conventional Commits spec](https://www.conventionalcommits.org/).

This is helpful when you're using [semantic-release](https://github.com/semantic-release/semantic-release) with the Conventional Commits preset. When using the `Squash and merge` strategy, GitHub will suggest to use the PR title as the commit message. With this action you can validate that the PR title will lead to a correct commit message.

See [Conventional Commits](https://www.conventionalcommits.org/) for sample titles.

## Inputs

| Name            | Required | Default                                                    | Description                                                        |
| --------------- | -------- | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| `success-state` | No       | `"Title follows the specification."`                       | Description of the status check if validation succeeds.            |
| `failure-state` | No       | `"Title does not follow the specification."`               | Description of the status check if validation fails.               |
| `context-name`  | No       | `"conventional-pr-title"`                                  | Persistent status check context key.                               |
| `preset`        | No       | `"conventional-changelog-conventionalcommits@5.0.0"`       | Conventional changelog preset.                                     |
| `target-url`    | No       | `"https://www.conventionalcommits.org/en/v1.0.0/#summary"` | URL to be used when linking the "Details" in the actions overview. |

## Outputs

| Name      | Description                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `success` | `true` if the validation succeeded, `false` otherwise.                                                                 |
| `error`   | In case of an error (`success=false`), contains the error message for additional processing or usage in notifications. |

## Example usage

```yaml
name: Check PR title

on:
  pull_request_target:
    types:
      - opened
      - reopened
      - edited
      - synchronize

jobs:
  lint:
    runs-on: ubuntu-latest
    permissions:
      statuses: write
    steps:
      - uses: aslafy-z/conventional-pr-title-action@v3
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

> Note: Avoid using `main` ref, prefer to pin to a specific version.

## Credits

All thanks goes to [`amannn`](https://github.com/amannn)'s [`semantic-pull-request`](https://github.com/amannn/action-semantic-pull-request) action.
