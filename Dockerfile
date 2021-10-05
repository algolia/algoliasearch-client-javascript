# Dockerfile
FROM node:10-alpine

# Install the dependencies in the parent folder so they don't get overriden by the bind mount
WORKDIR /

# Needed to compile some npm packages
RUN apk add --no-cache bash python3 make g++

COPY package.json yarn.lock ./

RUN yarn install

ENV NODE_PATH=/node_modules
ENV PATH=/node_modules/.bin:$PATH

WORKDIR /app
COPY . ./
