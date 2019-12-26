# conventional-pr-title-action

This is a [Github Action](https://github.com/features/actions) that ensures that your PR title matches the [Conventional Commits spec](https://www.conventionalcommits.org/).

This is helpful when you're using [semantic-release](https://github.com/semantic-release/semantic-release) with the Conventional Commits preset. When using the `Squash and merge` strategy, Github will suggest to use the PR title as the commit message. With this action you can validate that the PR title will lead to a correct commit message.

See [Conventional Commits](https://www.conventionalcommits.org/) for sample titles.

## Inputs

### `success-state`

**Required** Description of the status check if validation succeeds. Default `"Title follows the specification."`.

### `failure-state`

**Required** Description of the status check if validation fails. Default `"Title does not follow the specification."`.

### `context-name`

**Required** Persistent status check context key. Default `"conventional-pr-title"`.

## Outputs

### `success`

`true` if the validation succeed. `false` otherwise.

## Example usage

```yaml
name: Check PR title
on:
  pull_request:
    types:
      - opened
      - reopened
      - edited
      - synchronize

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: aslafy-z/conventional-pr-title-action@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Credits

All thanks goes to [`amannn`](https://github.com/amannn)'s [`semantic-pull-request`](https://github.com/amannn/action-semantic-pull-request) action.
