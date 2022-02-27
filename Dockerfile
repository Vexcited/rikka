FROM node:16-alpine
WORKDIR /app

COPY package.json yarn.lock ./

RUN apk add --no-cache --virtual .build-deps alpine-sdk python3
RUN yarn install --frozen-lockfile
RUN apk del .build-deps

COPY . .

RUN yarn start-build
CMD ["yarn", "start-production"]
