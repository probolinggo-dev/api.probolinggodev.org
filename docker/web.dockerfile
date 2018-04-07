FROM alpine:latest

WORKDIR /usr/src/app

RUN apk add --no-cache --update nodejs yarn

COPY . .

RUN yarn install

EXPOSE 8000

CMD ["yarn", "start"]
