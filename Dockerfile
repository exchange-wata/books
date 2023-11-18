FROM node:18
WORKDIR /usr/backend
RUN apt-get update \
    && yarn install --immutable --immutable-cache --check-cache --network-timeout 1000000
COPY ./backend/package.json /usr/backend/
COPY ./backend/yarn.lock /usr/backend/
