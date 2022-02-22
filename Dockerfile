ARG NODE_VERSION=16.13.1

FROM node:$NODE_VERSION-alpine

ENV DOCKER=true

RUN apk -U add openjdk11 jq bash perl build-base python3
ENV JAVA_HOME=/usr/lib/jvm/default-jvm

# Java formatter
ADD https://github.com/google/google-java-format/releases/download/v1.13.0/google-java-format-1.13.0-all-deps.jar /tmp/java-formatter.jar

# PHP dependencies
RUN apk add -U composer php8 php8-tokenizer php8-dom php8-xml php8-xmlwriter

WORKDIR /app

CMD ["bash"]
