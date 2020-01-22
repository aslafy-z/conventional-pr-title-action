FROM node:13-alpine

WORKDIR /action

ADD package.json package-lock.json ./

RUN npm ci

ADD src ./

ENTRYPOINT ["node", "src/main.js"]
