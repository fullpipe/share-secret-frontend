# Build
FROM node:lts-alpine AS build

WORKDIR /app2

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build -- --prod

# App image
FROM fullpipe/ngserve:latest

COPY --from=build /app/dist/share-secret-frontend/ /app2/

WEB_ROOT=./app2
