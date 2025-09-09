# create node image that will build html+js+css
FROM node:20 AS build
ARG VITE_BACKEND_URL=https://upgraded-goldfish-vw95jg7vvq5cwrwv-3001.app.github.dev/api/v1
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# put built html+js+css inside an nginx container
FROM nginx AS final
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist .
