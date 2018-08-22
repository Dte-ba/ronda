FROM node:8.9-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ["dist/package.json", "dist/package-lock.json*", "./"]

RUN apk add --no-cache git \
    && npm install --production --silent  \
    && npm cache clean --force \
    && apk del git \
    && mv node_modules ../


COPY dist/ .

EXPOSE 3000

CMD ["node", "server/index.js"]