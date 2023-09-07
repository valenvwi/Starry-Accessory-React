FROM node:20.5-alpine

COPY package.json .
COPY  package-lock.json .

RUN npm install

COPY . .

RUN npm run build