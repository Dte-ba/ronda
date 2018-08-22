FROM node:8.9-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ["dist/package.json", "dist/package-lock.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY dist/ .

EXPOSE 3000

CMD node server/index.js