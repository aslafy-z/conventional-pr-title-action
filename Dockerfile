FROM node:13-alpine

WORKDIR /action

ADD package.json package-lock.json ./

RUN npm ci

ADD src ./src

ENTRYPOINT ["node", "/action/src/index.js"]
