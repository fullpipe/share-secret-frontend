# Build
FROM node:lts-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# App image
FROM fullpipe/ngserve:latest

COPY --from=build /app/dist/share-secret-frontend/ /app/
