FROM node:18.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir ./photos

COPY . .

EXPOSE 3000

CMD [ "node", "javascript/server.js" ]