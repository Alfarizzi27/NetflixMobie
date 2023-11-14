FROM node:18.12.1

WORKDIR /app

ENV PORT=4002

COPY package*.json .

RUN npm install && npm install -g nodemon

COPY . .

CMD node app.js