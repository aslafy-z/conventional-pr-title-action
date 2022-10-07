const path = require('path');
const core = require('@actions/core');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Install preset
 * @returns {Promise<void>}
 */
module.exports = async (preset) => {
  const {stdout, stderr} = await exec(`npm install --quiet ${preset}`, {
    cwd: path.resolve(__dirname)
  });
  core.debug(stderr);
  return Promise.resolve();
};
