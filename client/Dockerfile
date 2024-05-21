FROM node:20 as builder

# Working directory be app
WORKDIR /app

COPY package*.json ./

###  Installing dependencies
RUN npm install

# copy local files to app folder
COPY . .

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/ ./

EXPOSE 3000

CMD [ "npm","start" ]