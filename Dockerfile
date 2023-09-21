ARG NODE_VERSION=20.7.0

FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV production

WORKDIR /usr/src/bot

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

USER node

COPY . .

CMD yarn start
