FROM node:8.9.4-alpine

RUN apk add -U yarn

WORKDIR /app
COPY *.json /app/

RUN npm install

COPY .babelrc webpack.config.js /app/
COPY www/ /app/www/
# RUN npm run webpack-production

COPY views/ /app/views
COPY app/ /app/app
COPY index.js .

CMD ["node", "index"]