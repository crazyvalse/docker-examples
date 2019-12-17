FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm config set registry http://npm.fzyun.io
RUN npm config get registry
RUN npm install pm2 -g
RUN npm install
EXPOSE 3000
CMD ["pm2-runtime","./bin/www","-i","4", "--watch", "--name", "myapp"]
