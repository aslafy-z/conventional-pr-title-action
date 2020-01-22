FROM node:13-alpine

ADD package.json package-lock.json /action
RUN npm ci

ADD src /action/src
ENTRYPOINT ["node", "/action/src/index.js"]
