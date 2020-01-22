FROM node:13-alpine

LABEL com.github.actions.name="conventional-pr-title-action"
LABEL com.github.actions.description="Ensure your PR title matches the Conventional Commits spec (https://www.conventionalcommits.org/)."
LABEL com.github.actions.icon="shield"
LABEL com.github.actions.color="green"
LABEL repository="https://github.com/aslafy-z/conventional-pr-title-action"

WORKDIR /action

ADD package.json package-lock.json ./

RUN npm ci

ADD src ./

ENTRYPOINT ["node", "src/main.js"]
