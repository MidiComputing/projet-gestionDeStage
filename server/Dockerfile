FROM node:20 as builder

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

FROM node:20-alpine

WORKDIR /src

COPY --from=builder /src/ ./

EXPOSE 4000

CMD [ "npm","start" ]