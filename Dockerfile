FROM node:20-alpine AS builder

WORKDIR /action

COPY package.json package-lock.json ./

RUN npm ci

COPY src ./src

RUN npm run build

FROM node:20-alpine

WORKDIR /action

COPY --from=builder /action/dist ./dist

CMD ["./dist/index.js"]
