FROM node:13

# Bundle APP files
RUN mkdir -p /project
WORKDIR /project
COPY . /project

# Install app dependenciesw
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm config set registry https://registry.npm.taobao.org \
#    https://registry.npm.taobao.org http://npm.fzyun.io \
    && yarn config set https://registry.npm.taobao.org \
    && yarn config get registry \
    && npm config get registry \
    && yarn install \
    && yarn global add pm2 \
    && ls

# Show current folder structure in logs

# CMD [ "pm2", "start", "/founder/server/go-server.js","--watch","-i","4","-n","git-server.v0.1.0" ]

# docker build -t crazyvalse/nodegit:0.1.0 .

# docker rmi `docker images -f dangling=true -q`
# docker run --rm -it node:8-alpine sh

# docker run -p 5710:5701 --name=adp01 adp
