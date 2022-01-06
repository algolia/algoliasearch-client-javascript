ARG NODE_VERSION=16.13.1

FROM node:$NODE_VERSION-alpine

ENV DOCKER=true

RUN apk add openjdk11 maven jq bash perl curl

WORKDIR /app

CMD ["bash"]
