FROM node:latest
COPY . /usr/hasse_web
WORKDIR /usr/hasse_web
USER root
RUN apt-get update -y && apt-get install nodejs -y && apt-get install yarn -y && yarn install
RUN /usr/hasse_web/node_modules/.bin/webpack --env=dev
ENTRYPOINT ["/usr/hasse_web/node_modules/.bin/webpack-dev-server", "--env=dev", "--progress", "--colors", "--port", "8090", "--host", "0.0.0.0"]
