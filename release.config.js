module.exports = {
  preset: "conventionalcommits",
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/exec", {
      prepareCmd: "npm ci && npm run build",
    }],
    ["@semantic-release/npm", {
      npmPublish: false,
    }],
    ["@semantic-release/git", {
      assets: ["package.json", "package-lock.json", "dist"],
    }],
    "@semantic-release/github",
  ],
};
