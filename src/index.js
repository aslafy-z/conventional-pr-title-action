const core = require('@actions/core');
const github = require('@actions/github');
const validateTitle = require('./validateTitle');

module.exports = async function run() {
  try {
    const client = new github.GitHub(process.env.GITHUB_TOKEN);

    const contextPullRequest = github.context.payload.pull_request;
    if (!contextPullRequest) {
      throw new Error(
        "This action can only be invoked in `pull_request` events. Otherwise the pull request can't be inferred."
      );
    }

    const owner = contextPullRequest.base.user.login;
    const repo = contextPullRequest.base.repo.name;

    let error = null;
    try {
      await validateTitle(contextPullRequest.title);
    } catch (err) {
      error = err;
    }

    let state = 'success';
    let description = 'Title follows conventional commit.';
    if (error) {
      state = 'pending';
      description = 'Please review the PR title.';
    }

    const response = await client.request(
      'POST /repos/:owner/:repo/statuses/:sha',
      {
        owner,
        repo,
        state,
        sha: contextPullRequest.head.sha,
        target_url: 'https://github.com/aslafy-z/conventional-pr-title-action',
        description: 'Ready for review & merge.',
        context: 'conventional-pr-title',
      }
    );

    if (error) {
      throw error;
    }

  } catch (error) {
    core.setFailed(error.message);
  }
};
