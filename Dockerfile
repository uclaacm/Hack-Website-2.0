FROM node:8.9.4-alpine

RUN apk add -U yarn

WORKDIR /app
COPY *.json /app/
COPY *.lock /app/

COPY .babelrc webpack.config.js /app/
COPY www/ /app/www/
# RUN yarn webpack-production

COPY views/ /app/views
COPY app/ /app/app
COPY index.js .

RUN yarn

CMD ["node", "index"]