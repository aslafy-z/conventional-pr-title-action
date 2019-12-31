const parser = require('conventional-commits-parser').sync;
const conventionalCommitTypes = require('conventional-commit-types');

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

module.exports = async function validateTitle(preset, title) {
  let conventionalChangelogConfig = require(preset);
  if (isFunction(conventionalChangelogConfig)) {
    conventionalChangelogConfig = await conventionalChangelogConfig();
  }
  const { parserOpts } = conventionalChangelogConfig;
  const result = parser(title, parserOpts);

  if (!result.type) {
    throw new Error(
      `No release type found in pull request title "${title}".` +
        '\n\nAdd a prefix like "fix: ", "feat: " or "feat!: " to indicate what kind of release this pull request corresponds to. The title should match the commit mesage format as specified by https://www.conventionalcommits.org/.'
    );
  }

  const allowedTypes = Object.keys(conventionalCommitTypes.types);
  if (!allowedTypes.includes(result.type)) {
    throw new Error(
      `Unknown release type "${result.type}" found in pull request title "${title}".` +
        `\n\nPlease use one of these recognized types: ${allowedTypes.join(
          ', '
        )}.`
    );
  }
};
