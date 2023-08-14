module.exports = {
  branches: ["main"],
  plugins: [
    ["@semantic-release/commit-analyzer", {
      "preset": "conventionalcommits",
    }],
    ["@semantic-release/release-notes-generator", {
      "preset": "conventionalcommits",
    }],
    "@semantic-release/git",
    "@semantic-release/github",
  ],
};
