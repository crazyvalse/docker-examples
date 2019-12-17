FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY config config/
COPY dist dist/
COPY public public/
COPY server server/
COPY package.json .
COPY yarn.lock .
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn config set registry http://npm.fzyun.io
RUN yarn config get registry
RUN yarn

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]

# docker build -t adp .

# docker run -p 5710:5701 --name=adp01 adp
