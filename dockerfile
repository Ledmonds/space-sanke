# syntax=docker/dockerfile:1

FROM node:19-alpine

# Create app directory
WORKDIR /usr/src/app

# Install packages
COPY ./src/ .
RUN npm install \
    && chown -R node ./

USER node

EXPOSE 8080

CMD [ "npx", "http-server" ]