const core = require('@actions/core');
const github = require('@actions/github');
const validateTitle = require('./validateTitle');

async function run() {
  try {
    let contextName = core.getInput('context-name');
    let successState = core.getInput('success-state');
    let failureState = core.getInput('failure-state');

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

    core.setOutput('success', Boolean(error).toString());

    let state = 'success';
    let description = successState;
    if (error) {
      state = 'pending';
      description = failureState;
    }

    await client.request(
      'POST /repos/:owner/:repo/statuses/:sha',
      {
        owner,
        repo,
        state,
        description,
        sha: contextPullRequest.head.sha,
        target_url: 'https://github.com/aslafy-z/conventional-pr-title-action',
        context: contextName,
      },
    );

    if (error) {
      throw error;
    }

  } catch (error) {
    core.setFailed(error.message);
  }
};

run();

