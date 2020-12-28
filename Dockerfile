# Build
FROM node:lts-alpine AS build

WORKDIR /app2

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build -- --prod

# App image
FROM trion/nginx-angular

COPY --from=build /app/dist/share-secret-frontend/ /usr/share/nginx/html/
